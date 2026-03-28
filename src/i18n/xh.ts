import type { Translations } from './ja'

export const xh: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Isixhobo se-OCR sesiJapan kwiBhrawuza' },
  upload: {
    dropzone: 'Tsala iifayile apha, okanye cofa ukukhetha',
    directoryButton: 'Khetha iFolda',
    acceptedFormats: 'Iifomathi ezixhaswayo: JPG, PNG, PDF',
    startButton: 'Qala i-OCR',
    clearButton: 'Coca',
  },
  progress: {
    initializing: 'Iyaqala...', loadingLayoutModel: 'Ilayisha imodeli yesakhiwo... {percent}%',
    loadingRecognitionModel: 'Ilayisha imodeli yokubona... {percent}%',
    layoutDetection: 'Ifumana iindawo zombhalo... {percent}%',
    textRecognition: 'Ibona umbhalo ({current}/{total} iindawo)',
    readingOrder: 'Ilungiselela uluhlu lokufunda...', generatingOutput: 'Ivelisa iziphumo...',
    processing: 'Iyasebenza: {current}/{total} iifayile', done: 'Igqityiwe',
  },
  results: {
    copy: 'Kopa', download: 'Khuphela', downloadAll: 'Khuphela Wonke Umbhalo',
    copied: 'Ikopishiwe!', noResult: 'Akukho ziphumo', regions: 'iindawo {count}',
    processingTime: 'Ixesha lokusebenza: {time}s',
  },
  history: {
    title: 'Imbali', clearCache: 'Coca iKhetshi', confirmClear: 'Cima yonke imbali yokusebenza?',
    yes: 'Cima', cancel: 'Rhoxisa', empty: 'Akukho mbali yokusebenza', noText: 'Akukho mbhalo',
  },
  settings: {
    title: 'Iisethingi', modelCache: 'IKhetshi yeModeli', clearModelCache: 'Coca iKhetshi yeModeli',
    confirmClearModel: 'Cima iimodeli ze-ONNX ezigciniweyo? Ziya kukhutshelwa kwakhona ekuqaleni okulandelayo.',
    clearDone: 'Icicisiwe',
  },
  info: {
    privacyNotice: 'Le app isebenza ngokupheleleyo kwibhrawuza yakho. Iifayile zemifanekiso neziphumo ze-OCR azithunyelwa kwiseva yangaphandle.',
    author: 'Yenziwe ngu-Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Indawo yogcino ye-GitHub',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'Kwenzeke impazamo', modelLoad: 'Ayiphumelelanga ukulayisha imodeli', ocr: 'Impazamo ngexesha le-OCR',
    fileLoad: 'Ayiphumelelanga ukulayisha ifayile', clipboardNotSupported: 'Ayikwazi ukufikelela kwiklipbhodi',
  },
  tooltip: { dragPageReorder: 'Tsala ukulungelelanisa kwakhona' },
}
