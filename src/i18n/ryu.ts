import type { Translations } from './ja'

// Okinawan / ウチナーグチ (Uchinaaguchi)
export const ryu: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'ブラウザんかい走いるニホンゴOCRどーぐ' },
  upload: {
    dropzone: 'ファイルくぅんかいドラッグ＆ドロップしぇー、をぅし押しぇーちゅうせー',
    directoryButton: 'フォルダ選びーん',
    acceptedFormats: '使えーるフォーマット: JPG, PNG, PDF',
    startButton: 'OCR始みーん',
    clearButton: '消しーん',
  },
  progress: {
    initializing: '始まとーいびーん...', loadingLayoutModel: 'レイアウトモデル読みこーとーいびーん... {percent}%',
    loadingRecognitionModel: '文字認識モデル読みこーとーいびーん... {percent}%',
    layoutDetection: '文字ぬ場所探しとーいびーん... {percent}%',
    textRecognition: '文字読みとーいびーん ({current}/{total} 領域)',
    readingOrder: '読む順番処理しとーいびーん...', generatingOutput: '結果作とーいびーん...',
    processing: '処理中: {current}/{total} ファイル', done: 'うわいびたん',
  },
  results: {
    copy: 'コピー', download: 'ダウンロード', downloadAll: '全部ぬテキストダウンロード',
    copied: 'コピーさびたん!', noResult: '結果ねーらん', regions: '{count} 領域',
    processingTime: '処理時間: {time}秒',
  },
  history: {
    title: '処理ぬ歴史', clearCache: 'キャッシュ消しーん', confirmClear: '全部ぬ処理履歴消しーびらに?',
    yes: '消しーん', cancel: 'やんぴー', empty: '処理履歴ねーらん', noText: 'テキストねーらん',
  },
  settings: {
    title: '設定', modelCache: 'モデルキャッシュ', clearModelCache: 'モデルキャッシュ消しーん',
    confirmClearModel: 'ONNXモデル消しーびらに? 次起動する時またダウンロードさびーん.',
    clearDone: '消しーびたん',
  },
  info: {
    privacyNotice: 'くぬアプリやブラウザんかいだけ走いびーん。画像ファイルとOCR結果や外ぬサーバーんかい送やびらん。',
    author: '作やー: 橋本雄太 (国立歴史民俗博物館・国立国会図書館)',
    githubLink: 'GitHubリポジトリ',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'エラーぬ出ちゃびたん', modelLoad: 'モデル読み込み失敗さびたん', ocr: 'OCR処理中にエラーぬ出ちゃびたん',
    fileLoad: 'ファイル読み込み失敗さびたん', clipboardNotSupported: 'クリップボードんかいアクセスならん',
  },
  tooltip: { dragPageReorder: 'ドラッグしぇー並び替え' },
}
