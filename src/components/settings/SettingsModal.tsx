import { useState } from 'react'
import { clearModels } from '../../utils/db'
import type { AISettings, AIProvider, AIConnectionMode } from '../../types/ai'
import { DEFAULT_MODELS, DEFAULT_AI_SETTINGS } from '../../types/ai'
import type { AIConnectionStatus } from '../../hooks/useAISettings'
import type { Language } from '../../i18n'
import { t } from '../../i18n'

interface SettingsModalProps {
  onClose: () => void
  lang: Language
  aiSettings: AISettings
  onUpdateAISettings: (update: Partial<AISettings>) => void
  onSwitchProvider: (provider: AIProvider) => Promise<void>
  connectionStatus: AIConnectionStatus
  onTestConnection: () => Promise<boolean>
}

const PROVIDER_LABELS: Record<AIProvider, string> = {
  anthropic: 'Anthropic (Claude)',
  openai: 'OpenAI (GPT)',
  google: 'Google (Gemini)',
  groq: 'Groq',
  custom: 'Custom Endpoint',
}

export function SettingsModal({
  onClose,
  lang,
  aiSettings,
  onUpdateAISettings,
  onSwitchProvider,
  connectionStatus,
  onTestConnection,
}: SettingsModalProps) {
  const [clearing, setClearing] = useState(false)
  const [cleared, setCleared] = useState(false)
  const [activeTab, setActiveTab] = useState<'ai' | 'cache'>('ai')
  const [testResult, setTestResult] = useState<'success' | 'fail' | null>(null)

  const handleClearModels = async () => {
    if (!window.confirm(t(lang, 'settingsModal.confirmClearModels'))) return

    setClearing(true)
    try {
      await clearModels()
      setCleared(true)
      setTimeout(() => setCleared(false), 2000)
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setClearing(false)
    }
  }

  const handleTestConnection = async () => {
    setTestResult(null)
    const ok = await onTestConnection()
    setTestResult(ok ? 'success' : 'fail')
    setTimeout(() => setTestResult(null), 3000)
  }

  const handleModeChange = (mode: AIConnectionMode) => {
    onUpdateAISettings({ mode })
  }

  const handleProviderChange = async (provider: AIProvider) => {
    await onSwitchProvider(provider)
    // デフォルトモデルを設定
    const models = DEFAULT_MODELS[provider]
    if (models.length > 0) {
      onUpdateAISettings({ directApi: { ...aiSettings.directApi, provider, model: models[0] } })
    }
  }

  const statusLabel = (() => {
    switch (connectionStatus) {
      case 'connected': return t(lang, 'settingsModal.connected')
      case 'connecting': return t(lang, 'settingsModal.connecting')
      case 'error': return t(lang, 'settingsModal.connectionError')
      default: return t(lang, 'settingsModal.disconnected')
    }
  })()

  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h2>{t(lang, 'settingsModal.title')}</h2>
          <button className="btn-close" onClick={onClose} title={t(lang, 'settingsModal.close')}>✕</button>
        </div>

        {/* タブ */}
        <div className="settings-tabs">
          <button
            className={`settings-tab ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            {t(lang, 'settingsModal.aiConnection')}
          </button>
          <button
            className={`settings-tab ${activeTab === 'cache' ? 'active' : ''}`}
            onClick={() => setActiveTab('cache')}
          >
            {t(lang, 'settingsModal.cache')}
          </button>
        </div>

        <div className="panel-body">
          {/* ===== AI接続タブ ===== */}
          {activeTab === 'ai' && (
            <>
              {/* 接続モード切替 */}
              <section className="settings-section">
                <h3>{t(lang, 'settingsModal.connectionMode')}</h3>
                <div className="settings-mode-toggle">
                  <button
                    className={`btn ${aiSettings.mode === 'direct' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleModeChange('direct')}
                  >
                    {t(lang, 'settingsModal.directApi')}
                  </button>
                  <button
                    className={`btn ${aiSettings.mode === 'mcp' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleModeChange('mcp')}
                  >
                    {t(lang, 'settingsModal.mcpServer')}
                  </button>
                </div>
              </section>

              {/* Direct API設定 */}
              {aiSettings.mode === 'direct' && (
                <section className="settings-section">
                  <h3>{t(lang, 'settingsModal.provider')}</h3>
                  <select
                    className="settings-select"
                    value={aiSettings.directApi.provider}
                    onChange={(e) => handleProviderChange(e.target.value as AIProvider)}
                  >
                    {(Object.keys(PROVIDER_LABELS) as AIProvider[]).map((p) => (
                      <option key={p} value={p}>{PROVIDER_LABELS[p]}</option>
                    ))}
                  </select>

                  {/* APIキー */}
                  <h3>{t(lang, 'settingsModal.apiKey')}</h3>
                  <input
                    type="password"
                    className="settings-input"
                    value={aiSettings.directApi.apiKey}
                    onChange={(e) => onUpdateAISettings({
                      directApi: { ...aiSettings.directApi, apiKey: e.target.value },
                    })}
                    placeholder={t(lang, 'settingsModal.enterApiKey')}
                  />
                  <p className="settings-description">
                    {t(lang, 'settingsModal.apiKeyDescription')}
                  </p>

                  {/* モデル選択 */}
                  <h3>{t(lang, 'settingsModal.model')}</h3>
                  {DEFAULT_MODELS[aiSettings.directApi.provider].length > 0 ? (
                    <select
                      className="settings-select"
                      value={aiSettings.directApi.model}
                      onChange={(e) => onUpdateAISettings({
                        directApi: { ...aiSettings.directApi, model: e.target.value },
                      })}
                    >
                      <option value="">{t(lang, 'settingsModal.selectModel')}</option>
                      {DEFAULT_MODELS[aiSettings.directApi.provider].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="settings-input"
                      value={aiSettings.directApi.model}
                      onChange={(e) => onUpdateAISettings({
                        directApi: { ...aiSettings.directApi, model: e.target.value },
                      })}
                      placeholder={t(lang, 'settingsModal.enterModelName')}
                    />
                  )}

                  {/* カスタムエンドポイント */}
                  {aiSettings.directApi.provider === 'custom' && (
                    <>
                      <h3>{t(lang, 'settingsModal.endpointUrl')}</h3>
                      <input
                        type="url"
                        className="settings-input"
                        value={aiSettings.directApi.endpoint ?? ''}
                        onChange={(e) => onUpdateAISettings({
                          directApi: { ...aiSettings.directApi, endpoint: e.target.value },
                        })}
                        placeholder="https://..."
                      />
                    </>
                  )}
                </section>
              )}

              {/* MCP Server設定 */}
              {aiSettings.mode === 'mcp' && (
                <section className="settings-section">
                  <h3>{t(lang, 'settingsModal.mcpServerUrl')}</h3>
                  <input
                    type="url"
                    className="settings-input"
                    value={aiSettings.mcp.serverUrl}
                    onChange={(e) => onUpdateAISettings({
                      mcp: { ...aiSettings.mcp, serverUrl: e.target.value },
                    })}
                    placeholder="http://localhost:3000/mcp"
                  />
                  <p className="settings-description">
                    {t(lang, 'settingsModal.mcpDescription')}
                  </p>

                  <h3>{t(lang, 'settingsModal.toolName')}</h3>
                  <input
                    type="text"
                    className="settings-input"
                    value={aiSettings.mcp.toolName ?? ''}
                    onChange={(e) => onUpdateAISettings({
                      mcp: { ...aiSettings.mcp, toolName: e.target.value || undefined },
                    })}
                    placeholder={t(lang, 'settingsModal.autoDetect')}
                  />
                </section>
              )}

              {/* 校正プロンプト */}
              <section className="settings-section">
                <h3>{t(lang, 'settingsModal.proofreadingPrompt')}</h3>
                <textarea
                  className="settings-textarea"
                  value={aiSettings.customPrompt}
                  onChange={(e) => onUpdateAISettings({ customPrompt: e.target.value })}
                  rows={6}
                />
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => onUpdateAISettings({ customPrompt: DEFAULT_AI_SETTINGS.customPrompt })}
                >
                  {t(lang, 'settingsModal.resetDefault')}
                </button>
              </section>

              {/* 接続テスト */}
              <section className="settings-section">
                <div className="settings-connection-row">
                  <button
                    className="btn btn-primary"
                    onClick={handleTestConnection}
                    disabled={connectionStatus === 'connecting'}
                  >
                    {connectionStatus === 'connecting'
                      ? t(lang, 'settingsModal.testing')
                      : t(lang, 'settingsModal.testConnection')}
                  </button>
                  <span className={`settings-connection-status status-${connectionStatus}`}>
                    {statusLabel}
                  </span>
                  {testResult === 'success' && (
                    <span className="settings-test-ok">
                      {t(lang, 'settingsModal.success')}
                    </span>
                  )}
                  {testResult === 'fail' && (
                    <span className="settings-test-fail">
                      {t(lang, 'settingsModal.failed')}
                    </span>
                  )}
                </div>
              </section>
            </>
          )}

          {/* ===== キャッシュタブ ===== */}
          {activeTab === 'cache' && (
            <section className="settings-section">
              <h3>{t(lang, 'settingsModal.modelCache')}</h3>
              <p className="settings-description">
                {t(lang, 'settingsModal.modelCacheDescription')}
              </p>
              <button
                className="btn btn-secondary"
                onClick={handleClearModels}
                disabled={clearing}
              >
                {cleared
                  ? '✓ ' + t(lang, 'settingsModal.cleared')
                  : clearing
                    ? t(lang, 'settingsModal.clearing')
                    : t(lang, 'settingsModal.clearModelCache')}
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
