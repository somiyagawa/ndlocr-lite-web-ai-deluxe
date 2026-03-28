import type { Translations } from './ja'

// Hittite — Unicode Cuneiform (U+12000–U+1236E)
// Uses Hittite cuneiform sign values
export const hit: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: '𒅀𒉺𒀀𒉌𒇷 OCR 𒄀𒅖𒌅𒆪𒌌𒋾 𒀀𒈾𒁕 𒉿𒂊𒁍𒁀𒊮𒅆' },
  upload: {
    dropzone: '𒉿𒀀𒅈𒉺𒅖𒅗𒀀𒈾𒍝𒅁 𒉺𒅀𒇷𒀀 𒆪𒂊𒁕𒉌, 𒈾𒁀𒁕𒊮𒈠𒊮 𒀸𒇷𒅁𒆠𒅁𒀀𒈾𒍝𒅁',
    directoryButton: '𒇷𒂊𒀀𒅁 𒈠𒀊𒉺𒀀𒈾',
    acceptedFormats: '𒀀𒉺𒉺𒀀𒈾𒁕 𒅀𒀀𒈾𒁀𒀀𒊺: JPG, PNG, PDF',
    startButton: '𒅀𒀀 OCR',
    clearButton: '𒀀𒅈𒄩 𒁕𒀀𒅁',
  },
  progress: {
    initializing: '𒁺𒄀𒈾𒈾𒈾𒈾...', loadingLayoutModel: '𒄴𒌑𒉿𒀀𒈾𒍝𒅁 𒈠𒅁𒋾𒇷... {percent}%',
    loadingRecognitionModel: '𒄴𒌑𒉿𒀀𒈾𒍝𒅁 𒊮𒀀𒀸𒆠𒅀𒀀 𒈠𒅁𒋾𒇷... {percent}%',
    layoutDetection: '𒊮𒀀𒀸𒆠𒅀𒀀𒈾𒍝𒅁 𒌑𒁕𒁕𒀀𒉌𒅀𒀀𒊮 𒆠𒂊𒁀𒋾... {percent}%',
    textRecognition: '𒊮𒀀𒀸𒆠𒅀𒀀𒈾𒍝𒅁 𒌑𒁕𒁕𒀀𒉌𒅀𒀀 ({current}/{total} 𒆠𒂊𒁀𒋾)',
    readingOrder: '𒄩𒀀𒈾𒋾𒅀𒀀𒈾𒍝𒅁 𒅁𒅖𒁀𒁕𒈠𒀀𒊮...', generatingOutput: '𒅀𒀀𒍝𒅁 𒌑𒁀𒁕𒀀𒅈...',
    processing: '𒅀𒀀𒍝𒅁: {current}/{total} 𒉺𒅀𒇷𒀀', done: '𒂊𒊮𒁀𒀀',
  },
  results: {
    copy: '𒂊𒊪𒍝𒅁', download: '𒅗𒁀𒁕𒀀 𒄴𒌑𒉿𒀀𒈾𒍝𒅁', downloadAll: '𒄴𒌑𒈠𒀀𒈾𒁀𒂊𒊮 𒌑𒁕𒁕𒀀𒉌𒅀𒀀',
    copied: '𒂊𒊪!', noResult: '𒈾𒁀𒁕𒀀 𒌑𒁀𒁕𒀀𒅈', regions: '{count} 𒆠𒂊𒁀𒋾',
    processingTime: '𒈨𒂊𒄴𒌑𒅈: {time}𒊮',
  },
  history: {
    title: '𒀀𒈾𒉌𒅀𒀀𒁀𒁕', clearCache: '𒀀𒅈𒄩 𒁕𒀀𒅁 𒄴𒌑𒅈𒁕', confirmClear: '𒀀𒅈𒄩 𒁕𒀀𒅁 𒄴𒌑𒈠𒀀𒈾 𒀀𒈾𒉌𒅀𒀀𒁀𒁕?',
    yes: '𒀀𒅈𒄩 𒁕𒀀𒅁', cancel: '𒁀𒀀𒅈𒈾𒀀𒄴𒄴𒅁', empty: '𒈾𒁀𒁕𒀀 𒀀𒈾𒉌𒅀𒀀𒁀𒁕', noText: '𒈾𒁀𒁕𒀀 𒌑𒁕𒁕𒀀𒉌𒅀𒀀',
  },
  settings: {
    title: '𒅀𒀀𒈾𒁀𒂊𒊮', modelCache: '𒈠𒅁𒋾𒇷 𒄴𒌑𒅈𒁕', clearModelCache: '𒀀𒅈𒄩 𒁕𒀀𒅁 𒈠𒅁𒋾𒇷 𒄴𒌑𒅈𒁕',
    confirmClearModel: '𒀀𒅈𒄩 𒁕𒀀𒅁 ONNX 𒈠𒅁𒋾𒇷? 𒈠𒅁𒋾𒇷 𒉿𒀀𒅁𒅈𒁀𒀀𒈾𒁕 𒀀𒅈𒄩𒁕𒊏 𒀀𒅈𒄴𒇷𒀀𒁕𒀀𒈾.',
    clearDone: '𒄴𒊏𒅁𒈾',
  },
  info: {
    privacyNotice: '𒆠𒅁 𒀀𒊪𒊪 𒉿𒀀𒌑𒅈𒆠𒂊𒅁𒋾 𒀀𒇷𒇷𒀀𒁀𒀀 𒅁𒈾 𒁀𒀀𒅁𒈾𒀀𒈠𒈠𒀀 𒊮𒀀𒅁𒊏. 𒁉𒇷𒅁𒋾𒉺𒅀𒇷𒌑𒊮 𒅀𒀀𒄴 OCR 𒌑𒁀𒁕𒀀𒅈𒉺𒅀𒌑𒊮 𒈾𒅁 𒊮𒀀𒈾𒁕𒅀𒀀𒈾𒁕𒀀 𒁺 𒌑𒁀𒀀𒈾𒀀 𒋾𒅁𒌑𒈠𒀀𒄥.',
    author: '𒅀𒀀𒊮: Yuta Hashimoto',
    githubLink: 'GitHub 𒄴𒌑𒅈𒁕',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: '𒉿𒀀𒊮𒁾𒌑𒇷 𒆠𒊮𒀀𒁀𒁕', modelLoad: '𒈾𒁀𒁕𒀀 𒈠𒀀𒄴𒁀𒀀 𒄴𒇷𒀀𒁕𒀀𒈾 𒈠𒅁𒋾𒇷', ocr: '𒉿𒀀𒊮𒁾𒌑𒇷 𒅁𒈾 OCR',
    fileLoad: '𒈾𒁀𒁕𒀀 𒈠𒀀𒄴𒁀𒀀 𒄴𒇷𒀀𒁕𒀀𒈾 𒉺𒅀𒇷', clipboardNotSupported: '𒈾𒅁 𒈠𒀀𒄥 𒀀𒁀𒂵𒂵𒀀𒈾 clipboard',
  },
  tooltip: { dragPageReorder: '𒉿𒀀𒅈𒉺𒅖𒅗𒀀𒈾𒍝𒅁 𒁺 𒂵𒀀𒊏𒅁𒁕𒅀𒀀𒈾' },
}
