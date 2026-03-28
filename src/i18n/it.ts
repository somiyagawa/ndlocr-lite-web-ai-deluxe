import type { Translations } from './ja'

export const it: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'Strumento OCR giapponese nel browser',
  },
  upload: {
    dropzone: 'Trascina i file qui, oppure clicca per selezionare',
    directoryButton: 'Seleziona cartella',
    acceptedFormats: 'Formati supportati: JPG, PNG, PDF',
    startButton: 'Avvia OCR',
    clearButton: 'Cancella',
  },
  progress: {
    initializing: 'Inizializzazione...',
    loadingLayoutModel: 'Caricamento modello di layout... {percent}%',
    loadingRecognitionModel: 'Caricamento modello di riconoscimento... {percent}%',
    layoutDetection: 'Rilevamento aree di testo... {percent}%',
    textRecognition: 'Riconoscimento testo ({current}/{total} aree)',
    readingOrder: 'Elaborazione ordine di lettura...',
    generatingOutput: 'Generazione output...',
    processing: 'Elaborazione: {current}/{total} file',
    done: 'Completato',
  },
  results: {
    copy: 'Copia',
    download: 'Scarica',
    downloadAll: 'Scarica tutto il testo',
    copied: 'Copiato!',
    noResult: 'Nessun risultato',
    regions: '{count} aree',
    processingTime: 'Tempo di elaborazione: {time}s',
  },
  history: {
    title: 'Cronologia',
    clearCache: 'Svuota cache',
    confirmClear: 'Eliminare tutta la cronologia?',
    yes: 'Elimina',
    cancel: 'Annulla',
    empty: 'Nessuna cronologia',
    noText: 'Nessun testo',
  },
  settings: {
    title: 'Impostazioni',
    modelCache: 'Cache modelli',
    clearModelCache: 'Svuota cache modelli',
    confirmClearModel: 'Eliminare i modelli ONNX dalla cache? Verranno scaricati di nuovo al prossimo avvio.',
    clearDone: 'Svuotata',
  },
  info: {
    privacyNotice: 'Questa app funziona interamente nel browser. Le immagini e i risultati OCR non vengono inviati a nessun server esterno.',
    author: 'Creato da Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Repository GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'Si è verificato un errore',
    modelLoad: 'Caricamento modello fallito',
    ocr: 'Errore durante l\'elaborazione OCR',
    fileLoad: 'Caricamento file fallito',
    clipboardNotSupported: 'Impossibile accedere agli appunti',
  },
  tooltip: {
    dragPageReorder: 'Trascina per riordinare',
  },
}
