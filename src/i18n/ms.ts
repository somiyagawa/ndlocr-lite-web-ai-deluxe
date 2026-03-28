import type { Translations } from './ja'

export const ms: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'Alat OCR Jepun dalam Pelayar',
  },
  upload: {
    dropzone: 'Seret fail ke sini, atau klik untuk memilih',
    directoryButton: 'Pilih Folder',
    acceptedFormats: 'Format yang disokong: JPG, PNG, PDF',
    startButton: 'Mula OCR',
    clearButton: 'Padam',
  },
  progress: {
    initializing: 'Memulakan...',
    loadingLayoutModel: 'Memuatkan model susun atur... {percent}%',
    loadingRecognitionModel: 'Memuatkan model pengecaman... {percent}%',
    layoutDetection: 'Mengesan kawasan teks... {percent}%',
    textRecognition: 'Mengecam teks ({current}/{total} kawasan)',
    readingOrder: 'Memproses susunan bacaan...',
    generatingOutput: 'Menjana output...',
    processing: 'Memproses: {current}/{total} fail',
    done: 'Selesai',
  },
  results: {
    copy: 'Salin',
    download: 'Muat turun',
    downloadAll: 'Muat turun Semua Teks',
    copied: 'Disalin!',
    noResult: 'Tiada keputusan',
    regions: '{count} kawasan',
    processingTime: 'Masa pemprosesan: {time}s',
  },
  history: {
    title: 'Sejarah',
    clearCache: 'Padam Cache',
    confirmClear: 'Padam semua sejarah pemprosesan?',
    yes: 'Padam',
    cancel: 'Batal',
    empty: 'Tiada sejarah pemprosesan',
    noText: 'Tiada teks',
  },
  settings: {
    title: 'Tetapan',
    modelCache: 'Cache Model',
    clearModelCache: 'Padam Cache Model',
    confirmClearModel: 'Padam model ONNX yang dicache? Model akan dimuat turun semula pada pelancaran seterusnya.',
    clearDone: 'Dipadam',
  },
  info: {
    privacyNotice: 'Aplikasi ini berjalan sepenuhnya dalam pelayar anda. Fail imej dan keputusan OCR tidak dihantar ke mana-mana pelayan luaran.',
    author: 'Dicipta oleh Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Repositori GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'Ralat berlaku',
    modelLoad: 'Gagal memuatkan model',
    ocr: 'Ralat semasa pemprosesan OCR',
    fileLoad: 'Gagal memuatkan fail',
    clipboardNotSupported: 'Tidak dapat mengakses papan keratan',
  },
  tooltip: {
    dragPageReorder: 'Seret untuk menyusun semula',
  },
}
