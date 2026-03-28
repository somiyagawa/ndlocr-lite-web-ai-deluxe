import type { Translations } from './ja'

// Sumerian — Unicode Cuneiform (U+12000–U+1236E)
// 𒀀 = A, 𒁀 = BA, 𒂗 = EN, 𒄀 = GI, 𒆠 = KI, 𒈾 = NA, 𒌓 = UD, 𒌝 = UM
export const sux: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: '𒅀𒉺𒀀𒈾 OCR 𒈾𒅎𒆪𒍪 𒁾𒊬𒂊' },
  upload: {
    dropzone: '𒁾𒁉 𒆠𒁉𒊺 𒄥𒊏, 𒌑𒈾𒀀𒁺𒄄 𒉌𒋼𒈾',
    directoryButton: '𒂊𒁾𒁀 𒁀𒀊𒁺𒄄',
    acceptedFormats: '𒀠𒀀𒈾 𒋗𒁺𒀀: JPG, PNG, PDF',
    startButton: 'OCR 𒃶𒂗𒋗𒌝',
    clearButton: '𒁀𒀊𒁀𒁺𒊒',
  },
  progress: {
    initializing: '𒈬𒌦𒁲𒈨...', loadingLayoutModel: '𒀠𒀀𒈾𒁉 𒈬𒌦𒁲𒂊... {percent}%',
    loadingRecognitionModel: '𒅆𒂵𒀀𒆷 𒀠𒀀𒈾 𒈬𒌦𒁲𒂊... {percent}%',
    layoutDetection: '𒆠𒁺𒂊𒁉 𒈬𒌦𒍪... {percent}%',
    textRecognition: '𒁾𒁉 𒈬𒌦𒍪 ({current}/{total} 𒆠)',
    readingOrder: '𒀀𒊏 𒅆𒁲𒁉 𒈬𒌦𒂵𒊏...', generatingOutput: '𒈬𒌦𒁲𒈨...',
    processing: '𒈬𒌦𒀊𒆥: {current}/{total} 𒁾', done: '𒁀𒀊𒋾𒅋',
  },
  results: {
    copy: '𒊬', download: '𒂊', downloadAll: '𒁾 𒁲𒁀𒊑𒁉 𒂊',
    copied: '𒁀𒀊𒊬!', noResult: '𒉡𒈬𒌦𒍪', regions: '{count} 𒆠',
    processingTime: '𒌓𒁉: {time}𒊺',
  },
  history: {
    title: '𒈾𒅎𒇻𒌑𒇻', clearCache: '𒁀𒀊𒁺𒊒 𒂊𒂵𒊒', confirmClear: '𒈾𒅎𒇻𒌑𒇻𒁉 𒄩𒁀𒀊𒁺𒊒?',
    yes: '𒁀𒀊𒁺𒊒', cancel: '𒄀𒊒𒄀𒊒', empty: '𒈾𒅎𒇻𒌑𒇻 𒉡𒂵𒀀𒆷', noText: '𒁾 𒉡𒂵𒀀𒆷',
  },
  settings: {
    title: '𒂵𒊏𒍝', modelCache: '𒂊𒂵𒊒 𒀠𒀀𒈾', clearModelCache: '𒁀𒀊𒁺𒊒 𒂊𒂵𒊒 𒀠𒀀𒈾',
    confirmClearModel: 'ONNX 𒀠𒀀𒈾𒁉 𒄩𒁀𒀊𒁺𒊒? 𒌓𒁉𒀀 𒈬𒌦𒁲𒂊𒀀.',
    clearDone: '𒁀𒀊𒁺𒊒',
  },
  info: {
    privacyNotice: '𒈾𒅎𒆪𒍪𒁉 𒁾𒊬𒂊 𒈬𒌦𒀊𒆥. 𒀠𒀀𒈾 𒌑 OCR 𒁾𒁉 𒉡𒈬𒌦𒂵𒊏 𒀀𒈾 𒂊𒆪𒊒𒊏.',
    author: '𒈬𒌦𒁲𒈨: Yuta Hashimoto',
    githubLink: 'GitHub 𒂊𒁾𒁀',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: '𒈾𒅎𒁺𒂵 𒁀𒀀𒈾𒂵𒊏', modelLoad: '𒀠𒀀𒈾 𒉡𒈬𒌦𒁲𒂊', ocr: '𒈾𒅎𒁺𒂵 𒅆 OCR',
    fileLoad: '𒁾 𒉡𒈬𒌦𒁲𒂊', clipboardNotSupported: '𒉡𒈬𒌦𒁕𒁀 clipboard',
  },
  tooltip: { dragPageReorder: '𒄥𒊏 𒆠𒁉𒊺' },
}
