import { t } from '../../i18n'
import type { Language } from '../../i18n'

interface AIConnectHelpProps {
  lang: Language
  onClose: () => void
  onOpenSettings: () => void
}

export function AIConnectHelp({ lang, onClose, onOpenSettings }: AIConnectHelpProps) {
  const steps = [
    { label: t(lang, 'aiConnectHelp.step1Label'), detail: t(lang, 'aiConnectHelp.step1Detail') },
    { label: t(lang, 'aiConnectHelp.step2Label'), detail: t(lang, 'aiConnectHelp.step2Detail') },
    { label: t(lang, 'aiConnectHelp.step3Label'), detail: t(lang, 'aiConnectHelp.step3Detail') },
    { label: t(lang, 'aiConnectHelp.step4Label'), detail: t(lang, 'aiConnectHelp.step4Detail') },
    { label: t(lang, 'aiConnectHelp.step5Label'), detail: t(lang, 'aiConnectHelp.step5Detail') },
  ]

  const providers = [
    { name: 'Anthropic (Claude)', desc: t(lang, 'aiConnectHelp.anthropicDesc') },
    { name: 'OpenAI (GPT)', desc: t(lang, 'aiConnectHelp.openaiDesc') },
    { name: 'Google (Gemini)', desc: t(lang, 'aiConnectHelp.googleDesc') },
    { name: 'Groq', desc: t(lang, 'aiConnectHelp.groqDesc') },
  ]

  const notes = [
    t(lang, 'aiConnectHelp.note1'),
    t(lang, 'aiConnectHelp.note2'),
    t(lang, 'aiConnectHelp.note3'),
  ]

  const handleOpenSettings = () => {
    onClose()
    onOpenSettings()
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="help-page-modal ai-connect-help">
        <div className="help-page-header">
          <h2 className="help-page-title">{t(lang, 'aiConnectHelp.title')}</h2>
          <button className="btn-icon help-page-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="help-page-body">
          <p className="ai-help-intro">{t(lang, 'aiConnectHelp.intro')}</p>

          <div className="ai-help-steps">
            {steps.map((step, i) => (
              <div key={i} className="ai-help-step">
                <div className="ai-help-step-label">{step.label}</div>
                <div className="ai-help-step-detail">{step.detail}</div>
              </div>
            ))}
          </div>

          <h3 className="help-section-heading">{t(lang, 'aiConnectHelp.supportedServices')}</h3>
          <div className="ai-help-providers">
            {providers.map((prov, i) => (
              <div key={i} className="ai-help-provider">
                <span className="ai-help-provider-name">{prov.name}</span>
                <span className="ai-help-provider-desc">{prov.desc}</span>
              </div>
            ))}
          </div>

          <h3 className="help-section-heading">{t(lang, 'aiConnectHelp.notesHeading')}</h3>
          <div className="ai-help-notes">
            {notes.map((note, i) => (
              <p key={i} className="ai-help-note">{note}</p>
            ))}
          </div>

          <div className="ai-help-actions">
            <button className="btn btn-primary" onClick={handleOpenSettings}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              {t(lang, 'aiConnectHelp.openSettings')}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              {t(lang, 'aiConnectHelp.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
