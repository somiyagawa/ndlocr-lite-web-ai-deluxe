import type { Translations } from './ja'

export const he: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'כלי OCR יפני בדפדפן',
  },
  upload: {
    dropzone: 'גררו קבצים לכאן, או לחצו לבחירה',
    directoryButton: 'בחר תיקייה',
    acceptedFormats: 'פורמטים נתמכים: JPG, PNG, PDF',
    startButton: 'התחל OCR',
    clearButton: 'נקה',
  },
  progress: {
    initializing: 'מאתחל...',
    loadingLayoutModel: 'טוען מודל פריסה... {percent}%',
    loadingRecognitionModel: 'טוען מודל זיהוי... {percent}%',
    layoutDetection: 'מזהה אזורי טקסט... {percent}%',
    textRecognition: 'מזהה טקסט ({current}/{total} אזורים)',
    readingOrder: 'מעבד סדר קריאה...',
    generatingOutput: 'מייצר פלט...',
    processing: 'מעבד: {current}/{total} קבצים',
    done: 'הושלם',
  },
  results: {
    copy: 'העתק',
    download: 'הורד',
    downloadAll: 'הורד את כל הטקסט',
    copied: 'הועתק!',
    noResult: 'אין תוצאות',
    regions: '{count} אזורים',
    processingTime: 'זמן עיבוד: {time} שניות',
  },
  history: {
    title: 'היסטוריה',
    clearCache: 'נקה מטמון',
    confirmClear: 'למחוק את כל היסטוריית העיבוד?',
    yes: 'מחק',
    cancel: 'ביטול',
    empty: 'אין היסטוריית עיבוד',
    noText: 'אין טקסט',
  },
  settings: {
    title: 'הגדרות',
    modelCache: 'מטמון מודלים',
    clearModelCache: 'נקה מטמון מודלים',
    confirmClearModel: 'למחוק מודלי ONNX שמורים? הם יורדו מחדש בהפעלה הבאה.',
    clearDone: 'נוקה',
  },
  info: {
    privacyNotice: 'אפליקציה זו פועלת לחלוטין בדפדפן. קבצי תמונה ותוצאות OCR אינם נשלחים לשום שרת חיצוני.',
    author: 'נוצר על ידי Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'מאגר GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'אירעה שגיאה',
    modelLoad: 'טעינת המודל נכשלה',
    ocr: 'שגיאה במהלך עיבוד OCR',
    fileLoad: 'טעינת הקובץ נכשלה',
    clipboardNotSupported: 'אין גישה ללוח',
  },
  tooltip: {
    dragPageReorder: 'גרור לשינוי סדר',
  },
}
