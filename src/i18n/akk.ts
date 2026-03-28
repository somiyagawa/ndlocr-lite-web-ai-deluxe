import type { Translations } from './ja'

// Akkadian — Unicode Cuneiform (U+12000–U+1236E)
// 𒀀 = A, 𒁀 = BA, 𒂗 = EN, 𒄀 = GI, 𒅎 = IM, 𒆠 = KI, 𒈾 = NA, 𒊑 = RI, 𒌓 = UD
export const akk: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: '𒅀𒉺𒀀𒉡 OCR 𒌑𒉡𒌈 𒀀𒈾 𒊓𒅁𒊑 𒈾𒀀𒉺𒄭𒋾𒅎' },
  upload: {
    dropzone: '𒋗𒁕 𒁾𒉺𒀀𒋾 𒀀𒈾𒉌𒅖, 𒇻 𒁍𒄴𒄴𒌨 𒀀𒈾 𒈾𒊓𒅈𒅎',
    directoryButton: '𒈾𒀲𒅕 𒈾𒅗𒈠𒅈𒁀𒌝',
    acceptedFormats: '𒌑𒊻𒊏𒌈 𒈠𒄴𒊒𒌈: JPG, PNG, PDF',
    startButton: '𒋗𒊑 OCR',
    clearButton: '𒈨𒌍',
  },
  progress: {
    initializing: '𒋗𒊒𒌝...', loadingLayoutModel: '𒈾𒋗 𒂊𒇴𒂊𒌝𒁾... {percent}%',
    loadingRecognitionModel: '𒈾𒋗 𒄩𒀀𒊒 𒂊𒇴𒂊𒌝𒁾... {percent}%',
    layoutDetection: '𒄩𒅈𒋗 𒀀𒉿𒀀𒋾𒅎... {percent}%',
    textRecognition: '𒄩𒀀𒊒 𒀀𒉿𒀀𒋾𒅎 ({current}/{total} 𒀀𒊮𒊒)',
    readingOrder: '𒂊𒉺𒂊𒋗 𒆠𒂊𒊑𒀀𒅎...', generatingOutput: '𒁀𒉡 𒋾𒂊𒅈𒁾𒌝...',
    processing: '𒂊𒉺𒂊𒋗: {current}/{total} 𒁾𒉺𒉺𒌑', done: '𒂵𒅎𒊒',
  },
  results: {
    copy: '𒊮𒀀𒋗𒊒', download: '𒋗𒊒𒁕', downloadAll: '𒋗𒊒𒁕 𒆪𒆷𒁀𒌝 𒀀𒉿𒀀𒋾𒅎',
    copied: '𒊮𒀀𒋾𒅈!', noResult: '𒌑𒆷 𒅁𒀀𒋾𒌑 𒋾𒂊𒅈𒁾𒌝', regions: '{count} 𒀀𒊮𒊒',
    processingTime: '𒀀𒁕𒀀𒉡 𒂊𒉺𒂊𒅆𒅎: {time}𒊮',
  },
  history: {
    title: '𒀀𒉡𒉡𒌈', clearCache: '𒈨𒌍 𒈾𒅗𒈠𒅈𒁀𒌝', confirmClear: '𒄩𒆷𒀀𒆪 𒅗𒆷 𒀀𒉡𒉡𒋾𒅎?',
    yes: '𒄩𒆷𒀀𒆪', cancel: '𒂊𒍪𒂊𒁍', empty: '𒌑𒆷 𒅁𒀀𒋾𒌑 𒀀𒉡𒉡𒌈', noText: '𒌑𒆷 𒅁𒀀𒋾𒌑 𒀀𒉿𒀀𒌈',
  },
  settings: {
    title: '𒅆𒆠𒈾𒀀𒌈', modelCache: '𒈾𒅗𒈠𒅈𒁾 𒂊𒇴𒂊𒌝𒋾𒅎', clearModelCache: '𒈨𒌍 𒈾𒅗𒈠𒅈𒁾 𒂊𒇴𒂊𒌝𒋾𒅎',
    confirmClearModel: '𒄩𒆷𒀀𒆪 ONNX 𒂊𒇴𒂊𒌝𒁾? 𒅁𒀀𒈾𒊻𒋡 𒊮𒀀𒉌𒅖 𒅖𒅆𒀀.',
    clearDone: '𒈨𒌍',
  },
  info: {
    privacyNotice: '𒀀𒉡 𒌑𒉡𒌈 𒀀𒈾 𒊓𒅁𒊑 𒈾𒀀𒉺𒄭𒋾𒅗 𒅁𒉺𒌑𒊮. 𒊓𒅈𒈨 𒌑 𒋾𒂊𒅈𒁾 OCR 𒌑𒆷 𒅖𒁕𒁕𒅁𒉡 𒀀𒈾 𒈾𒉺𒄴𒀀𒊑𒅎 𒊓𒅁𒊑𒅎.',
    author: '𒁀𒉡: Yuta Hashimoto',
    githubLink: 'GitHub 𒈾𒅗𒈠𒅈𒁾𒌝',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: '𒊮𒂊𒅈𒁾𒌝 𒅁𒀀𒋾𒌑', modelLoad: '𒌑𒆷 𒅁𒇷𒂊 𒈾𒋗 𒂊𒇴𒂊𒌝𒁀𒌝', ocr: '𒊮𒂊𒅈𒁾𒌝 𒀀𒈾 OCR',
    fileLoad: '𒌑𒆷 𒅁𒇷𒂊 𒈾𒋗 𒁾𒉺𒁀𒌝', clipboardNotSupported: '𒌑𒆷 𒅁𒇷𒂊 𒊓𒁀𒀀𒁾𒌝 clipboard',
  },
  tooltip: { dragPageReorder: '𒋗𒁕 𒀀𒈾 𒊮𒀀𒅗𒀀𒉌𒅎' },
}
