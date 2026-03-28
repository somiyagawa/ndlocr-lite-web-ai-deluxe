import type { Translations } from './ja'

export const am: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'በአሳሽ ውስጥ የጃፓንኛ OCR መሣሪያ' },
  upload: {
    dropzone: 'ፋይሎችን ወደዚህ ይጎትቱ፣ ወይም ለመምረጥ ጠቅ ያድርጉ',
    directoryButton: 'ማህደር ይምረጡ',
    acceptedFormats: 'የሚደገፉ ቅርጸቶች: JPG, PNG, PDF',
    startButton: 'OCR ጀምር',
    clearButton: 'አጽዳ',
  },
  progress: {
    initializing: 'በማስጀመር ላይ...',
    loadingLayoutModel: 'የአቀማመጥ ሞዴል በመጫን ላይ... {percent}%',
    loadingRecognitionModel: 'የማወቂያ ሞዴል በመጫን ላይ... {percent}%',
    layoutDetection: 'የጽሑፍ ቦታዎችን በማወቅ ላይ... {percent}%',
    textRecognition: 'ጽሑፍ በማወቅ ላይ ({current}/{total} ቦታዎች)',
    readingOrder: 'የንባብ ቅደም ተከተል በማስኬድ ላይ...',
    generatingOutput: 'ውጤት በማመንጨት ላይ...',
    processing: 'በማስኬድ ላይ: {current}/{total} ፋይሎች',
    done: 'ተጠናቅቋል',
  },
  results: {
    copy: 'ቅዳ', download: 'አውርድ', downloadAll: 'ሁሉንም ጽሑፍ አውርድ',
    copied: 'ተቀድቷል!', noResult: 'ውጤት የለም', regions: '{count} ቦታዎች',
    processingTime: 'የማስኬጃ ጊዜ: {time}ሰ',
  },
  history: {
    title: 'ታሪክ', clearCache: 'መሸጎጫ አጽዳ', confirmClear: 'ሁሉንም ታሪክ ያስወግዱ?',
    yes: 'አስወግድ', cancel: 'ሰርዝ', empty: 'ታሪክ የለም', noText: 'ጽሑፍ የለም',
  },
  settings: {
    title: 'ቅንብሮች', modelCache: 'ሞዴል መሸጎጫ', clearModelCache: 'ሞዴል መሸጎጫ አጽዳ',
    confirmClearModel: 'የተሸጎጡ ONNX ሞዴሎችን ያስወግዱ? በቀጣይ ማስጀመሪያ እንደገና ይወርዳሉ።',
    clearDone: 'ጸድቷል',
  },
  info: {
    privacyNotice: 'ይህ መተግበሪያ ሙሉ በሙሉ በአሳሽ ውስጥ ይሰራል። ምስሎችና OCR ውጤቶች ወደ ውጫዊ አገልጋይ አይላኩም።',
    author: 'ፈጣሪ: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'GitHub ማከማቻ',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'ስህተት ተከስቷል', modelLoad: 'ሞዴል መጫን አልተሳካም', ocr: 'OCR ማስኬድ ላይ ስህተት',
    fileLoad: 'ፋይል መጫን አልተሳካም', clipboardNotSupported: 'ቅንጥብ ሰሌዳ መድረስ አይቻልም',
  },
  tooltip: { dragPageReorder: 'ቅደም ተከተል ለመቀየር ይጎትቱ' },
}
