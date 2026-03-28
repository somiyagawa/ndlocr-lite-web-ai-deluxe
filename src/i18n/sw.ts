import type { Translations } from './ja'

export const sw: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Zana ya OCR ya Kijapani kwenye Kivinjari' },
  upload: {
    dropzone: 'Buruta faili hapa, au bofya kuchagua',
    directoryButton: 'Chagua Folda',
    acceptedFormats: 'Muundo unaotumika: JPG, PNG, PDF',
    startButton: 'Anza OCR',
    clearButton: 'Futa',
  },
  progress: {
    initializing: 'Inaanzisha...', loadingLayoutModel: 'Inapakia modeli ya mpangilio... {percent}%',
    loadingRecognitionModel: 'Inapakia modeli ya utambuzi... {percent}%',
    layoutDetection: 'Inagundua maeneo ya maandishi... {percent}%',
    textRecognition: 'Inatambua maandishi ({current}/{total} maeneo)',
    readingOrder: 'Inashughulikia mpangilio wa kusoma...', generatingOutput: 'Inazalisha matokeo...',
    processing: 'Inashughulikia: {current}/{total} faili', done: 'Imekamilika',
  },
  results: {
    copy: 'Nakili', download: 'Pakua', downloadAll: 'Pakua Maandishi Yote',
    copied: 'Imenakiliwa!', noResult: 'Hakuna matokeo', regions: 'maeneo {count}',
    processingTime: 'Muda wa usindikaji: {time}s',
  },
  history: {
    title: 'Historia', clearCache: 'Futa Kache', confirmClear: 'Futa historia yote ya usindikaji?',
    yes: 'Futa', cancel: 'Ghairi', empty: 'Hakuna historia ya usindikaji', noText: 'Hakuna maandishi',
  },
  settings: {
    title: 'Mipangilio', modelCache: 'Kache ya Modeli', clearModelCache: 'Futa Kache ya Modeli',
    confirmClearModel: 'Futa modeli za ONNX zilizohifadhiwa? Zitapakuliwa tena wakati wa kuanza ijayo.',
    clearDone: 'Imefutwa',
  },
  info: {
    privacyNotice: 'Programu hii inafanya kazi kabisa kwenye kivinjari chako. Faili za picha na matokeo ya OCR hayatumwi kwa seva yoyote ya nje.',
    author: 'Imeundwa na Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Hifadhi ya GitHub',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'Hitilafu imetokea', modelLoad: 'Imeshindwa kupakia modeli', ocr: 'Hitilafu wakati wa usindikaji OCR',
    fileLoad: 'Imeshindwa kupakia faili', clipboardNotSupported: 'Haiwezi kufikia ubao wa kunakili',
  },
  tooltip: { dragPageReorder: 'Buruta kupanga upya' },
}
