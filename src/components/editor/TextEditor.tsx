import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import type { OCRResult, TextBlock } from '../../types/ocr'
import type { AIConnector } from '../../types/ai'
import type { AIConnectionStatus } from '../../hooks/useAISettings'
import { downloadText, copyToClipboard } from '../../utils/textExport'
import { DiffView } from './DiffView'
import type { Language } from '../../i18n'

interface TextEditorProps {
  result: OCRResult | null
  selectedBlock: TextBlock | null
  selectedPageBlockText: string | null
  lang: Language
  onTextChange?: (text: string) => void
  aiConnector: AIConnector | null
  aiConnectionStatus?: AIConnectionStatus
  imageDataUrl?: string
}

type ProofreadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; originalText: string; correctedText: string }
  | { status: 'error'; message: string }

interface SearchMatch {
  start: number
  end: number
}

interface UndoRedoEntry {
  text: string
  cursorPos?: number
}

export function TextEditor({
  result,
  selectedBlock,
  selectedPageBlockText,
  lang,
  onTextChange,
  aiConnector,
  aiConnectionStatus = 'disconnected',
  imageDataUrl,
}: TextEditorProps) {
  const [editedText, setEditedText] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [includeFileName, setIncludeFileName] = useState(false)
  const [ignoreNewlines, setIgnoreNewlines] = useState(false)
  const [proofreadState, setProofreadState] = useState<ProofreadState>({ status: 'idle' })
  const [fontSize, setFontSize] = useState(14)
  const [showLineNumbers, setShowLineNumbers] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [replaceQuery, setReplaceQuery] = useState('')
  const [isVertical, setIsVertical] = useState(false)
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [undoStack, setUndoStack] = useState<UndoRedoEntry[]>([])
  const [redoStack, setRedoStack] = useState<UndoRedoEntry[]>([])
  const [saved, setSaved] = useState(true)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)

  // editedText が null なら result.fullText を使う
  const displayText = editedText ?? result?.fullText ?? ''

  // Determine if we should show diff view
  const shouldShowDiff = proofreadState.status === 'done'

  // Search matches calculation
  const searchMatches = useMemo<SearchMatch[]>(() => {
    if (!searchQuery || shouldShowDiff) return []
    const query = searchQuery
    const matches: SearchMatch[] = []
    let index = 0
    const text = displayText
    while ((index = text.indexOf(query, index)) !== -1) {
      matches.push({ start: index, end: index + query.length })
      index += 1
    }
    return matches
  }, [searchQuery, displayText, shouldShowDiff])

  // Line numbers
  const lineCount = useMemo(() => {
    return displayText.split('\n').length
  }, [displayText])

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value
      const currentText = displayText

      // Add current text to undo stack before changing
      if (currentText !== newText) {
        setUndoStack([...undoStack, { text: currentText, cursorPos: textareaRef.current?.selectionStart }])
        setRedoStack([])
        setSaved(false)
      }

      setEditedText(newText)
      onTextChange?.(newText)
    },
    [onTextChange, displayText, undoStack],
  )

  // Scroll sync for line numbers
  const handleTextareaScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
      const modifier = isMac ? e.metaKey : e.ctrlKey

      if (modifier && e.key === 'f') {
        e.preventDefault()
        setShowSearchBar(!showSearchBar)
      } else if (modifier && e.key === 's') {
        e.preventDefault()
        handleSave()
      } else if (modifier && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
      } else if ((modifier && e.shiftKey && e.key === 'z') || (modifier && e.shiftKey && e.key === 'Z')) {
        e.preventDefault()
        handleRedo()
      } else if (e.key === 'Escape' && showSearchBar) {
        setShowSearchBar(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showSearchBar, displayText, undoStack, redoStack])

  // result が変わったら編集状態・校正状態をリセット
  const [prevResultId, setPrevResultId] = useState<string | null>(null)
  if (result && result.id !== prevResultId) {
    setPrevResultId(result.id)
    setEditedText(null)
    setProofreadState({ status: 'idle' })
    setUndoStack([])
    setRedoStack([])
    setSaved(true)
  }

  const applyOptions = (text: string) =>
    ignoreNewlines ? text.replace(/\n/g, '') : text

  const handleCopy = async () => {
    const text = applyOptions(displayText)
    try {
      await copyToClipboard(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const handleDownload = () => {
    if (!result) return
    const text = applyOptions(editedText ?? result.fullText)
    downloadText(
      includeFileName ? `=== ${result.fileName} ===\n${text}` : text,
      result.fileName,
    )
  }

  const handleSave = () => {
    if (!result) return
    const text = applyOptions(editedText ?? result.fullText)
    downloadText(
      includeFileName ? `=== ${result.fileName} ===\n${text}` : text,
      result.fileName,
    )
    setSaved(true)
  }

  const handleUndo = () => {
    if (undoStack.length === 0) return
    const newStack = [...undoStack]
    const prevEntry = newStack.pop()!
    if (!prevEntry) return

    setRedoStack([...redoStack, { text: displayText, cursorPos: textareaRef.current?.selectionStart }])
    setUndoStack(newStack)
    setEditedText(prevEntry.text)
    onTextChange?.(prevEntry.text)

    // Restore cursor position
    setTimeout(() => {
      if (textareaRef.current && prevEntry.cursorPos !== undefined) {
        textareaRef.current.selectionStart = prevEntry.cursorPos
        textareaRef.current.selectionEnd = prevEntry.cursorPos
      }
    }, 0)
  }

  const handleRedo = () => {
    if (redoStack.length === 0) return
    const newStack = [...redoStack]
    const nextEntry = newStack.pop()!
    if (!nextEntry) return

    setUndoStack([...undoStack, { text: displayText, cursorPos: textareaRef.current?.selectionStart }])
    setRedoStack(newStack)
    setEditedText(nextEntry.text)
    onTextChange?.(nextEntry.text)

    // Restore cursor position
    setTimeout(() => {
      if (textareaRef.current && nextEntry.cursorPos !== undefined) {
        textareaRef.current.selectionStart = nextEntry.cursorPos
        textareaRef.current.selectionEnd = nextEntry.cursorPos
      }
    }, 0)
  }

  const handleRemoveEmptyLines = () => {
    const newText = displayText
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .join('\n')
    setUndoStack([...undoStack, { text: displayText, cursorPos: textareaRef.current?.selectionStart }])
    setRedoStack([])
    setEditedText(newText)
    onTextChange?.(newText)
    setSaved(false)
  }

  const handleJoinLines = () => {
    const newText = displayText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join(' ')
    setUndoStack([...undoStack, { text: displayText, cursorPos: textareaRef.current?.selectionStart }])
    setRedoStack([])
    setEditedText(newText)
    onTextChange?.(newText)
    setSaved(false)
  }

  // AI校正実行
  const handleProofread = useCallback(async () => {
    if (!aiConnector || !result) return

    // AI未接続（接続テスト未実施）の場合、警告を表示
    if (aiConnectionStatus !== 'connected') {
      const msg = lang === 'ja'
        ? 'AI接続が確認されていません。設定画面で接続テストを実行してください。続行しますか？'
        : 'AI connection has not been verified. Please run a connection test in Settings. Continue anyway?'
      if (!window.confirm(msg)) return
    }

    const textToProofread = editedText ?? result.fullText
    setProofreadState({ status: 'loading' })
    try {
      const proofResult = await aiConnector.proofread(textToProofread, imageDataUrl ?? '')
      setProofreadState({
        status: 'done',
        originalText: textToProofread,
        correctedText: proofResult.correctedText,
      })
    } catch (err) {
      setProofreadState({
        status: 'error',
        message: err instanceof Error ? err.message : String(err),
      })
    }
  }, [aiConnector, aiConnectionStatus, lang, result, editedText, imageDataUrl])

  // 校正結果を全て適用
  const handleAcceptAll = useCallback(() => {
    if (proofreadState.status !== 'done') return
    setEditedText(proofreadState.correctedText)
    onTextChange?.(proofreadState.correctedText)
    setProofreadState({ status: 'idle' })
  }, [proofreadState, onTextChange])

  // 校正結果を全て却下
  const handleRejectAll = useCallback(() => {
    setProofreadState({ status: 'idle' })
  }, [])

  // Search and Replace handlers
  const handlePreviousMatch = useCallback(() => {
    if (searchMatches.length === 0) return
    setCurrentMatchIndex((prev) => (prev - 1 + searchMatches.length) % searchMatches.length)
  }, [searchMatches])

  const handleNextMatch = useCallback(() => {
    if (searchMatches.length === 0) return
    setCurrentMatchIndex((prev) => (prev + 1) % searchMatches.length)
  }, [searchMatches])

  const handleReplace = useCallback(() => {
    if (searchMatches.length === 0 || !textareaRef.current) return
    const match = searchMatches[currentMatchIndex]
    const before = displayText.slice(0, match.start)
    const after = displayText.slice(match.end)
    const newText = before + replaceQuery + after
    setEditedText(newText)
    onTextChange?.(newText)
  }, [searchMatches, currentMatchIndex, displayText, replaceQuery, onTextChange])

  const handleReplaceAll = useCallback(() => {
    if (searchMatches.length === 0) return
    let newText = displayText
    const offset = replaceQuery.length - searchQuery.length
    searchMatches.forEach((match, idx) => {
      const adjustedStart = match.start + offset * idx
      const adjustedEnd = adjustedStart + searchQuery.length
      newText = newText.slice(0, adjustedStart) + replaceQuery + newText.slice(adjustedEnd)
    })
    setEditedText(newText)
    onTextChange?.(newText)
    setCurrentMatchIndex(0)
  }, [searchMatches, displayText, searchQuery, replaceQuery, onTextChange])

  if (!result) {
    return (
      <div className="text-editor empty">
        <p>{lang === 'ja' ? '結果なし' : 'No results'}</p>
      </div>
    )
  }

  return (
    <div className="text-editor">
      {/* ヘッダー: タイトル + ボタン群（AI校正 / Copy / DL） */}
      <div className="text-editor-header">
        <div className="text-editor-header-left">
          <span className="text-editor-label">
            OCR result
            {!saved && <span className="text-editor-unsaved-indicator" title={lang === 'ja' ? '保存されていません' : 'Unsaved changes'} />}
          </span>
          <span className="text-editor-stats">
            {result.textBlocks.length}
            {lang === 'ja' ? ' 領域' : ' regions'}
            {' · '}
            {(result.processingTimeMs / 1000).toFixed(1)}s
          </span>
        </div>
        <div className="text-editor-header-buttons">
          <button
            className="btn btn-icon btn-sm"
            onClick={() => setShowSearchBar(!showSearchBar)}
            title={lang === 'ja' ? '検索と置換 (Ctrl+F)' : 'Find and Replace (Ctrl+F)'}
            aria-label="Search"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4" />
              <path d="m10 10 4 4" />
            </svg>
          </button>
          <button
            className="btn btn-icon btn-sm"
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            title={lang === 'ja' ? '行番号' : 'Line numbers'}
            aria-label="Toggle line numbers"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <text x="2" y="6" fontSize="8" fill="currentColor">1</text>
              <text x="2" y="12" fontSize="8" fill="currentColor">2</text>
            </svg>
          </button>
          <button
            className="btn btn-icon btn-sm"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            title={lang === 'ja' ? '戻す (Ctrl+Z)' : 'Undo (Ctrl+Z)'}
            aria-label="Undo"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8a5 5 0 0 1 5-5h4m-4 0l2 2m-2-2l-2 2" />
            </svg>
          </button>
          <button
            className="btn btn-icon btn-sm"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            title={lang === 'ja' ? 'やり直す (Ctrl+Shift+Z)' : 'Redo (Ctrl+Shift+Z)'}
            aria-label="Redo"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8a5 5 0 0 1-5-5H4m4 0l-2 2m2-2l2 2" />
            </svg>
          </button>
          <button
            className={`btn btn-icon btn-sm${isVertical ? ' btn-icon-active' : ''}`}
            onClick={() => setIsVertical(!isVertical)}
            title={lang === 'ja' ? (isVertical ? '横書きに切替' : '縦書きに切替') : (isVertical ? 'Switch to horizontal' : 'Switch to vertical')}
            aria-label="Toggle vertical text"
            aria-pressed={isVertical}
          >
            {isVertical ? (
              /* Vertical text icon: 縦 */
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="11" y1="2" x2="11" y2="14" />
                <line x1="8" y1="2" x2="8" y2="14" />
                <line x1="5" y1="2" x2="5" y2="14" />
                <polyline points="13 4 11 2 9 4" fill="none" />
              </svg>
            ) : (
              /* Horizontal text icon: 横 */
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="2" y1="5" x2="14" y2="5" />
                <line x1="2" y1="8" x2="14" y2="8" />
                <line x1="2" y1="11" x2="14" y2="11" />
                <polyline points="12 3 14 5 12 7" fill="none" />
              </svg>
            )}
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSave}
            title={lang === 'ja' ? '保存 (Ctrl+S)' : 'Save (Ctrl+S)'}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginRight: '4px', display: 'inline' }}>
              <path d="M2 2v12h12V4l-2-2H2z" />
              <line x1="6" y1="7" x2="10" y2="7" />
              <rect x="5" y="10" width="6" height="3" />
            </svg>
            {lang === 'ja' ? '保存' : 'Save'}
          </button>
          <button
            className="btn btn-ai"
            onClick={handleProofread}
            disabled={!aiConnector || proofreadState.status === 'loading' || result.textBlocks.length === 0}
            title={!aiConnector ? (lang === 'ja' ? '設定でAI接続を構成してください' : 'Configure AI connection in Settings') : ''}
          >
            {proofreadState.status === 'loading'
              ? (lang === 'ja' ? 'AI校正中...' : 'Proofreading...')
              : (lang === 'ja' ? 'AI校正' : 'AI Proofread')}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
            {copied
              ? lang === 'ja' ? 'コピーしました！' : 'Copied!'
              : lang === 'ja' ? 'コピー' : 'Copy'}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleDownload}>
            {lang === 'ja' ? 'ダウンロード' : 'Download'}
          </button>
        </div>
      </div>

      {/* Search & Replace bar */}
      {showSearchBar && (
        <div className="text-editor-search-bar">
          <div className="text-editor-search-controls">
            <input
              type="text"
              className="text-editor-search-input"
              placeholder={lang === 'ja' ? '検索' : 'Find'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentMatchIndex(0)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNextMatch()
                else if (e.key === 'Escape') setShowSearchBar(false)
              }}
            />
            <span className="text-editor-search-count">
              {searchMatches.length > 0 ? `${currentMatchIndex + 1}/${searchMatches.length}` : lang === 'ja' ? 'マッチなし' : 'No match'}
            </span>
            <button
              className="btn btn-sm btn-icon"
              onClick={handlePreviousMatch}
              disabled={searchMatches.length === 0}
              title={lang === 'ja' ? '前へ' : 'Previous'}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12l-4-4 4-4" />
              </svg>
            </button>
            <button
              className="btn btn-sm btn-icon"
              onClick={handleNextMatch}
              disabled={searchMatches.length === 0}
              title={lang === 'ja' ? '次へ' : 'Next'}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>
          <div className="text-editor-replace-controls">
            <input
              type="text"
              className="text-editor-replace-input"
              placeholder={lang === 'ja' ? '置換' : 'Replace'}
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleReplace()
                else if (e.key === 'Escape') setShowSearchBar(false)
              }}
            />
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleReplace}
              disabled={searchMatches.length === 0}
              title={lang === 'ja' ? '1つ置換' : 'Replace'}
            >
              {lang === 'ja' ? '置換' : 'Replace'}
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleReplaceAll}
              disabled={searchMatches.length === 0}
              title={lang === 'ja' ? 'すべて置換' : 'Replace All'}
            >
              {lang === 'ja' ? 'すべて置換' : 'Replace All'}
            </button>
            <button
              className="btn btn-sm btn-icon"
              onClick={() => setShowSearchBar(false)}
              title={lang === 'ja' ? '閉じる' : 'Close'}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* AI校正ステータス表示 */}
      {(proofreadState.status === 'loading' || proofreadState.status === 'error') && (
        <div className="text-editor-ai-status">
          {proofreadState.status === 'loading' && <span className="ai-bar-spinner" />}
          {proofreadState.status === 'error' && (
            <span className="ai-bar-error" title={proofreadState.message}>
              {lang === 'ja' ? '校正エラー' : 'Proofread Error'}
            </span>
          )}
        </div>
      )}

      {/* 選択ブロックの表示 */}
      {selectedPageBlockText != null && (
        <div className="text-editor-selection">
          <div className="text-editor-selection-label">
            {lang === 'ja' ? 'ブロック内のテキスト:' : 'Block text:'}
          </div>
          <div className="text-editor-selection-text">{selectedPageBlockText || '(空)'}</div>
        </div>
      )}
      {selectedBlock && selectedPageBlockText == null && (
        <div className="text-editor-selection">
          <div className="text-editor-selection-label">
            {lang === 'ja' ? '選択領域のテキスト:' : 'Selected region:'}
          </div>
          <div className="text-editor-selection-text">{selectedBlock.text || '(空)'}</div>
        </div>
      )}

      {/* メイン: テキストエリア or 差分表示 */}
      <div className="text-editor-body">
        {result.textBlocks.length === 0 ? (
          <p className="text-editor-empty-text">
            {lang === 'ja' ? 'テキストが検出されませんでした' : 'No text detected'}
          </p>
        ) : shouldShowDiff ? (
          <DiffView
            originalText={proofreadState.originalText}
            correctedText={proofreadState.correctedText}
            onAcceptAll={handleAcceptAll}
            onRejectAll={handleRejectAll}
            onApplySelective={(text) => {
              setEditedText(text)
              onTextChange?.(text)
              setProofreadState({ status: 'idle' })
            }}
            lang={lang}
          />
        ) : (
          <div className={`line-numbers-container ${isVertical ? 'text-editor-vertical' : ''}`}>
            {showLineNumbers && (
              <div className="line-numbers-gutter" ref={gutterRef}>
                {Array.from({ length: lineCount }).map((_, i) => (
                  <span key={i} className="line-number">
                    {i + 1}
                  </span>
                ))}
              </div>
            )}
            <textarea
              ref={textareaRef}
              className="text-editor-textarea"
              value={displayText}
              onChange={handleTextChange}
              onScroll={handleTextareaScroll}
              spellCheck={false}
              style={{
                fontSize: `${fontSize}px`,
                writingMode: isVertical ? 'vertical-rl' : 'horizontal-tb',
                textOrientation: isVertical ? 'mixed' : 'initial',
              }}
            />
          </div>
        )}
      </div>

      {/* フッターオプション */}
      <div className="text-editor-footer">
        <div className="text-editor-options">
          <label className="text-editor-option">
            <input
              type="checkbox"
              checked={includeFileName}
              onChange={(e) => setIncludeFileName(e.target.checked)}
            />
            {lang === 'ja' ? 'ファイル名を記載' : 'Include filename'}
          </label>
          <label className="text-editor-option">
            <input
              type="checkbox"
              checked={ignoreNewlines}
              onChange={(e) => setIgnoreNewlines(e.target.checked)}
            />
            {lang === 'ja' ? '改行を無視' : 'Ignore newlines'}
          </label>
          <button
            className="btn btn-icon btn-sm"
            onClick={handleRemoveEmptyLines}
            title={lang === 'ja' ? '空行を削除' : 'Remove empty lines'}
            aria-label="Remove empty lines"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="4" x2="14" y2="4" />
              <line x1="2" y1="12" x2="14" y2="12" />
            </svg>
          </button>
          <button
            className="btn btn-icon btn-sm"
            onClick={handleJoinLines}
            title={lang === 'ja' ? '改行を削除して結合' : 'Join lines'}
            aria-label="Join lines"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="8" x2="14" y2="8" />
              <polyline points="5 5 2 8 5 11" fill="none" />
              <polyline points="11 5 14 8 11 11" fill="none" />
            </svg>
          </button>
        </div>
        <div className="text-editor-stats-footer">
          <span className="text-editor-stat-item">
            {lang === 'ja' ? '文字数:' : 'Chars:'} {displayText.length}
          </span>
          <span className="text-editor-stat-separator">·</span>
          <span className="text-editor-stat-item">
            {lang === 'ja' ? '行数:' : 'Lines:'} {lineCount}
          </span>
        </div>
        <div className="text-editor-font-controls">
          <label className="text-editor-font-label">
            {lang === 'ja' ? 'フォントサイズ' : 'Font size'}:
          </label>
          <input
            type="range"
            className="text-editor-font-slider"
            min="10"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            title={`${fontSize}px`}
          />
          <span className="text-editor-font-value">{fontSize}px</span>
        </div>
      </div>
    </div>
  )
}
