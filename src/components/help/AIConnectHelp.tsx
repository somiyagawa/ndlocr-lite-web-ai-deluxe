import type { Language } from '../../i18n'

interface AIConnectHelpProps {
  lang: Language
  onClose: () => void
  onOpenSettings: () => void
}

const content: Record<string, {
  title: string
  intro: string
  steps: { label: string; detail: string }[]
  providers: { name: string; desc: string }[]
  notes: string[]
  settingsBtn: string
  closeBtn: string
}> = {
  ja: {
    title: 'AI校正機能の接続方法',
    intro: 'AI校正機能を使うと、OCR結果をAIが自動で校正します。接続には各AIサービスのAPIキーが必要です。',
    steps: [
      {
        label: '1. APIキーを取得する',
        detail: '利用したいAIサービス（Claude, GPT, Gemini等）の公式サイトでAPIキーを発行してください。多くのサービスは無料枠があります。',
      },
      {
        label: '2. 設定画面を開く',
        detail: 'ヘッダー右側の歯車アイコン（⚙）をクリックするか、下の「設定を開く」ボタンを押してください。',
      },
      {
        label: '3. プロバイダーを選択',
        detail: '設定画面の「AIプロバイダー」タブで使用するサービスを選びます。',
      },
      {
        label: '4. APIキーを入力',
        detail: 'APIキー入力欄にキーを貼り付けます。キーはブラウザ内で暗号化保存され、外部サーバーには送信されません。',
      },
      {
        label: '5. 接続テスト',
        detail: '「接続テスト」ボタンを押して接続を確認します。成功すると「AI接続済み」と表示されます。',
      },
    ],
    providers: [
      { name: 'Anthropic (Claude)', desc: 'console.anthropic.com でAPIキーを取得' },
      { name: 'OpenAI (GPT)', desc: 'platform.openai.com でAPIキーを取得' },
      { name: 'Google (Gemini)', desc: 'aistudio.google.com でAPIキーを取得' },
      { name: 'Groq', desc: 'console.groq.com でAPIキーを取得（無料枠あり）' },
    ],
    notes: [
      'APIキーはブラウザ内でAES-GCM暗号化され、安全に保存されます。',
      'AI校正はOCR結果のテキストのみをAPIに送信します。画像は送信されません。',
      '歴史的文書の旧字体はデフォルトで保持されます（現代字体に変換しません）。',
    ],
    settingsBtn: '設定を開く',
    closeBtn: '閉じる',
  },
  en: {
    title: 'How to Connect AI Proofreading',
    intro: 'AI proofreading automatically corrects OCR results using AI. An API key from your preferred AI service is required.',
    steps: [
      {
        label: '1. Get an API Key',
        detail: 'Visit the official website of your preferred AI service (Claude, GPT, Gemini, etc.) and generate an API key. Most services offer a free tier.',
      },
      {
        label: '2. Open Settings',
        detail: 'Click the gear icon (⚙) in the header, or press the "Open Settings" button below.',
      },
      {
        label: '3. Select a Provider',
        detail: 'In the Settings "AI Provider" tab, choose the service you want to use.',
      },
      {
        label: '4. Enter Your API Key',
        detail: 'Paste your API key in the input field. Keys are encrypted in your browser and never sent to external servers.',
      },
      {
        label: '5. Test Connection',
        detail: 'Press "Test Connection" to verify. On success, the status will show "AI Connected".',
      },
    ],
    providers: [
      { name: 'Anthropic (Claude)', desc: 'Get API key at console.anthropic.com' },
      { name: 'OpenAI (GPT)', desc: 'Get API key at platform.openai.com' },
      { name: 'Google (Gemini)', desc: 'Get API key at aistudio.google.com' },
      { name: 'Groq', desc: 'Get API key at console.groq.com (free tier available)' },
    ],
    notes: [
      'API keys are encrypted with AES-GCM and stored securely in your browser.',
      'AI proofreading only sends OCR text to the API. Images are never transmitted.',
      'Historical characters (旧字体) are preserved by default.',
    ],
    settingsBtn: 'Open Settings',
    closeBtn: 'Close',
  },
}

export function AIConnectHelp({ lang, onClose, onOpenSettings }: AIConnectHelpProps) {
  const c = content[lang] ?? content['en']

  const handleOpenSettings = () => {
    onClose()
    onOpenSettings()
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="help-page-modal ai-connect-help">
        <div className="help-page-header">
          <h2 className="help-page-title">{c.title}</h2>
          <button className="btn-icon help-page-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="help-page-body">
          <p className="ai-help-intro">{c.intro}</p>

          <div className="ai-help-steps">
            {c.steps.map((step, i) => (
              <div key={i} className="ai-help-step">
                <div className="ai-help-step-label">{step.label}</div>
                <div className="ai-help-step-detail">{step.detail}</div>
              </div>
            ))}
          </div>

          <h3 className="help-section-heading">{lang === 'ja' ? '対応AIサービス' : 'Supported AI Services'}</h3>
          <div className="ai-help-providers">
            {c.providers.map((prov, i) => (
              <div key={i} className="ai-help-provider">
                <span className="ai-help-provider-name">{prov.name}</span>
                <span className="ai-help-provider-desc">{prov.desc}</span>
              </div>
            ))}
          </div>

          <h3 className="help-section-heading">{lang === 'ja' ? '補足情報' : 'Notes'}</h3>
          <div className="ai-help-notes">
            {c.notes.map((note, i) => (
              <p key={i} className="ai-help-note">{note}</p>
            ))}
          </div>

          <div className="ai-help-actions">
            <button className="btn btn-primary" onClick={handleOpenSettings}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              {c.settingsBtn}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              {c.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
