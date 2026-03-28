import type { Translations } from './ja'

export const ang: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Iapanisc OCR Tōl on þǣm Webbsēcere' },
  upload: {
    dropzone: 'Drag fīlas hider, oþþe clyca tō ċēosenne',
    directoryButton: 'Ċēos Mappu',
    acceptedFormats: 'Understōde hīwas: JPG, PNG, PDF',
    startButton: 'Onginnan OCR',
    clearButton: 'Āfeormian',
  },
  progress: {
    initializing: 'Onginnung...', loadingLayoutModel: 'Hlædeþ fadungbysen... {percent}%',
    loadingRecognitionModel: 'Hlædeþ oncnāwenbysen... {percent}%',
    layoutDetection: 'Findeþ staflanda... {percent}%',
    textRecognition: 'Oncnāweþ stafas ({current}/{total} landa)',
    readingOrder: 'Endebyrdnesse rǣdinge...', generatingOutput: 'Strīeneþ ūtcyme...',
    processing: 'Wyrcþ: {current}/{total} fīla', done: 'Geendod',
  },
  results: {
    copy: 'Āwrītan', download: 'Āhladung', downloadAll: 'Āhladung ealra stafa',
    copied: 'Āwriten!', noResult: 'Nān ūtcyme', regions: '{count} landa',
    processingTime: 'Wyrctīd: {time}s',
  },
  history: {
    title: 'Gewyrd', clearCache: 'Āfeormian Hord', confirmClear: 'Ādīlgian ealle gewyrd?',
    yes: 'Ādīlgian', cancel: 'Wiðcēosan', empty: 'Nān gewyrd', noText: 'Nāne stafas',
  },
  settings: {
    title: 'Settunga', modelCache: 'Bysenhord', clearModelCache: 'Āfeormian Bysenhord',
    confirmClearModel: 'Ādīlgian gehordode ONNX bysen? Hīe bēoþ eft āhladen æt nīehstan onginne.',
    clearDone: 'Āfeormod',
  },
  info: {
    privacyNotice: 'Þēos æpp wyrcþ fullīce on þīnum webbsēcere. Biliþfīlas and OCR ūtcymas ne sind onsended tō ǣnigum ūtanweardlicum þegnunge.',
    author: 'Gescapen fram Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'GitHub Hordfæt',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'Gedwild gewearþ', modelLoad: 'Ne meahte bysen hladan', ocr: 'Gedwild on OCR wyrcunge',
    fileLoad: 'Ne meahte fīl hladan', clipboardNotSupported: 'Ne cann tō clipborde cuman',
  },
  tooltip: { dragPageReorder: 'Drag tō endebyrdenne' },
}
