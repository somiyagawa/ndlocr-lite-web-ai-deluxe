import type { Translations } from './ja'

export const ha: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Kayan aikin OCR na Jafananci a Burauza' },
  upload: {
    dropzone: 'Ja fayiloli a nan, ko danna don zaɓi',
    directoryButton: 'Zaɓi Babban Fayil',
    acceptedFormats: 'Nau\'o\'in fayil: JPG, PNG, PDF',
    startButton: 'Fara OCR',
    clearButton: 'Share',
  },
  progress: {
    initializing: 'Ana farawa...', loadingLayoutModel: 'Ana loda samfurin tsari... {percent}%',
    loadingRecognitionModel: 'Ana loda samfurin ganewa... {percent}%',
    layoutDetection: 'Ana gano yankunan rubutu... {percent}%',
    textRecognition: 'Ana gane rubutu ({current}/{total} yankuna)',
    readingOrder: 'Ana aiwatar da tsarin karatu...', generatingOutput: 'Ana samar da sakamako...',
    processing: 'Ana aiki: {current}/{total} fayiloli', done: 'An gama',
  },
  results: {
    copy: 'Kwafi', download: 'Sauke', downloadAll: 'Sauke Duk Rubutu',
    copied: 'An kwafi!', noResult: 'Babu sakamako', regions: 'yankuna {count}',
    processingTime: 'Lokacin aiki: {time}s',
  },
  history: {
    title: 'Tarihi', clearCache: 'Share Ajiyar Wucin Gadi', confirmClear: 'A share duk tarihin aiki?',
    yes: 'Share', cancel: 'Soke', empty: 'Babu tarihin aiki', noText: 'Babu rubutu',
  },
  settings: {
    title: 'Saituna', modelCache: 'Ajiyar Samfuri', clearModelCache: 'Share Ajiyar Samfuri',
    confirmClearModel: 'A share samfuran ONNX da aka ajiye? Za a sake sauke su a karo na gaba.',
    clearDone: 'An share',
  },
  info: {
    privacyNotice: 'Wannan manhaja tana aiki gaba ɗaya a cikin burauza. Ba a aika hotunan fayil da sakamakon OCR zuwa kowace sabar waje ba.',
    author: 'Wanda ya ƙirƙira: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Ma\'ajiyar GitHub',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'An sami kuskure', modelLoad: 'Ba a iya loda samfuri ba', ocr: 'Kuskure yayin aiwatar da OCR',
    fileLoad: 'Ba a iya loda fayil ba', clipboardNotSupported: 'Ba za a iya samun damar clipboard ba',
  },
  tooltip: { dragPageReorder: 'Ja don sake tsarawa' },
}
