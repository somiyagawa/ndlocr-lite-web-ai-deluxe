/**
 * PDF エクスポート用 CJK フォントローダー
 *
 * Google Fonts API から Noto Sans JP の woff2 を取得し、
 * IndexedDB にキャッシュして pdf-lib + fontkit で使用する。
 * pdf-lib は woff2 / TTF / OTF いずれも対応している。
 */

const FONT_CACHE_DB = 'pdf-font-cache'
const FONT_CACHE_STORE = 'fonts'
const FONT_KEY = 'NotoSansJP-Regular-v2'

/**
 * Google Fonts CSS API からフォントバイナリの URL を取得する。
 * ブラウザの実 User-Agent がそのまま送信されるため、
 * 現代ブラウザでは woff2 URL が返される。pdf-lib + fontkit は woff2 対応。
 */
async function fetchFontUrlFromCSS(): Promise<string> {
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400'
  const res = await fetch(cssUrl)
  if (!res.ok) throw new Error(`Google Fonts CSS fetch failed: ${res.status}`)

  const css = await res.text()
  // CSS 内の url(...) を抽出（複数あれば最初の1つ）
  const urlMatch = css.match(/url\(([^)]+)\)/)
  if (!urlMatch) throw new Error('Font URL not found in CSS response')
  return urlMatch[1].replace(/['"]/g, '')
}

// ---- IndexedDB キャッシュ ----

function openCacheDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(FONT_CACHE_DB, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(FONT_CACHE_STORE)) {
        db.createObjectStore(FONT_CACHE_STORE)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function getCachedFont(): Promise<ArrayBuffer | null> {
  try {
    const db = await openCacheDB()
    return new Promise((resolve) => {
      const tx = db.transaction(FONT_CACHE_STORE, 'readonly')
      const store = tx.objectStore(FONT_CACHE_STORE)
      const getReq = store.get(FONT_KEY)
      getReq.onsuccess = () => resolve(getReq.result ?? null)
      getReq.onerror = () => resolve(null)
    })
  } catch {
    return null
  }
}

async function cacheFont(data: ArrayBuffer): Promise<void> {
  try {
    const db = await openCacheDB()
    return new Promise((resolve) => {
      const tx = db.transaction(FONT_CACHE_STORE, 'readwrite')
      const store = tx.objectStore(FONT_CACHE_STORE)
      store.put(data, FONT_KEY)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    })
  } catch {
    // キャッシュ失敗は無視（次回再取得すればよい）
  }
}

// ---- メモリ内キャッシュ ----
let fontBytesCache: ArrayBuffer | null = null

/**
 * Noto Sans JP フォントバイナリを取得する。
 *
 * 優先順位:
 *   1. メモリキャッシュ
 *   2. IndexedDB キャッシュ
 *   3. Google Fonts API → woff2 フェッチ → IndexedDB に保存
 *
 * @returns フォントの ArrayBuffer。失敗時は null。
 */
export async function loadCJKFontBytes(): Promise<ArrayBuffer | null> {
  // メモリキャッシュ
  if (fontBytesCache) return fontBytesCache

  try {
    // IndexedDB キャッシュ
    const cached = await getCachedFont()
    if (cached && cached.byteLength > 10_000) {
      fontBytesCache = cached
      return cached
    }

    // Google Fonts CSS → woff2 URL → バイナリ取得
    const fontUrl = await fetchFontUrlFromCSS()
    console.log('[pdfFont] Fetching CJK font from:', fontUrl)

    const res = await fetch(fontUrl, { mode: 'cors' })
    if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`)

    const data = await res.arrayBuffer()
    if (data.byteLength < 10_000) {
      throw new Error(`Font data too small: ${data.byteLength} bytes`)
    }

    console.log(`[pdfFont] CJK font loaded: ${(data.byteLength / 1024).toFixed(0)} KB`)

    // キャッシュに保存
    await cacheFont(data)
    fontBytesCache = data
    return data
  } catch (e) {
    console.warn('[pdfFont] CJK font loading failed:', e)
    return null
  }
}
