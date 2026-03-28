import type { Translations } from './ja'

export const fa: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'ابزار OCR ژاپنی در مرورگر',
  },
  upload: {
    dropzone: 'فایل‌ها را به اینجا بکشید، یا برای انتخاب کلیک کنید',
    directoryButton: 'انتخاب پوشه',
    acceptedFormats: 'قالب‌های پشتیبانی‌شده: JPG, PNG, PDF',
    startButton: 'شروع OCR',
    clearButton: 'پاک کردن',
  },
  progress: {
    initializing: 'در حال آغاز...',
    loadingLayoutModel: 'بارگذاری مدل چیدمان... {percent}%',
    loadingRecognitionModel: 'بارگذاری مدل تشخیص... {percent}%',
    layoutDetection: 'شناسایی نواحی متن... {percent}%',
    textRecognition: 'تشخیص متن ({current}/{total} ناحیه)',
    readingOrder: 'پردازش ترتیب خوانش...',
    generatingOutput: 'تولید خروجی...',
    processing: 'پردازش: {current}/{total} فایل',
    done: 'انجام شد',
  },
  results: {
    copy: 'کپی',
    download: 'دانلود',
    downloadAll: 'دانلود تمام متن',
    copied: 'کپی شد!',
    noResult: 'نتیجه‌ای نیست',
    regions: '{count} ناحیه',
    processingTime: 'زمان پردازش: {time} ثانیه',
  },
  history: {
    title: 'تاریخچه',
    clearCache: 'پاک کردن حافظه پنهان',
    confirmClear: 'تمام تاریخچه پردازش حذف شود؟',
    yes: 'حذف',
    cancel: 'لغو',
    empty: 'تاریخچه پردازشی وجود ندارد',
    noText: 'متنی نیست',
  },
  settings: {
    title: 'تنظیمات',
    modelCache: 'حافظه پنهان مدل',
    clearModelCache: 'پاک کردن حافظه پنهان مدل',
    confirmClearModel: 'مدل‌های ONNX ذخیره‌شده حذف شوند؟ در راه‌اندازی بعدی دوباره دانلود خواهند شد.',
    clearDone: 'پاک شد',
  },
  info: {
    privacyNotice: 'این برنامه به‌طور کامل در مرورگر اجرا می‌شود. فایل‌های تصویری و نتایج OCR به هیچ سرور خارجی ارسال نمی‌شوند.',
    author: 'ساخته شده توسط Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'مخزن GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'خطایی رخ داد',
    modelLoad: 'بارگذاری مدل ناموفق بود',
    ocr: 'خطا در پردازش OCR',
    fileLoad: 'بارگذاری فایل ناموفق بود',
    clipboardNotSupported: 'دسترسی به کلیپ‌بورد ممکن نیست',
  },
  tooltip: {
    dragPageReorder: 'برای مرتب‌سازی مجدد بکشید',
  },
}
