/**
 * PDF エクスポート（テキスト情報埋め込み）
 *
 * OCR結果の元画像を背景として配置し、各テキストブロックの位置に
 * 透明テキストレイヤーを重ねた PDF を生成する。
 * これによりPDF上でテキスト検索・選択が可能になる。
 *
 * pdf-lib + fontkit を使用し、CJK (日本語) テキストを正しくエンコードする。
 *
 * === テキストレイヤー設計方針 ===
 * テキストレイヤーは不可視 (opacity: 0.01) であり、
 * 検索・選択のみに使用される。したがって:
 *   - 視覚的な位置精度は不要（ブロック左上付近に配置すれば十分）
 *   - 各ブロックのテキストは 1 回の drawText で一括描画する
 *     （1 文字ずつ描画すると PDF ビューアが文字間ギャップを
 *       半角スペースと誤認する問題を回避）
 *   - maxWidth は使用しない
 *     （pdf-lib はスペースで折り返すため、スペースのない日本語で機能しない）
 *   - 縦書き・横書きの区別なく横方向に描画する
 *     （不可視なので向きは無関係、テキスト内容のみが重要）
 */

import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import type { OCRResult } from '../types/ocr'
import { loadCJKFontBytes } from './pdfFont'

// テキストレイヤーの不可視テキスト用 opacity
// 0 ではなく極小値を使用する。
// 一部の PDF ビューア (古い Acrobat バージョン含む) は
// opacity=0 のテキストを検索インデックスから除外するため、
// 人間には知覚できないが PDF エンジンが「可視」と判定する値にする。
const TEXT_OPACITY = 0.01

/**
 * dataURL から画像の自然サイズを取得
 */
function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = reject
    img.src = dataUrl
  })
}

/**
 * dataURL を Uint8Array に変換
 */
function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1]
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

/**
 * dataURL が PNG かどうか判定
 */
function isPng(dataUrl: string): boolean {
  return dataUrl.startsWith('data:image/png')
}

/**
 * PDFDocument に画像を埋め込む
 */
async function embedImage(pdfDoc: PDFDocument, dataUrl: string) {
  const imageBytes = dataUrlToUint8Array(dataUrl)
  if (isPng(dataUrl)) {
    return pdfDoc.embedPng(imageBytes)
  }
  return pdfDoc.embedJpg(imageBytes)
}

/**
 * テキストからフォントでエンコードできない文字を除去する。
 * 文字列全体を一度に試し、成功すればそのまま返す（高速パス）。
 * 失敗した場合のみ文字単位でフィルタする。
 */
function filterEncodableText(
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  text: string,
): string {
  try {
    font.encodeText(text)
    return text
  } catch {
    // 失敗時のみ文字単位フィルタ
  }

  let result = ''
  for (const ch of text) {
    try {
      font.encodeText(ch)
      result += ch
    } catch {
      // エンコード不可の文字をスキップ
    }
  }
  return result
}

/**
 * OCR結果からテキスト埋め込みPDFを生成・ダウンロード
 *
 * @param result - OCR結果
 * @param fullImageDataUrl - 元画像のフルサイズ dataURL（オプション、なければ result.imageDataUrl を使用）
 */
export async function downloadPDF(result: OCRResult, fullImageDataUrl?: string): Promise<void> {
  const imageDataUrl = fullImageDataUrl || result.imageDataUrl
  if (!imageDataUrl) return

  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)

  // CJK フォント読み込み・埋め込み（subset: false で /Widths 破損を回避）
  const fontBytes = await loadCJKFontBytes()
  const font = fontBytes
    ? await pdfDoc.embedFont(fontBytes, { subset: false })
    : undefined

  if (!font) {
    console.warn('[exportPDF] CJK font not available — PDF text layer will be skipped')
  }

  await addPageToPdf(pdfDoc, result, imageDataUrl, font)

  const pdfBytes = await pdfDoc.save()
  const baseName = result.fileName.replace(/\.[^/.]+$/, '')
  triggerDownload(pdfBytes, `${baseName}_ocr.pdf`)
}

