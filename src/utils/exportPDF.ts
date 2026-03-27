/**
 * PDF エクスポート（テキスト情報埋め込み）
 *
 * OCR結果の元画像を背景として配置し、各テキストブロックの位置に
 * 透明テキストレイヤーを重ねた PDF を生成する。
 * これによりPDF上でテキスト検索・選択が可能になる。
 */

import { jsPDF } from 'jspdf'
import type { OCRResult } from '../types/ocr'
import { registerCJKFont } from './pdfFont'

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
 * dataURL から高解像度版を取得（元画像のフルサイズ）
 * imageDataUrl がサムネイルの場合があるため、OCRResult内のimageDataUrlを使う
 */
function getImageFormat(dataUrl: string): string {
  if (dataUrl.startsWith('data:image/png')) return 'PNG'
  if (dataUrl.startsWith('data:image/gif')) return 'GIF'
  return 'JPEG'
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

  // 画像サイズ取得
  const { width: imgW, height: imgH } = await getImageDimensions(imageDataUrl)

  // PDF作成 - 画像と同じサイズ（ポイント単位、72dpi基準）
  // 画像ピクセルをポイントに変換（150dpiを基準）
  const DPI = 150
  const pdfW = (imgW / DPI) * 72
  const pdfH = (imgH / DPI) * 72

  const orientation = pdfW > pdfH ? 'landscape' : 'portrait'
  const doc = new jsPDF({
    orientation,
    unit: 'pt',
    format: [pdfW, pdfH],
  })

  // CJK フォントを登録（日本語テキストの文字化け防止）
  const cjkFontName = await registerCJKFont(doc)
  const fontName = cjkFontName ?? 'Helvetica'

  // 背景画像を配置
  const format = getImageFormat(imageDataUrl)
  doc.addImage(imageDataUrl, format, 0, 0, pdfW, pdfH)

  // テキストブロックを読み順で並べてテキストレイヤーを重ねる
  const sortedBlocks = [...result.textBlocks].sort((a, b) => a.readingOrder - b.readingOrder)

  // スケールファクター（画像ピクセル → PDFポイント）
  const scaleX = pdfW / imgW
  const scaleY = pdfH / imgH

  for (const block of sortedBlocks) {
    if (!block.text.trim()) continue

    const bx = block.x * scaleX
    const by = block.y * scaleY
    const bw = block.width * scaleX
    const bh = block.height * scaleY

    // テキストブロックの高さに合わせたフォントサイズを推定
    const isVerticalBlock = block.height > block.width * 1.5
    let fontSize: number

    if (isVerticalBlock) {
      fontSize = Math.max(4, Math.min(bw * 0.85, 48))
    } else {
      fontSize = Math.max(4, Math.min(bh * 0.75, 48))
    }

    // 透明テキストを描画（renderingMode 3 = invisible）
    doc.setFont(fontName)
    doc.setFontSize(fontSize)
    doc.setTextColor(0, 0, 0)

    // @ts-expect-error - jsPDF internal API for invisible text rendering
    doc.internal.write('3 Tr') // Set text rendering mode to invisible

    if (isVerticalBlock) {
      const chars = block.text.replace(/\n/g, '')
      const charHeight = fontSize * 1.2
      let cy = by + fontSize
      for (const ch of chars) {
        if (cy > by + bh) break
        doc.text(ch, bx + bw * 0.3, cy)
        cy += charHeight
      }
    } else {
      doc.text(block.text.replace(/\n/g, ' '), bx, by + fontSize, {
        maxWidth: bw,
      })
    }

    // @ts-expect-error - jsPDF internal API
    doc.internal.write('0 Tr')
  }

  // ダウンロード
  const baseName = result.fileName.replace(/\.[^/.]+$/, '')
  doc.save(`${baseName}_ocr.pdf`)
}

/**
 * 複数ページのOCR結果を1つのPDFファイルとしてダウンロード
 * 各ページが1ページとなる複数ページPDFを生成
 */
export async function downloadBatchPDF(results: OCRResult[]): Promise<void> {
  if (results.length === 0) return

  let doc: jsPDF | null = null
  let fontName = 'Helvetica'
  const DPI = 150

  for (let pageIdx = 0; pageIdx < results.length; pageIdx++) {
    const result = results[pageIdx]
    const imageDataUrl = result.imageDataUrl
    if (!imageDataUrl) continue

    const { width: imgW, height: imgH } = await getImageDimensions(imageDataUrl)
    const pdfW = (imgW / DPI) * 72
    const pdfH = (imgH / DPI) * 72
    const orientation = pdfW > pdfH ? 'landscape' : 'portrait'

    if (doc === null) {
      doc = new jsPDF({ orientation, unit: 'pt', format: [pdfW, pdfH] })
      // CJK フォントを登録（最初のページ作成時に1回だけ）
      const cjkFontName = await registerCJKFont(doc)
      fontName = cjkFontName ?? 'Helvetica'
    } else {
      doc.addPage([pdfW, pdfH], orientation)
    }

    const format = getImageFormat(imageDataUrl)
    doc.addImage(imageDataUrl, format, 0, 0, pdfW, pdfH)

    const sortedBlocks = [...result.textBlocks].sort((a, b) => a.readingOrder - b.readingOrder)
    const scaleX = pdfW / imgW
    const scaleY = pdfH / imgH

    for (const block of sortedBlocks) {
      if (!block.text.trim()) continue
      const bx = block.x * scaleX
      const by = block.y * scaleY
      const bw = block.width * scaleX
      const bh = block.height * scaleY

      const isVerticalBlock = block.height > block.width * 1.5
      let fontSize: number
      if (isVerticalBlock) {
        fontSize = Math.max(4, Math.min(bw * 0.85, 48))
      } else {
        fontSize = Math.max(4, Math.min(bh * 0.75, 48))
      }

      doc.setFont(fontName)
      doc.setFontSize(fontSize)
      doc.setTextColor(0, 0, 0)
      // @ts-expect-error - jsPDF internal API for invisible text rendering
      doc.internal.write('3 Tr')

      if (isVerticalBlock) {
        const chars = block.text.replace(/\n/g, '')
        const charHeight = fontSize * 1.2
        let cy = by + fontSize
        for (const ch of chars) {
          if (cy > by + bh) break
          doc.text(ch, bx + bw * 0.3, cy)
          cy += charHeight
        }
      } else {
        doc.text(block.text.replace(/\n/g, ' '), bx, by + fontSize, { maxWidth: bw })
      }
      // @ts-expect-error - jsPDF internal API
      doc.internal.write('0 Tr')
    }
  }

  if (doc) {
    doc.save('ocr_all_pages.pdf')
  }
}
