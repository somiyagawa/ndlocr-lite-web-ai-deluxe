import type { OCRResult, TextBlock } from '../../types/ocr'
import type { Language } from '../../i18n'
import { L } from '../../i18n'

interface ResultPanelProps {
  result: OCRResult | null
  selectedBlock: TextBlock | null
  selectedPageBlockText?: string | null
  lang: Language
}

export function ResultPanel({ result, selectedBlock, selectedPageBlockText, lang }: ResultPanelProps) {
  if (!result) {
    return (
      <div className="result-panel empty">
        <p>{L(lang, { ja: '結果なし', en: 'No results', 'zh-CN': '无结果', 'zh-TW': '無結果', ko: '결과 없음', la: 'Nulla eventus', eo: 'Neniuj rezultoj', ru: 'Нет результатов', el: 'Κανένα αποτέλεσμα', syc: 'ܠܝܬ ܦܠ̈ܛ' })}</p>
      </div>
    )
  }

  return (
    <div className="result-panel">
      <div className="result-header">
        <span className="result-filename">{result.fileName}</span>
        <span className="result-stats">
          {result.textBlocks.length}
          {L(lang, { ja: ' 領域', en: ' regions', 'zh-CN': ' 区域', 'zh-TW': ' 區域', ko: ' 영역', la: ' regiones', eo: ' regionoj', ru: ' областей', el: ' περιοχές', syc: ' ܐܬܪ̈ܘܬ' })}
          {' · '}
          {(result.processingTimeMs / 1000).toFixed(1)}s
        </span>
      </div>

      <div className="result-text">
        {result.textBlocks.length === 0 ? (
          <p className="no-text">
            {L(lang, { ja: 'テキストが検出されませんでした', en: 'No text detected', 'zh-CN': '未检测到文本', 'zh-TW': '未偵測到文字', ko: '감지된 텍스트 없음', la: 'Nulla textus detectus', eo: 'Nenia teksto detektita', ru: 'Текст не обнаружен', el: 'Δεν ανιχνεύθηκε κείμενο', syc: 'ܠܐ ܐܬܠܦܓܐ ܟܬܒܐ' })}
          </p>
        ) : selectedPageBlockText != null ? (
          <div>
            <div className="selected-text-label">
              {L(lang, { ja: 'ブロック内のテキスト:', en: 'Block text:', 'zh-CN': '区块内的文本:', 'zh-TW': '區塊內的文字:', ko: '블록 내 텍스트:', la: 'Textus in bloco:', eo: 'Teksto en bloko:', ru: 'Текст блока:', el: 'Κείμενο μπλοκ:', syc: 'ܟܬܒܐ ܒܓܘܦܢܐ:' })}
            </div>
            <div className="selected-text">{selectedPageBlockText || L(lang, { ja: '(空)', en: '(empty)', 'zh-CN': '(空)', 'zh-TW': '(空)', ko: '(비어있음)', la: '(vacuum)', eo: '(malplena)', ru: '(пусто)', el: '(κενό)', syc: '(ܠܐ ܕܐܝܬ)' })}</div>
            <hr className="divider" />
            <pre className="full-text">{result.fullText}</pre>
          </div>
        ) : selectedBlock ? (
          // 選択された領域のテキストをハイライト
          <div>
            <div className="selected-text-label">
              {L(lang, { ja: '選択領域のテキスト:', en: 'Selected region:', 'zh-CN': '选定区域的文本:', 'zh-TW': '選定區域的文字:', ko: '선택한 영역의 텍스트:', la: 'Textus in regione lecta:', eo: 'Teksto en elektita regiono:', ru: 'Выбранный регион:', el: 'Επιλεγμένη περιοχή:', syc: 'ܟܬܒܐ ܒܫܘܪܐ ܓܒܝܐ:' })}
            </div>
            <div className="selected-text">{selectedBlock.text || L(lang, { ja: '(空)', en: '(empty)', 'zh-CN': '(空)', 'zh-TW': '(空)', ko: '(비어있음)', la: '(vacuum)', eo: '(malplena)', ru: '(пусто)', el: '(κενό)', syc: '(ܠܐ ܕܐܝܬ)' })}</div>
            <hr className="divider" />
            <div className="full-text">{result.fullText}</div>
          </div>
        ) : (
          <pre className="full-text">{result.fullText}</pre>
        )}
      </div>
    </div>
  )
}
