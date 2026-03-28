import type { Translations } from './ja'

export const id: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'Alat OCR Jepang di Peramban',
  },
  upload: {
    dropzone: 'Seret file ke sini, atau klik untuk memilih',
    directoryButton: 'Pilih Folder',
    acceptedFormats: 'Format yang didukung: JPG, PNG, PDF',
    startButton: 'Mulai OCR',
    clearButton: 'Hapus',
  },
  progress: {
    initializing: 'Menginisialisasi...',
    loadingLayoutModel: 'Memuat model tata letak... {percent}%',
    loadingRecognitionModel: 'Memuat model pengenalan... {percent}%',
    layoutDetection: 'Mendeteksi area teks... {percent}%',
    textRecognition: 'Mengenali teks ({current}/{total} area)',
    readingOrder: 'Memproses urutan baca...',
    generatingOutput: 'Menghasilkan keluaran...',
    processing: 'Memproses: {current}/{total} file',
    done: 'Selesai',
  },
  results: {
    copy: 'Salin',
    download: 'Unduh',
    downloadAll: 'Unduh Semua Teks',
    copied: 'Tersalin!',
    noResult: 'Tidak ada hasil',
    regions: '{count} area',
    processingTime: 'Waktu pemrosesan: {time}d',
  },
  history: {
    title: 'Riwayat',
    clearCache: 'Hapus Cache',
    confirmClear: 'Hapus semua riwayat pemrosesan?',
    yes: 'Hapus',
    cancel: 'Batal',
    empty: 'Tidak ada riwayat pemrosesan',
    noText: 'Tidak ada teks',
  },
  settings: {
    title: 'Pengaturan',
    modelCache: 'Cache Model',
    clearModelCache: 'Hapus Cache Model',
    confirmClearModel: 'Hapus model ONNX yang di-cache? Model akan diunduh ulang saat peluncuran berikutnya.',
    clearDone: 'Terhapus',
  },
  info: {
    privacyNotice: 'Aplikasi ini berjalan sepenuhnya di peramban Anda. File gambar dan hasil OCR tidak dikirim ke server eksternal mana pun.',
    author: 'Dibuat oleh Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Repositori GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'Terjadi kesalahan',
    modelLoad: 'Gagal memuat model',
    ocr: 'Kesalahan saat pemrosesan OCR',
    fileLoad: 'Gagal memuat file',
    clipboardNotSupported: 'Tidak dapat mengakses papan klip',
  },
  tooltip: {
    dragPageReorder: 'Seret untuk mengurutkan ulang',
  },
}
