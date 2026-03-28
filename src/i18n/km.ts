import type { Translations } from './ja'

export const km: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'ឧបករណ៍ OCR ជប៉ុនក្នុងកម្មវិធីរុករក' },
  upload: {
    dropzone: 'អូសឯកសារមកទីនេះ ឬចុចដើម្បីជ្រើសរើស',
    directoryButton: 'ជ្រើសរើសថត',
    acceptedFormats: 'ទម្រង់ដែលគាំទ្រ: JPG, PNG, PDF',
    startButton: 'ចាប់ផ្តើម OCR',
    clearButton: 'សម្អាត',
  },
  progress: {
    initializing: 'កំពុងចាប់ផ្តើម...', loadingLayoutModel: 'កំពុងផ្ទុកម៉ូដែលប្លង់... {percent}%',
    loadingRecognitionModel: 'កំពុងផ្ទុកម៉ូដែលសម្គាល់... {percent}%',
    layoutDetection: 'កំពុងរកតំបន់អត្ថបទ... {percent}%',
    textRecognition: 'កំពុងសម្គាល់អត្ថបទ ({current}/{total} តំបន់)',
    readingOrder: 'កំពុងដំណើរការលំដាប់អាន...', generatingOutput: 'កំពុងបង្កើតលទ្ធផល...',
    processing: 'កំពុងដំណើរការ: {current}/{total} ឯកសារ', done: 'រួចរាល់',
  },
  results: {
    copy: 'ចម្លង', download: 'ទាញយក', downloadAll: 'ទាញយកអត្ថបទទាំងអស់',
    copied: 'បានចម្លង!', noResult: 'គ្មានលទ្ធផល', regions: '{count} តំបន់',
    processingTime: 'រយៈពេលដំណើរការ: {time}វិ',
  },
  history: {
    title: 'ប្រវត្តិ', clearCache: 'សម្អាតឃ្លាំង', confirmClear: 'លុបប្រវត្តិដំណើរការទាំងអស់?',
    yes: 'លុប', cancel: 'បោះបង់', empty: 'គ្មានប្រវត្តិដំណើរការ', noText: 'គ្មានអត្ថបទ',
  },
  settings: {
    title: 'ការកំណត់', modelCache: 'ឃ្លាំងម៉ូដែល', clearModelCache: 'សម្អាតឃ្លាំងម៉ូដែល',
    confirmClearModel: 'លុបម៉ូដែល ONNX ដែលបានរក្សាទុក? នឹងទាញយកឡើងវិញពេលចាប់ផ្តើមបន្ទាប់។',
    clearDone: 'បានសម្អាត',
  },
  info: {
    privacyNotice: 'កម្មវិធីនេះដំណើរការទាំងស្រុងក្នុងកម្មវិធីរុករក។ ឯកសាររូបភាព និងលទ្ធផល OCR មិនត្រូវបានផ្ញើទៅម៉ាស៊ីនមេខាងក្រៅទេ។',
    author: 'បង្កើតដោយ Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'ឃ្លាំង GitHub',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'មានកំហុសកើតឡើង', modelLoad: 'ផ្ទុកម៉ូដែលមិនបាន', ocr: 'កំហុសក្នុងដំណើរការ OCR',
    fileLoad: 'ផ្ទុកឯកសារមិនបាន', clipboardNotSupported: 'មិនអាចចូលប្រើក្ដារតម្បៀតខ្ទាស់',
  },
  tooltip: { dragPageReorder: 'អូសដើម្បីរៀបចំឡើងវិញ' },
}
