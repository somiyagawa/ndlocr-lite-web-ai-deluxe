import type { Translations } from './ja'

// Ainu (アイヌ イタㇰ / Aynu itak)
export const ain: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'ブラウザ タ アン シサㇺ モシㇼ ウタラ ヌイェ イコローキ' },
  upload: {
    dropzone: 'ファイル オラ エオリパㇰ、ノ エクリㇰ カ エピリカ',
    directoryButton: 'フォルダ エピリカ',
    acceptedFormats: 'エイワンケ フォーマット: JPG, PNG, PDF',
    startButton: 'OCR ホㇱキ',
    clearButton: 'オサンニㇱパ',
  },
  progress: {
    initializing: 'ホㇱキ アン ルウェ ネ...', loadingLayoutModel: 'レイアウト モデル エヨコ アン... {percent}%',
    loadingRecognitionModel: 'ヌイェ モデル エヨコ アン... {percent}%',
    layoutDetection: 'ヌイェ キ タ ウパㇱ アン... {percent}%',
    textRecognition: 'ヌイェ エイカラカラ アン ({current}/{total} キ)',
    readingOrder: 'ヌカラ アン ルウェ ネ...', generatingOutput: 'チキリ アン ルウェ ネ...',
    processing: 'キ アン: {current}/{total} ファイル', done: 'オケレ',
  },
  results: {
    copy: 'ヌイェ', download: 'エヨコ', downloadAll: 'オㇿ ヌイェ エヨコ',
    copied: 'ヌイェ オケレ!', noResult: 'ソモ ネ ウタラ', regions: '{count} キ',
    processingTime: 'キ ウサ: {time}ビョウ',
  },
  history: {
    title: 'ウエペケレ', clearCache: 'キャッシュ オサンニㇱパ', confirmClear: 'オㇿ ウエペケレ オサンニㇱパ ヤ?',
    yes: 'オサンニㇱパ', cancel: 'ソモ キ', empty: 'ウエペケレ イサㇺ', noText: 'ヌイェ イサㇺ',
  },
  settings: {
    title: 'ウコイキ', modelCache: 'モデル キャッシュ', clearModelCache: 'モデル キャッシュ オサンニㇱパ',
    confirmClearModel: 'ONNX モデル オサンニㇱパ ヤ? シネ ホㇱキ アン ワ エヨコ ルウェ ネ.',
    clearDone: 'オサンニㇱパ オケレ',
  },
  info: {
    privacyNotice: 'タン アプリ オㇿ ブラウザ タ シノッ キ. ファイル エン OCR ウタラ ソモ サーバー オㇿ アㇻキ.',
    author: 'キ ウタラ: Yuta Hashimoto (レキハク / コッカイトショカン)',
    githubLink: 'GitHub ウシ',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'ウェン ピㇼカ ネ', modelLoad: 'モデル エヨコ エアㇻキンネ', ocr: 'OCR キ ウェン ピㇼカ ネ',
    fileLoad: 'ファイル エヨコ エアㇻキンネ', clipboardNotSupported: 'クリップボード エトコオㇷ゚キ エアㇻキンネ',
  },
  tooltip: { dragPageReorder: 'ドラッグ シテ ナラビカエ' },
}
