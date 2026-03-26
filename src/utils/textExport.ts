/**
 * テキストのダウンロード・クリップボードコピー
 */

/**
 * モバイル対応ダウンロードヘルパー
 * iOS Safari では detached な <a> 要素の .click() が無視される場合があるため
 * DOM に追加してからクリックし、URL の解放も遅延させる
 */
export function triggerBlobDownload(url: string, filename: string): void {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  // iOS Safari のために少し遅延を入れてから除去・URL解放
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 200)
}

export function downloadText(text: string, fileName: string): void {
  const baseName = fileName.replace(/\.[^/.]+$/, '')
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  triggerBlobDownload(url, `${baseName}_ocr.txt`)
}

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)
}
