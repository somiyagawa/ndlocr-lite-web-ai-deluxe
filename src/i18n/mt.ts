import type { Translations } from './ja'

export const mt: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Għodda OCR Ġappuniża fil-Browser' },
  upload: {
    dropzone: 'Iġbed il-fajls hawn, jew ikklikkja biex tagħżel',
    directoryButton: 'Agħżel Folder',
    acceptedFormats: 'Formati appoġġjati: JPG, PNG, PDF',
    startButton: 'Ibda OCR',
    clearButton: 'Ħassar',
  },
  progress: {
    initializing: 'Qed jibda...', loadingLayoutModel: 'Qed jitgħabba l-mudell tat-tqassim... {percent}%',
    loadingRecognitionModel: 'Qed jitgħabba l-mudell tal-għarfien... {percent}%',
    layoutDetection: 'Qed jiskopri żoni tat-test... {percent}%',
    textRecognition: 'Qed jagħraf it-test ({current}/{total} żoni)',
    readingOrder: 'Qed jipproċessa l-ordni tal-qari...', generatingOutput: 'Qed jiġġenera r-riżultat...',
    processing: 'Qed jipproċessa: {current}/{total} fajls', done: 'Lest',
  },
  results: {
    copy: 'Ikkopja', download: 'Niżżel', downloadAll: 'Niżżel it-Test Kollu',
    copied: 'Ikkopjat!', noResult: "L-ebda riżultat", regions: '{count} żoni',
    processingTime: 'Ħin tal-ipproċessar: {time}s',
  },
  history: {
    title: 'Storja', clearCache: 'Ħassar il-Cache', confirmClear: 'Ħassar l-istorja kollha tal-ipproċessar?',
    yes: 'Ħassar', cancel: 'Ikkanċella', empty: "L-ebda storja tal-ipproċessar", noText: "L-ebda test",
  },
  settings: {
    title: 'Settings', modelCache: 'Cache tal-Mudell', clearModelCache: 'Ħassar il-Cache tal-Mudell',
    confirmClearModel: "Ħassar il-mudelli ONNX maħżuna? Se jerġgħu jitniżżlu fil-bidu li jmiss.",
    clearDone: 'Imħassar',
  },
  info: {
    privacyNotice: "Din l-app taħdem kompletament fil-browser tiegħek. Il-fajls tal-immaġni u r-riżultati OCR ma jintbagħtux lil-ebda server estern.",
    author: 'Maħluq minn Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Repożitorju GitHub',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'Seħħ żball', modelLoad: "Ma rnexxiex jitgħabba l-mudell", ocr: "Żball waqt l-ipproċessar OCR",
    fileLoad: "Ma rnexxiex jitgħabba l-fajl", clipboardNotSupported: "Ma tistax taċċessa l-clipboard",
  },
  tooltip: { dragPageReorder: "Iġbed biex tibdel l-ordni" },
}
