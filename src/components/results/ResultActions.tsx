import { useState } from 'react'
import type { OCRResult } from '../../types/ocr'
import { downloadText, copyToClipboard } from '../../utils/textExport'
import type { Language } from '../../i18n'
import { L } from '../../i18n'

interface ResultActionsProps {
  results: OCRResult[]
  currentResult: OCRResult | null
  lang: Language
}

export function ResultActions({ results, currentResult, lang }: ResultActionsProps) {
  const [copied, setCopied] = useState(false)
  const [includeFileName, setIncludeFileName] = useState(false)
  const [ignoreNewlines, setIgnoreNewlines] = useState(false)

  const applyOptions = (text: string) =>
    ignoreNewlines ? text.replace(/\n/g, '') : text

  const buildText = (result: OCRResult) =>
    applyOptions(includeFileName ? `=== ${result.fileName} ===\n${result.fullText}` : result.fullText)

  const handleCopy = async () => {
    const text = currentResult ? buildText(currentResult) : ''
    try {
      await copyToClipboard(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert(L(lang, { ja: 'コピーに失敗しました', en: 'Failed to copy', 'zh-CN': '复制失败', 'zh-TW': '複製失敗', ko: '복사 실패', la: 'Copia defecit', eo: 'Kopiago malsukcesis', ru: 'Ошибка копирования', el: 'Αποτυχία αντιγραφής', syc: 'ܐܬܟܠܝ ܢܣܚܐ', cop: 'ⲙⲉⲧⲣⲉϩⲁⲧ ⲉϩⲟⲩⲛ', sa: 'प्रতिलिपिकरणे विफलः' }))
    }
  }

  const handleDownload = () => {
    if (!currentResult) return
    downloadText(buildText(currentResult), currentResult.fileName)
  }

  const handleDownloadAll = () => {
    if (results.length === 0) return
    const allText = results.map((r) => buildText(r)).join('\n\n')
    downloadText(allText, 'ocr_results')
  }

  const disabled = !currentResult

  return (
    <div className="result-actions">
      <label className="result-actions-option">
        <input
          type="checkbox"
          checked={includeFileName}
          onChange={(e) => setIncludeFileName(e.target.checked)}
        />
        {L(lang, { ja: 'ファイル名を記載する', en: 'Include file name', 'zh-CN': '包含文件名', 'zh-TW': '包含文件名', ko: '파일 이름 포함', la: 'Nomen fasciculi includere', eo: 'Inkludi dosier-nomon', ru: 'Включить имя файла', el: 'Συμπερίληψη ονόματος αρχείου', syc: 'ܐܚܝܕ ܫܡ ܩܛܝܡܐ', cop: 'ⲁⲧ ⲛⲁⲙⲟⲩ ⲛϫⲱⲙⲉ', sa: 'फलकनाम समावेशयतु' })}
      </label>
      <label className="result-actions-option">
        <input
          type="checkbox"
          checked={ignoreNewlines}
          onChange={(e) => setIgnoreNewlines(e.target.checked)}
        />
        {L(lang, { ja: '改行を無視する', en: 'Ignore newlines', 'zh-CN': '忽略换行', 'zh-TW': '忽略換行', ko: '줄바꿈 무시', la: 'Lineas novas negligere', eo: 'Ignori novliniojn', ru: 'Игнорировать переносы строк', el: 'Αγνόηση αλλαγών γραμμής', syc: 'ܐܛܦܛܐ ܡܬ̈ܩܠ̈ܐ', cop: 'ⲙⲉⲧⲕⲟⲓ ⲛⲣⲟⲗ', sa: 'नवपंक्तिनिर्लक्षयतु' })}
      </label>
      <div className="result-actions-buttons">
        <button className="btn btn-primary" onClick={handleCopy} disabled={disabled}>
          {copied ? L(lang, { ja: 'コピーしました！', en: 'Copied!', 'zh-CN': '已复制！', 'zh-TW': '已複製！', ko: '복사됨!', la: 'Copitum!', eo: 'Kopiita!', ru: 'Скопировано!', el: 'Αντιγράφηκε!', syc: '!ܐܬܢܣܚ', cop: '!ⲁⲑⲛⲉⲥϩ', sa: 'प्रतिलिपीकृतम्!' }) : L(lang, { ja: 'コピー', en: 'Copy', 'zh-CN': '复制', 'zh-TW': '複製', ko: '복사', la: 'Copire', eo: 'Kopii', ru: 'Копировать', el: 'Αντιγραφή', syc: 'ܢܣܚ', cop: 'ⲑⲛⲉⲥϩ', sa: 'प्रतिलिपिः' })}
        </button>
        <button className="btn btn-secondary" onClick={handleDownload} disabled={disabled}>
          {L(lang, { ja: 'ダウンロード', en: 'Download', 'zh-CN': '下载', 'zh-TW': '下載', ko: '다운로드', la: 'Descensio', eo: 'Elŝuti', ru: 'Скачать', el: 'Λήψη', syc: 'ܐܚܬ', cop: 'ⲡⲁⲗ', sa: 'अवतारणम्' })}
        </button>
        {results.length > 1 && (
          <button className="btn btn-secondary" onClick={handleDownloadAll}>
            {L(lang, { ja: '全てダウンロード', en: 'Download All', 'zh-CN': '全部下载', 'zh-TW': '全部下載', ko: '모두 다운로드', la: 'Omnia descensio', eo: 'Elŝuti ĉiujn', ru: 'Скачать всё', el: 'Λήψη όλων', syc: 'ܐܚܬ ܓܡܝܪ', cop: 'ⲡⲁⲗ ⲛⲧⲟⲛ ⲧⲏⲣⲟⲩ', sa: 'सर्वाणि अवतारयतु' })}
          </button>
        )}
      </div>
    </div>
  )
}
