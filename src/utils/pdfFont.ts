/**
 * PDF エクスポート用 CJK フォントローダー
 *
 * jsPDF のビルトインフォント (Helvetica 等) は Latin-1 のみ対応で、
 * 日本語文字は文字化けする。Noto Sans JP Regular の TTF を
 * Google Fonts API から動的にフェッチし、IndexedDB にキャッシュして
 * jsPDF に登録する。
 */

import type { jsPDF } from 'jspdf'

const FONT_CACHE_DB = 'pdf-font-cache'
const FONT_CACHE_STORE = 'fonts'
const FONT_KEY = 'NotoSansJP-Regular'

/**
 * Google Fonts CSS から TTF の直接 URL を抽出する
 * User-Agent を指定しないと woff2 が返されるため、
 * 古いブラウザの UA を使って TTF を取得する
 */
async function fetchFontUrl(): Promise<string> {
  // Google Fonts CSS API に TrueType を要求
  // User-Agent をカスタムして TTF を取得
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400'
  const res = await fetch(cssUrl, {
    headers: {
      // Safari 5 の UA を使うと TTF が返る
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8',
    },
  })

  if (!res.ok) {
    // フォールバック: woff2 を直接使う（jsPDF 2.5+ は woff2 未対応だが試行）
    throw new Error('Failed to fetch Google Fonts CSS')
  }

  const css = await res.text()
  // url(...) を抽出
  const urlMatch = css.match(/url\(([^)]+)\)/)
  if (!urlMatch) throw new Error('Font URL not found in CSS')
  return urlMatch[1].replace(/['"]/g, '')
}

/**
 * IndexedDB からキャッシュされたフォントデータを取得
 */
function getCachedFont(): Promise<ArrayBuffer | null> {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(FONT_CACHE_DB, 1)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(FONT_CACHE_STORE)) {
          db.createObjectStore(FONT_CACHE_STORE)
        }
      }
      req.onsuccess = () => {
        const db = req.result
        const tx = db.transaction(FONT_CACHE_STORE, 'readonly')
        const store = tx.objectStore(FONT_CACHE_STORE)
        const getReq = store.get(FONT_KEY)
        getReq.onsuccess = () => resolve(getReq.result ?? null)
        getReq.onerror = () => resolve(null)
      }
      req.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
}

/**
 * IndexedDB にフォントデータをキャッシュ
 */
function cacheFont(data: ArrayBuffer): Promise<void> {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(FONT_CACHE_DB, 1)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(FONT_CACHE_STORE)) {
          db.createObjectStore(FONT_CACHE_STORE)
        }
      }
      req.onsuccess = () => {
        const db = req.result
        const tx = db.transaction(FONT_CACHE_STORE, 'readwrite')
        const store = tx.objectStore(FONT_CACHE_STORE)
        store.put(data, FONT_KEY)
        tx.oncomplete = () => resolve()
        tx.onerror = () => resolve()
      }
      req.onerror = () => resolve()
    } catch {
      resolve()
    }
  })
}

/**
 * ArrayBuffer を base64 文字列に変換
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/** フォントBase64キャッシュ（メモリ内に保持し繰り返しロードを回避） */
let fontBase64Cache: string | null = null

/**
 * Noto Sans JP フォントを取得し、jsPDF ドキュメントに登録する
 *
 * 初回はネットワークからフェッチして IndexedDB にキャッシュ。
 * 2回目以降はキャッシュから読み込む。
 *
 * @returns 登録に成功した場合のフォント名、失敗時は null（Helvetica フォールバック）
 */
export async function registerCJKFont(doc: jsPDF): Promise<string | null> {
  try {
    // base64 がメモリにあればそれを使う
    if (!fontBase64Cache) {
      // IndexedDB キャッシュを確認
      let fontData = await getCachedFont()

      if (!fontData) {
        // Google Fonts からフェッチ
        // fetchFontUrl は CORS の問題で失敗する可能性がある（ブラウザは UA ヘッダーを上書きする）
        // フォールバック: 直接既知の URL を試す
        const directUrls = [
          // Google Fonts の直接 TTF URL（安定した URL）
          'https://fonts.gstatic.com/s/notosansjp/v53/KFRmCnaiYGlNN50FEj4b5QMYDvRhL0m1CQITG6RaOA.ttf',
          // WOFF2 (jsPDF はサポートしていない可能性あり)
        ]

        for (const url of directUrls) {
          try {
            const res = await fetch(url, { mode: 'cors' })
            if (res.ok) {
              fontData = await res.arrayBuffer()
              if (fontData.byteLength > 10000) break  // 妥当なサイズか確認
              fontData = null
            }
          } catch {
            continue
          }
        }

        if (!fontData) {
          // CSS パース方式を試行
          try {
            const fontUrl = await fetchFontUrl()
            const res = await fetch(fontUrl)
            if (res.ok) {
              fontData = await res.arrayBuffer()
            }
          } catch {
            // 全て失敗
          }
        }

        if (!fontData || fontData.byteLength < 10000) {
          console.warn('CJK font loading failed, falling back to Helvetica')
          return null
        }

        // キャッシュに保存
        await cacheFont(fontData)
      }

      fontBase64Cache = arrayBufferToBase64(fontData)
    }

    // jsPDF に登録
    doc.addFileToVFS('NotoSansJP-Regular.ttf', fontBase64Cache)
    doc.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal')
    return 'NotoSansJP'
  } catch (e) {
    console.warn('Failed to register CJK font:', e)
    return null
  }
}
