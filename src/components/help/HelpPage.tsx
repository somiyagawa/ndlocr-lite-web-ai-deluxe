import { t } from '../../i18n'
import type { Language } from '../../i18n'

interface HelpPageProps {
  lang: Language
  onClose: () => void
}

export function HelpPage({ lang, onClose }: HelpPageProps) {
  const sections = [
    { heading: t(lang, 'helpGuide.overview'), body: t(lang, 'helpGuide.overviewText') },
    { heading: t(lang, 'helpGuide.loadingImages'), body: t(lang, 'helpGuide.loadingImagesText') },
    { heading: t(lang, 'helpGuide.imageCorrection'), body: t(lang, 'helpGuide.imageCorrectionText') },
    { heading: t(lang, 'helpGuide.splitCenter'), body: t(lang, 'helpGuide.splitCenterText') },
    { heading: t(lang, 'helpGuide.runningOcr'), body: t(lang, 'helpGuide.runningOcrText') },
    { heading: t(lang, 'helpGuide.regionSelect'), body: t(lang, 'helpGuide.regionSelectText') },
    { heading: t(lang, 'helpGuide.textEditor'), body: t(lang, 'helpGuide.textEditorText') },
    { heading: t(lang, 'helpGuide.searchReplace'), body: t(lang, 'helpGuide.searchReplaceText') },
    { heading: t(lang, 'helpGuide.exportOptions'), body: t(lang, 'helpGuide.exportOptionsText') },
    { heading: t(lang, 'helpGuide.searchablePdf'), body: t(lang, 'helpGuide.searchablePdfText') },
    { heading: t(lang, 'helpGuide.otherFormats'), body: t(lang, 'helpGuide.otherFormatsText') },
    { heading: t(lang, 'helpGuide.aiProofreading'), body: t(lang, 'helpGuide.aiProofreadingText') },
    { heading: t(lang, 'helpGuide.historyGuide'), body: t(lang, 'helpGuide.historyGuideText') },
    { heading: t(lang, 'helpGuide.darkModeGuide'), body: t(lang, 'helpGuide.darkModeGuideText') },
    { heading: t(lang, 'helpGuide.multilingualUi'), body: t(lang, 'helpGuide.multilingualUiText') },
    { heading: t(lang, 'helpGuide.recommended'), body: t(lang, 'helpGuide.recommendedText') },
    { heading: t(lang, 'helpGuide.chojuGiga'), body: t(lang, 'helpGuide.chojuGigaText') },
  ]

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="help-page-modal">
        <div className="help-page-header">
          <h2 className="help-page-title">{t(lang, 'helpGuide.title')}</h2>
          <button className="btn-icon help-page-close" onClick={onClose} aria-label={t(lang, 'helpGuide.close')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="help-page-body">
          {sections.map((sec, i) => (
            <section key={i} className="help-section">
              <h3 className="help-section-heading">{sec.heading}</h3>
              <p className="help-section-body">{sec.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
