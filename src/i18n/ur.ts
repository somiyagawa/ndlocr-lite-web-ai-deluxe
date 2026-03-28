import type { Translations } from './ja'

export const ur: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'براؤزر میں جاپانی OCR ٹول' },
  upload: {
    dropzone: 'فائلیں یہاں گھسیٹیں، یا منتخب کرنے کے لیے کلک کریں',
    directoryButton: 'فولڈر منتخب کریں',
    acceptedFormats: 'معاون فارمیٹس: JPG, PNG, PDF',
    startButton: 'OCR شروع کریں',
    clearButton: 'صاف کریں',
  },
  progress: {
    initializing: 'شروع ہو رہا ہے...',
    loadingLayoutModel: 'لے آؤٹ ماڈل لوڈ ہو رہا ہے... {percent}%',
    loadingRecognitionModel: 'شناخت ماڈل لوڈ ہو رہا ہے... {percent}%',
    layoutDetection: 'متن کے علاقے تلاش ہو رہے ہیں... {percent}%',
    textRecognition: 'متن کی شناخت ({current}/{total} علاقے)',
    readingOrder: 'پڑھنے کی ترتیب پر کارروائی...',
    generatingOutput: 'آؤٹ پٹ تیار ہو رہا ہے...',
    processing: 'پروسیسنگ: {current}/{total} فائلیں',
    done: 'مکمل',
  },
  results: {
    copy: 'کاپی', download: 'ڈاؤن لوڈ', downloadAll: 'تمام متن ڈاؤن لوڈ کریں',
    copied: 'کاپی ہو گیا!', noResult: 'کوئی نتیجہ نہیں', regions: '{count} علاقے',
    processingTime: 'پروسیسنگ وقت: {time}سیکنڈ',
  },
  history: {
    title: 'تاریخچہ', clearCache: 'کیش صاف کریں', confirmClear: 'تمام پروسیسنگ تاریخچہ حذف کریں؟',
    yes: 'حذف', cancel: 'منسوخ', empty: 'کوئی پروسیسنگ تاریخچہ نہیں', noText: 'کوئی متن نہیں',
  },
  settings: {
    title: 'ترتیبات', modelCache: 'ماڈل کیش', clearModelCache: 'ماڈل کیش صاف کریں',
    confirmClearModel: 'کیش شدہ ONNX ماڈلز حذف کریں؟ اگلی بار شروع ہونے پر دوبارہ ڈاؤن لوڈ ہوں گے۔',
    clearDone: 'صاف ہو گیا',
  },
  info: {
    privacyNotice: 'یہ ایپ مکمل طور پر براؤزر میں چلتی ہے۔ تصویری فائلیں اور OCR نتائج کسی بیرونی سرور کو نہیں بھیجے جاتے۔',
    author: 'تخلیق کار: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'GitHub ذخیرہ',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'ایک خرابی پیش آئی', modelLoad: 'ماڈل لوڈ ناکام', ocr: 'OCR پروسیسنگ میں خرابی',
    fileLoad: 'فائل لوڈ ناکام', clipboardNotSupported: 'کلپ بورڈ تک رسائی ممکن نہیں',
  },
  tooltip: { dragPageReorder: 'ترتیب بدلنے کے لیے گھسیٹیں' },
}
