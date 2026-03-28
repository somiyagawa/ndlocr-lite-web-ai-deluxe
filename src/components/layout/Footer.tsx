import { memo } from 'react'
import type { Language } from '../../i18n'
import { t } from '../../i18n'

interface FooterProps {
  lang: Language
  onBugReport?: () => void
}

export const Footer = memo(function Footer({ lang, onBugReport }: FooterProps) {
  // Template renderer: replaces {placeholder} in translated string with React nodes
  function renderTemplate(template: string, vars: Record<string, React.ReactNode>): React.ReactNode[] {
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    const regex = /\{(\w+)\}/g
    let match: RegExpExecArray | null
    while ((match = regex.exec(template)) !== null) {
      if (match.index > lastIndex) {
        parts.push(template.slice(lastIndex, match.index))
      }
      const key = match[1]
      parts.push(vars[key] ?? `{${key}}`)
      lastIndex = regex.lastIndex
    }
    if (lastIndex < template.length) {
      parts.push(template.slice(lastIndex))
    }
    return parts
  }

  return (
    <footer className="footer">
      <div className="footer-privacy">
        <span className="privacy-icon">🔒</span>
        {(() => {
          const onnxLink = <a href="https://www.npmjs.com/package/onnxruntime-web" target="_blank" rel="noopener noreferrer">ONNX Web Runtime</a>
          const template = t(lang, 'footer.privacyText')
          return <span>{renderTemplate(template, { onnxLink }).map((part, i) => <span key={i}>{part}</span>)}</span>
        })()}
      </div>
      <div className="footer-attribution">
        {(() => {
          const ndlocr = <a href="https://github.com/ndl-lab/ndlocr-lite" target="_blank" rel="noopener noreferrer">NDLOCR-Lite</a>
          const ndlkoten = <a href="https://github.com/ndl-lab/ndlkotenocr-lite" target="_blank" rel="noopener noreferrer">NDL古典籍OCR-Lite</a>
          const hashimoto = <a href="https://github.com/yuta1984/ndlocrlite-web" target="_blank" rel="noopener noreferrer">{t(lang, 'footer.hashimotoName')}</a>
          const ogata = <a href="https://github.com/ogwata/ndlocr-lite-web-ai" target="_blank" rel="noopener noreferrer">{t(lang, 'footer.ogataName')}</a>
          const miyagawa = <a href="https://researchmap.jp/SoMiyagawa" target="_blank" rel="noopener noreferrer">{t(lang, 'footer.miyagawaName')}</a>
          const template = t(lang, 'footer.attribution')
          return <span className="footer-attribution-text">{renderTemplate(template, { ndlocr, ndlkoten, hashimoto, ogata, miyagawa }).map((part, i) => <span key={i}>{part}</span>)}</span>
        })()}
      </div>
      <div className="footer-frog-credit">
        {(() => {
          const aoike = <a href="https://researchmap.jp/blue0620" target="_blank" rel="noopener noreferrer">{t(lang, 'footer.aoikeName')}</a>
          const template = t(lang, 'footer.frogCreditTemplate')
          return <>🐸 {renderTemplate(template, { aoike }).map((part, i) => <span key={i}>{part}</span>)}</>
        })()}
      </div>
      <div className="footer-license">
        {(() => {
          const ccby = <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>
          const mit = <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT</a>
          const ndl = t(lang, 'footer.licenseNdlocr')
          const webPort = t(lang, 'footer.licenseWebPort')
          const aiLabel = t(lang, 'footer.licenseAI')
          const ultra = t(lang, 'footer.licenseUltra')
          const koten = t(lang, 'footer.licenseKoten')
          return (
            <span>
              {ndl} {ccby} / {webPort} {ccby} / {aiLabel} {mit} / {ultra} {ccby} / {koten} {ccby}
            </span>
          )
        })()}
      </div>
      {onBugReport && (
        <div className="footer-bug-report">
          <button className="footer-bug-report-btn" onClick={onBugReport} type="button">
            {t(lang, 'footer.bugReport')}
          </button>
        </div>
      )}
    </footer>
  )
})
