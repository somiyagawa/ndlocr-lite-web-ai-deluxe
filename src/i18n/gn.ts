import type { Translations } from './ja'

export const gn: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Japón OCR Tembipuru Ñanduti Rendápe' },
  upload: {
    dropzone: "Emboja ko'ápe umi kuatia, térã eñemity eiporo haguã",
    directoryButton: 'Eiporavo Carpeta',
    acceptedFormats: "Ojeporu va'ekue: JPG, PNG, PDF",
    startButton: 'Eñepyrũ OCR',
    clearButton: 'Embogue',
  },
  progress: {
    initializing: 'Oñepyrũhína...', loadingLayoutModel: "Oñemyenyhẽhína modelo rehegua'i... {percent}%",
    loadingRecognitionModel: 'Oñemyenyhẽhína modelo ojekuaa haguã... {percent}%',
    layoutDetection: "Ojehekahína ñe'ẽ rendápe... {percent}%",
    textRecognition: "Ojekuaahína ñe'ẽ ({current}/{total} renda)",
    readingOrder: "Oñemboajehína moñe'ẽ rehe...", generatingOutput: "Oñemoheñóihína jehechaukaha...",
    processing: "Ojapóhína: {current}/{total} kuatia", done: "Opáma",
  },
  results: {
    copy: 'Emonguatia', download: 'Emboguejy', downloadAll: "Emboguejy Opaite Ñe'ẽ",
    copied: "Oñemonguatiáma!", noResult: "Ndaipóri jehechaukaha", regions: "{count} renda",
    processingTime: "Ára ojapóva: {time}s",
  },
  history: {
    title: "Tembiasakue", clearCache: 'Embogue Cache', confirmClear: "Embogue opaite tembiasakue?",
    yes: 'Embogue', cancel: 'Eheja', empty: "Ndaipóri tembiasakue", noText: "Ndaipóri ñe'ẽ",
  },
  settings: {
    title: "Ñemboheko", modelCache: 'Cache Modelo', clearModelCache: 'Embogue Cache Modelo',
    confirmClearModel: "Embogue ONNX modelo oñeñongatúva? Oñemboguejýta jevy oñepyrũjey jave.",
    clearDone: "Oñemboguepaháma",
  },
  info: {
    privacyNotice: "Ko tembipuru omba'apo oĩhápe ne ñanduti rendápe. Umi ta'anga ha OCR jehechaukaha ndojeguerahái mba'evépe okapegua.",
    author: "Ojapo va'ekue: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)",
    githubLink: 'GitHub Ñongatuha',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: "Oiko peteĩ jejavy", modelLoad: "Ndaikatúi oñemyenyhẽ modelo", ocr: "Jejavy OCR ojapóvo",
    fileLoad: "Ndaikatúi oñemyenyhẽ kuatia", clipboardNotSupported: "Ndaikatúi ojeike clipboard-pe",
  },
  tooltip: { dragPageReorder: "Emboja emoambue haguã jehasakue" },
}
