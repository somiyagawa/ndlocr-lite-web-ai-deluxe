/**
 * モデルファイルのダウンロード・IndexedDBキャッシュ管理
 * 参照実装: ndlkotenocr-worker/src/utils/model-loader.js
 *
 * Safari 対策:
 *  - DB接続をシングルトン化（並列 indexedDB.open() のデッドロック回避）
 *  - IndexedDB 接続にタイムアウト付与（Safari Private Browsing 等の無応答対策）
 *  - response.body が null の場合のフォールバック（Safari Web Worker 対策）
 */

const DB_NAME = 'NDLOCRLiteDB'
const DB_VERSION = 2
const STORE_NAME = 'models'

// モデルのバージョン（URLが変わったらここを更新）
export const MODEL_VERSION = '1.0.0'

// モデル配信ベースURL（環境変数 VITE_MODEL_BASE_URL で指定、末尾スラッシュなし）
// 空の場合は /models（public/models/ からの配信）をデフォルトにする
const MODEL_BASE_URL = (import.meta.env.VITE_MODEL_BASE_URL as string | undefined) || '/models'

// ONNXモデルのURL
export const MODEL_URLS: Record<string, string> = {
  // === 現代日本語 (modern) ===
  layout: `${MODEL_BASE_URL}/deim-s-1024x1024.onnx`,
  // カスケード文字認識モデル（行の文字数カテゴリに応じて使い分け）
  recognition30: `${MODEL_BASE_URL}/parseq-ndl-30.onnx`,  // カテゴリ3: ≤30文字 [1,3,16,256]
  recognition50: `${MODEL_BASE_URL}/parseq-ndl-50.onnx`,  // カテゴリ2: ≤50文字 [1,3,16,384]
  recognition100: `${MODEL_BASE_URL}/parseq-ndl-100.onnx`, // カテゴリ1: ≤100文字 [1,3,16,768]
  // === 古典籍 (koten) ===
  koten_layout: `${MODEL_BASE_URL}/rtmdet-s-1280x1280.onnx`,          // RTMDet [1,3,1280,1280]
  koten_recognition: `${MODEL_BASE_URL}/parseq-ndl-32x384-tiny-10.onnx`, // PARSeq [1,3,32,384]
}

// --- IndexedDB シングルトン接続 ---
// Safari の Web Worker 内で indexedDB.open() を並列実行するとデッドロックするため、
// 接続を一度だけ行い、以降はキャッシュを返す。
let dbPromise: Promise<IDBDatabase> | null = null
const IDB_OPEN_TIMEOUT = 5000 // 5秒でタイムアウト

function initDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    // Safari Private Browsing などで indexedDB が無応答になる場合のタイムアウト
    const timer = setTimeout(() => {
      console.warn('IndexedDB open timeout — proceeding without cache')
      reject(new Error('IndexedDB open timeout'))
    }, IDB_OPEN_TIMEOUT)

    let request: IDBOpenDBRequest
    try {
      request = indexedDB.open(DB_NAME, DB_VERSION)
    } catch (e) {
      clearTimeout(timer)
      reject(e)
      return
    }

    request.onerror = () => { clearTimeout(timer); reject(request.error) }
    request.onsuccess = () => { clearTimeout(timer); resolve(request.result) }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains('models')) {
        db.createObjectStore('models', { keyPath: 'name' })
      }
      // Version 2: results ストアを再作成（per-run スキーマ）
      if (db.objectStoreNames.contains('results')) {
        db.deleteObjectStore('results')
      }
      const resultsStore = db.createObjectStore('results', { keyPath: 'id' })
      resultsStore.createIndex('by_createdAt', 'createdAt', { unique: false })
    }
  })
  // 失敗した場合は次回再試行できるようにキャッシュを破棄
  dbPromise.catch(() => { dbPromise = null })
  return dbPromise
}

async function getModelFromCache(
  modelName: string
): Promise<ArrayBuffer | undefined> {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(modelName)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const entry = request.result
        if (entry && entry.version === MODEL_VERSION) {
          resolve(entry.data)
        } else {
          resolve(undefined)
        }
      }
    })
  } catch {
    // IndexedDB 不可（タイムアウト・Private Browsing 等）— キャッシュなしで続行
    console.warn(`IndexedDB unavailable for cache read (${modelName}), will download`)
    return undefined
  }
}

async function saveModelToCache(
  modelName: string,
  data: ArrayBuffer
): Promise<void> {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.put({
        name: modelName,
        data,
        cachedAt: Date.now(),
        version: MODEL_VERSION,
      })

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch {
    // キャッシュ保存に失敗しても OCR 処理自体は続行可能
    console.warn(`Failed to cache model ${modelName} — will re-download next time`)
  }
}

async function downloadWithProgress(
  url: string,
  onProgress?: (progress: number) => void
): Promise<ArrayBuffer> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  // SPAフォールバックでHTMLが返った場合（モデルファイルが存在しない）を検出
  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('text/html')) {
    throw new Error(`Model file not found (HTML returned): ${url}`)
  }

  // Safari Web Worker では response.body が null になる場合がある。
  // その場合は arrayBuffer() で一括取得（進捗表示なし）にフォールバック。
  if (!response.body) {
    console.warn('ReadableStream not available (Safari Web Worker?) — falling back to arrayBuffer()')
    const buf = await response.arrayBuffer()
    if (onProgress) onProgress(1.0)
    return buf
  }

  const contentLength = parseInt(
    response.headers.get('content-length') || '0',
    10
  )
  let receivedLength = 0

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    chunks.push(value)
    receivedLength += value.length

    if (onProgress && contentLength > 0) {
      onProgress(receivedLength / contentLength)
    }
  }

  const allChunks = new Uint8Array(receivedLength)
  let position = 0
  for (const chunk of chunks) {
    allChunks.set(chunk, position)
    position += chunk.length
  }

  return allChunks.buffer
}

export async function loadModel(
  modelType: string,
  onProgress?: (progress: number) => void
): Promise<ArrayBuffer> {
  const modelUrl = MODEL_URLS[modelType]
  if (!modelUrl) {
    throw new Error(`Unknown model type: ${modelType}`)
  }

  const cached = await getModelFromCache(modelType)
  if (cached) {
    console.log(`Model ${modelType} loaded from cache`)
    if (onProgress) onProgress(1.0)
    return cached
  }

  console.log(`Downloading model ${modelType} from ${modelUrl}`)
  const modelData = await downloadWithProgress(modelUrl, onProgress)

  await saveModelToCache(modelType, modelData)
  console.log(`Model ${modelType} cached successfully`)

  return modelData
}

export async function clearModelCache(): Promise<void> {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch {
    console.warn('Failed to clear model cache (IndexedDB unavailable)')
  }
}