/**
 * 複数ページのOCR結果を1つのPDFファイルとしてダウンロード
 *
 * @param results - OCR結果配列
 * @param fullImageDataUrls - 各ページのフルサイズ画像 dataURL 配列（オプション）
 */
export async function downloadBatchPDF(
  results: OCRResult[],
  fullImageDataUrls?: (string | undefined)[],
): Promise<void> {
  if (results.length === 0) return

  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)

  const fontBytes = await loadCJKFontBytes()
  const font = fontBytes
    ? await pdfDoc.embedFont(fontBytes, { subset: false })
    : undefined

  if (!font) {
    console.warn('[exportPDF] CJK font not available — PDF text layer will be skipped')
  }

  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    const imageDataUrl = fullImageDataUrls?.[i] || result.imageDataUrl
    if (!imageDataUrl) continue
    await addPageToPdf(pdfDoc, result, imageDataUrl, font)
  }

  if (pdfDoc.getPageCount() === 0) return

  const pdfBytes = await pdfDoc.save()
  triggerDownload(pdfBytes, 'ocr_all_pages.pdf')
}

// ---- 内部ヘルパー ----

/**
 * PDFDocument に1ページを追加（画像背景 + 透明テキストレイヤー）
 *
 * テキストは各ブロックにつき 1 回の drawText で一括描画する。
 * 1 文字ずつ描画すると PDF ビューアがギャップを半角スペースと
 * 誤認するため、必ず連続した文字列として描画する。
 */
async function addPageToPdf(
  pdfDoc: PDFDocument,
  result: OCRResult,
  imageDataUrl: string,
  font: Awaited<ReturnType<PDFDocument['embedFont']>> | undefined,
): Promise<void> {
  const { width: imgW, height: imgH } = await getImageDimensions(imageDataUrl)

  const DPI = 150
  const pdfW = (imgW / DPI) * 72
  const pdfH = (imgH / DPI) * 72

  const page = pdfDoc.addPage([pdfW, pdfH])

  // 背景画像を配置
  const image = await embedImage(pdfDoc, imageDataUrl)
  page.drawImage(image, { x: 0, y: 0, width: pdfW, height: pdfH })

  if (!font) return

  const sortedBlocks = [...result.textBlocks].sort((a, b) => a.readingOrder - b.readingOrder)

  const scaleX = pdfW / imgW
  const scaleY = pdfH / imgH

  for (const block of sortedBlocks) {
    if (!block.text.trim()) continue

    const bx = block.x * scaleX
    // pdf-lib は左下原点なので Y を反転
    const by = pdfH - (block.y * scaleY)
    const bh = block.height * scaleY

    // フォントサイズ: ブロック高さから推定（小さすぎず大きすぎず）
    // 不可視テキストなので正確さよりも存在が重要
    const fontSize = Math.max(4, Math.min(bh * 0.15, 24))

    // 改行を除去し、エンコード可能な文字のみに絞る
    const rawText = block.text.replace(/\n/g, '')
    const safeText = filterEncodableText(font, rawText)
    if (!safeText.trim()) continue

    // ブロック全体のテキストを 1 回の drawText で描画。
    // - 1 文字ずつ描画しない（ビューアがギャップを半角スペースと誤認するため）
    // - maxWidth を使わない（pdf-lib はスペースで折り返すため日本語で機能しない）
    // - 縦書き/横書きの区別なし（不可視テキストなので向きは無関係）
    try {
      page.drawText(safeText, {
        x: bx,
        y: by - fontSize,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
        opacity: TEXT_OPACITY,
      })
    } catch (e) {
      console.warn('[exportPDF] drawText failed for block:', e)
    }
  }
}

/**
 * Uint8Array を Blob 化してブラウザダウンロードをトリガー
 */
function triggerDownload(pdfBytes: Uint8Array, fileName: string): void {
  const blob = new Blob([pdfBytes.slice(0).buffer], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
