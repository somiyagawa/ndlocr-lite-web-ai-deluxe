import { useState } from 'react'
import { clearModels } from '../../utils/db'
import type { AISettings, AIProvider, AIConnectionMode } from '../../types/ai'
import { DEFAULT_MODELS, DEFAULT_AI_SETTINGS } from '../../types/ai'
import type { AIConnectionStatus } from '../../hooks/useAISettings'
import type { Language } from '../../i18n'
import { L } from '../../i18n'

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
    if (!window.confirm(
      L(lang, {
        ja: 'キャッシュされたONNXモデルを削除しますか？次回起動時に再ダウンロードが必要です。',
        en: 'Delete cached ONNX models? They will be re-downloaded on next startup.',
        'zh-CN': '缓存的ONNX模型将被删除。下次启动时需要重新下载。是否继续？',
        'zh-TW': '快取的ONNX模型將被刪除。下次啟動時需要重新下載。是否繼續？',
        ko: '캐시된 ONNX 모델이 삭제됩니다. 다음 시작 시 다시 다운로드됩니다. 계속하시겠습니까?',
        la: 'Exemplaria ONNX in memoria delenda sunt. Visne procedere?',
        eo: 'Kaŝmemoritaj ONNX-modeloj estos forigitaj. Ĉu daŭrigi?',
        ru: 'Удалить кэшированные ONNX модели? Они будут повторно загружены при следующем запуске.',
        el: 'Διaγραφή κэш ONNX μοντέλων; Θα λαμβάνονται ξανά επί της επόμενης εκκίνησης.',
        syc: 'ܫܘܦ ܡܘܕܝܕܐ ONNX ܡܛܫܝܬܐ? ܬܬܐܚܬ ܡܕܘܓܡܐ ܚܪܬܐ.',
      })
    )) return

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
      case 'connected': return L(lang, { ja: '接続済み', en: 'Connected', 'zh-CN': '已连接', 'zh-TW': '已連接', ko: '연결됨', la: 'Connexum', eo: 'Konektita', ru: 'Подключено', el: 'Συνδεδεμένο', syc: 'ܐܬܩܠܠ' })
      case 'connecting': return L(lang, { ja: '接続中...', en: 'Connecting...', 'zh-CN': '连接中...', 'zh-TW': '連接中...', ko: '연결 중...', la: 'Connexio...', eo: 'Konektanta...', ru: 'Подключение...', el: 'Σύνδεση...', syc: 'ܡܩܠܠܢܐ...' })
      case 'error': return L(lang, { ja: '接続エラー', en: 'Connection Error', 'zh-CN': '连接错误', 'zh-TW': '連接錯誤', ko: '연결 오류', la: 'Error connexionis', eo: 'Konekta eraro', ru: 'Ошибка подключения', el: 'Σφάλμα σύνδεσης', syc: 'ܠܚܠܚܐ ܒܩܠܘܠܐ' })
      default: return L(lang, { ja: '未接続', en: 'Disconnected', 'zh-CN': '未连接', 'zh-TW': '未連接', ko: '미연결', la: 'Non connexum', eo: 'Malkonektita', ru: 'Отключено', el: 'Αποσυνδεδεμένο', syc: 'ܠܐ ܡܩܠܠ' })
    }
  })()

  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h2>{L(lang, { ja: '設定', en: 'Settings', 'zh-CN': '设置', 'zh-TW': '設定', ko: '설정', la: 'Optiones', eo: 'Agordoj', ru: 'Настройки', el: 'Ρυθμίσεις', syc: 'ܛ̈ܘ̈ܟ̈ܣ̈ܐ' })}</h2>
          <button className="btn-close" onClick={onClose} title={L(lang, { ja: '閉じる', en: 'Close', 'zh-CN': '关闭', 'zh-TW': '關閉', ko: '닫기', la: 'Claudere', eo: 'Fermi', ru: 'Закрыть', el: 'Κλείσιμο', syc: 'ܐ̈ܚ̈ܘ̈ܕ' })}>✕</button>
        </div>

        {/* タブ */}
        <div className="settings-tabs">
          <button
            className={`settings-tab ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            {L(lang, { ja: 'AI接続', en: 'AI Connection', 'zh-CN': 'AI连接', 'zh-TW': 'AI連接', ko: 'AI 연결', la: 'Connexio AI', eo: 'AI-konekto', ru: 'AI подключение', el: 'Σύνδεση AI', syc: 'ܩܠܘܠ AI' })}
          </button>
          <button
            className={`settings-tab ${activeTab === 'cache' ? 'active' : ''}`}
            onClick={() => setActiveTab('cache')}
          >
            {L(lang, { ja: 'キャッシュ', en: 'Cache', 'zh-CN': '缓存', 'zh-TW': '快取', ko: '캐시', la: 'Memoria', eo: 'Kaŝmemoro', ru: 'Кэш', el: 'Κρυφή μνήμη', syc: 'ܡ̈ܛ̈ܫ̈ܝ̈ܬ' })}
          </button>
        </div>

        <div className="panel-body">
          {/* ===== AI接続タブ ===== */}
          {activeTab === 'ai' && (
            <>
              {/* 接続モード切替 */}
              <section className="settings-section">
                <h3>{L(lang, { ja: '接続モード', en: 'Connection Mode', 'zh-CN': '连接模式', 'zh-TW': '連接模式', ko: '연결 모드', la: 'Modus connexionis', eo: 'Konektoreĝimo', ru: 'Режим подключения', el: 'Λειτουργία σύνδεσης', syc: 'ܓܘܢܒܐ ܕܩܠܘܠܐ' })}</h3>
                <div className="settings-mode-toggle">
                  <button
                    className={`btn ${aiSettings.mode === 'direct' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleModeChange('direct')}
                  >
                    Direct API
                  </button>
                  <button
                    className={`btn ${aiSettings.mode === 'mcp' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleModeChange('mcp')}
                  >
                    MCP Server
                  </button>
                </div>
              </section>

              {/* Direct API設定 */}
              {aiSettings.mode === 'direct' && (
                <section className="settings-section">
                  <h3>{L(lang, { ja: 'プロバイダ', en: 'Provider', 'zh-CN': '服务提供商', 'zh-TW': '服務提供商', ko: '제공자', la: 'Provisor', eo: 'Provizanto', ru: 'Провайдер', el: 'Πάροχος', syc: 'ܡܘܠܠܐ' })}</h3>
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
                  <h3>{L(lang, { ja: 'APIキー', en: 'API Key', 'zh-CN': 'API密钥', 'zh-TW': 'API金鑰', ko: 'API 키', la: 'Clavis API', eo: 'API-ŝlosilo', ru: 'API ключ', el: 'Κλειδί API', syc: 'ܡܠܐ API' })}</h3>
                  <input
                    type="password"
                    className="settings-input"
                    value={aiSettings.directApi.apiKey}
                    onChange={(e) => onUpdateAISettings({
                      directApi: { ...aiSettings.directApi, apiKey: e.target.value },
                    })}
                    placeholder={L(lang, { ja: 'APIキーを入力', en: 'Enter API key', 'zh-CN': '输入 API 密钥', 'zh-TW': '輸入 API 金鑰', ko: 'API 키 입력', la: 'Clavis API inde', eo: 'Enmetu API-ŝlosilon', ru: 'Введите ключ API', el: 'Εισάγετε κλειδί API', syc: 'ܐܥܝܠ ܡܠܐ API' })}
                  />
                  <p className="settings-description">
                    {L(lang, {
                      ja: 'APIキーはブラウザ内で暗号化して保存されます。サーバーには送信されません。',
                      en: 'API keys are encrypted and stored locally. They are never sent to our servers.',
                      'zh-CN': 'API密钥在浏览器内加密保存，不会发送到服务器。',
                      'zh-TW': 'API金鑰在瀏覽器內加密保存，不會發送到伺服器。',
                      ko: 'API 키는 브라우저에서 암호화되어 저장되며, 서버로 전송되지 않습니다.',
                      la: 'Claves API in navigatre encryptantur. Nunquam mittuntur.',
                      eo: 'API-ŝlosiloj estas ĉifritaj kaj konservitaj loke. Neniam sendas al serviloj.',
                      ru: 'Ключи API зашифрованы и сохранены локально. Они никогда не отправляются на серверы.',
                      el: 'Τα κλειδιά API κρυπτογραφούνται και αποθηκεύονται τοπικά. Δεν αποστέλλονται ποτέ.',
                      syc: 'ܡܠܐ API ܡܓܢܒܢܐ ܘܡܛܨܢܐ ܠܘܩܕܡܝܐ. ܠܐ ܫܕܪܢ ܠܡܠܦܢܐ.',
                    })}
                  </p>

                  {/* モデル選択 */}
                  <h3>{L(lang, { ja: 'モデル', en: 'Model', 'zh-CN': '模型', 'zh-TW': '模型', ko: '모델', la: 'Exemplar', eo: 'Modelo', ru: 'Модель', el: 'Μοντέλο', syc: 'ܡܕܝܪܬܐ' })}</h3>
                  {DEFAULT_MODELS[aiSettings.directApi.provider].length > 0 ? (
                    <select
                      className="settings-select"
                      value={aiSettings.directApi.model}
                      onChange={(e) => onUpdateAISettings({
                        directApi: { ...aiSettings.directApi, model: e.target.value },
                      })}
                    >
                      <option value="">{L(lang, { ja: 'モデルを選択', en: 'Select model', 'zh-CN': '选择模型', 'zh-TW': '選擇模型', ko: '모델 선택', la: 'Exemplar elige', eo: 'Elektu modelon', ru: 'Выбрать модель', el: 'Επιλέξτε μοντέλο', syc: 'ܓܒܝ ܡܕܝܪܬܐ' })}</option>
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
                      placeholder={L(lang, { ja: 'モデル名を入力', en: 'Enter model name', 'zh-CN': '输入模型名称', 'zh-TW': '輸入模型名稱', ko: '모델 이름 입력', la: 'Exemplaris nomen inde', eo: 'Enmetu modelo-nomon', ru: 'Введите имя модели', el: 'Εισάγετε όνομα μοντέλου', syc: 'ܐܥܝܠ ܫܡ ܡܕܝܪܬܐ' })}
                    />
                  )}

                  {/* カスタムエンドポイント */}
                  {aiSettings.directApi.provider === 'custom' && (
                    <>
                      <h3>{L(lang, { ja: 'エンドポイントURL', en: 'Endpoint URL', 'zh-CN': '端点URL', 'zh-TW': '端點URL', ko: '끝점 URL', la: 'URL extremum', eo: 'Pinto-URL', ru: 'URL конечной точки', el: 'URL τελικού σημείου', syc: 'URL ܫܘܠܡܐ' })}</h3>
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
                  <h3>{L(lang, { ja: 'MCPサーバーURL', en: 'MCP Server URL', 'zh-CN': 'MCP服务器URL', 'zh-TW': 'MCP伺服器URL', ko: 'MCP 서버 URL', la: 'URL Servidor MCP', eo: 'URL de Servilo MCP', ru: 'URL MCP сервера', el: 'URL διακομιστή MCP', syc: 'URL ܡܠܦܢܐ MCP' })}</h3>
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
                    {L(lang, {
                      ja: 'MCPプロトコル対応のサーバーURLを指定してください。Streamable HTTP Transportを使用します。',
                      en: 'Specify the URL of your MCP-compatible server. Uses Streamable HTTP Transport.',
                      'zh-CN': '指定MCP兼容服务器的URL。使用Streamable HTTP Transport。',
                      'zh-TW': '指定MCP相容伺服器的URL。使用Streamable HTTP Transport。',
                      ko: 'MCP 호환 서버의 URL을 지정하세요. Streamable HTTP Transport를 사용합니다.',
                      la: 'URL serveri MCP-compatibilis specifica. Utitur Transport HTTP Fluxibili.',
                      eo: 'Specifu la URL de via MCP-konforma servilo. Uzas Fluan HTTP-Transporton.',
                      ru: 'Укажите URL MCP-совместимого сервера. Использует Streamable HTTP Transport.',
                      el: 'Προσδιορίστε το URL του MCP-συμβατού διακομιστή. Χρησιμοποιεί Streamable HTTP Transport.',
                      syc: 'ܐܦܢܪ URL ܕܡܠܦܢܐ MCP-compatible. ܥܡܪ Streamable HTTP Transport.',
                    })}
                  </p>

                  <h3>{L(lang, { ja: 'ツール名（任意）', en: 'Tool Name (optional)', 'zh-CN': '工具名（可选）', 'zh-TW': '工具名（可選）', ko: '도구 이름 (선택사항)', la: 'Nomen Instrumenti (optionale)', eo: 'Nomo de Ilo (nedeviga)', ru: 'Имя инструмента (опционально)', el: 'Όνομα εργαλείου (προαιρετικό)', syc: 'ܫܡ ܡܐܡܪܐ (ܠܐ ܐܘܟܝܬܐ)' })}</h3>
                  <input
                    type="text"
                    className="settings-input"
                    value={aiSettings.mcp.toolName ?? ''}
                    onChange={(e) => onUpdateAISettings({
                      mcp: { ...aiSettings.mcp, toolName: e.target.value || undefined },
                    })}
                    placeholder={L(lang, { ja: '空欄で自動検出', en: 'Leave empty for auto-detection', 'zh-CN': '留空自动检测', 'zh-TW': '留空自動偵測', ko: '자동 감지하려면 비워두세요', la: 'Relinqua vacuum ad detectionem automata', eo: 'Lasu malplena por aŭtomata detekto', ru: 'Оставить пусто для автоопределения', el: 'Αφήστε κενό για αυτόματη ανίχνευση', syc: 'ܫܪܪ ܣܕܪ ܠܓܢܒܐ ܡܬܪܕܦܐ' })}
                  />
                </section>
              )}

              {/* 校正プロンプト */}
              <section className="settings-section">
                <h3>{L(lang, { ja: '校正プロンプト', en: 'Proofreading Prompt', 'zh-CN': '校对提示', 'zh-TW': '校對提示', ko: '교정 프롬프트', la: 'Monitio correctionis', eo: 'Ĝusta-legado-invito', ru: 'Подсказка корректуры', el: 'Υπόδειξη διόρθωσης', syc: 'ܡܠܟܢܐ ܕܬܘܪܨܐ' })}</h3>
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
                  {L(lang, { ja: 'デフォルトに戻す', en: 'Reset to Default', 'zh-CN': '恢复默认', 'zh-TW': '恢復預設', ko: '기본값으로 복원', la: 'Ad praefinitum restituere', eo: 'Restarigi defaŭlton', ru: 'Восстановить значение по умолчанию', el: 'Επαναφορά στο προεπιλεγμένο', syc: 'ܐܦܢܪ ܠܦܪܛܦܐ' })}
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
                      ? L(lang, { ja: 'テスト中...', en: 'Testing...', 'zh-CN': '测试中...', 'zh-TW': '測試中...', ko: '테스트 중...', la: 'Probans...', eo: 'Testas...', ru: 'Тестирование...', el: 'Δοκιμή...', syc: 'ܒܘܚܐ...' })
                      : L(lang, { ja: '接続テスト', en: 'Test Connection', 'zh-CN': '测试连接', 'zh-TW': '測試連接', ko: '연결 테스트', la: 'Connexionem probare', eo: 'Testi konekton', ru: 'Тест подключения', el: 'Δοκιμή σύνδεσης', syc: 'ܒܘܚܐ ܕܩܠܘܠܐ' })}
                  </button>
                  <span className={`settings-connection-status status-${connectionStatus}`}>
                    {statusLabel}
                  </span>
                  {testResult === 'success' && (
                    <span className="settings-test-ok">
                      {L(lang, { ja: '成功', en: 'Success', 'zh-CN': '成功', 'zh-TW': '成功', ko: '성공', la: 'Successus', eo: 'Sukceso', ru: 'Успешно', el: 'Επιτυχία', syc: 'ܥܠܡܐ' })}
                    </span>
                  )}
                  {testResult === 'fail' && (
                    <span className="settings-test-fail">
                      {L(lang, { ja: '失敗', en: 'Failed', 'zh-CN': '失败', 'zh-TW': '失敗', ko: '실패', la: 'Defectio', eo: 'Malsukceso', ru: 'Ошибка', el: 'Αποτυχία', syc: 'ܠܐ ܥܠܡܐ' })}
                    </span>
                  )}
                </div>
              </section>
            </>
          )}

          {/* ===== キャッシュタブ ===== */}
          {activeTab === 'cache' && (
            <section className="settings-section">
              <h3>{L(lang, { ja: 'モデルキャッシュ', en: 'Model Cache', 'zh-CN': '模型缓存', 'zh-TW': '模型快取', ko: '모델 캐시', la: 'Memoria exemplarium', eo: 'Modelkaŝmemoro', ru: 'Кэш модели', el: 'Κρυφή μνήμη μοντέλου', syc: 'ܡ̈ܛ̈ܫ̈ܝ̈ܬ ܡܕܝܪܬܐ' })}</h3>
              <p className="settings-description">
                {L(lang, {
                  ja: 'ダウンロード済みのONNXモデルはIndexedDBにキャッシュされています。キャッシュをクリアすると次回起動時に再ダウンロードが必要です。',
                  en: 'Downloaded ONNX models are cached in IndexedDB. Clearing the cache requires re-downloading on next startup.',
                  'zh-CN': '已下载的ONNX模型缓存在IndexedDB中。清除缓存后下次启动时需要重新下载。',
                  'zh-TW': '已下載的ONNX模型快取在IndexedDB中。清除快取後下次啟動時需要重新下載。',
                  ko: '다운로드된 ONNX 모델이 IndexedDB에 캐시됩니다. 캐시를 지우면 다음 시작 시 다시 다운로드해야 합니다.',
                  la: 'Exemplaria ONNX in memoria IndexedDB servantur. Si memoria purgatur, iterum accedere necesse est.',
                  eo: 'Elŝutitaj ONNX-modeloj estas kaŝmemoritaj en IndexedDB. Se forviŝas la kaŝmemoron, devi relŝuti poste.',
                  ru: 'Загруженные ONNX модели кэшируются в IndexedDB. При очистке кэша требуется повторная загрузка при следующем запуске.',
                  el: 'Τα λήψη ONNX μοντέλα αποθηκεύονται στο IndexedDB. Η εκκαθάριση κρυφής μνήμης απαιτεί ξανά λήψη.',
                  syc: 'ܡܕܝܪ̈ܬ ONNX ܐܚܬܝ̈ܬ ܡ̈ܛ̈ܫ̈ܝ̈ܬ ܒIndexedDB. ܡܢ̈ܩ̈ܐ ܕܡ̈ܛ̈ܫ̈ܝ̈ܬ ܩܪܐ ܠܦܠܓ ܚܪܬܐ.',
                })}
              </p>
              <button
                className="btn btn-secondary"
                onClick={handleClearModels}
                disabled={clearing}
              >
                {cleared
                  ? L(lang, { ja: '✓ クリア完了', en: '✓ Cleared', 'zh-CN': '✓ 已清除', 'zh-TW': '✓ 已清除', ko: '✓ 삭제됨', la: '✓ Purgatum', eo: '✓ Forviŝita', ru: '✓ Очищено', el: '✓ Εκκαθαρίστηκε', syc: '✓ ܡܢܩܐ' })
                  : clearing
                    ? L(lang, { ja: 'クリア中...', en: 'Clearing...', 'zh-CN': '清除中...', 'zh-TW': '清除中...', ko: '삭제 중...', la: 'Purgans...', eo: 'Forviŝas...', ru: 'Очистка...', el: 'Εκκαθάριση...', syc: 'ܡܢܩܐ...' })
                    : L(lang, { ja: 'モデルキャッシュをクリア', en: 'Clear Model Cache', 'zh-CN': '清除模型缓存', 'zh-TW': '清除模型快取', ko: '모델 캐시 삭제', la: 'Memoriam purgare', eo: 'Forviŝi modelkaŝmemoron', ru: 'Очистить кэш моделей', el: 'Εκκαθάριση κρυφής μνήμης μοντέλου', syc: 'ܡܢܩ ܡ̈ܛ̈ܫ̈ܝ̈ܬ ܡܕܝܪܬܐ' })}
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
