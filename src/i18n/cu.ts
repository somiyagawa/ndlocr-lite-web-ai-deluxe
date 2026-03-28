import type { Translations } from './ja'

export const cu: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Ꙗпоньско OCR ѡрѫдиѥ въ обозрѣватели' },
  upload: {
    dropzone: 'Привлѣци дѣла сѣмо, или кликни да избереши',
    directoryButton: 'Избери папъкѫ',
    acceptedFormats: 'Подьдрьжаѥмыѩ форматы: JPG, PNG, PDF',
    startButton: 'Начьни OCR',
    clearButton: 'Очисти',
  },
  progress: {
    initializing: 'Начинаѥтъ сѧ...', loadingLayoutModel: 'Нагрѫжаѥтъ сѧ модель расположениꙗ... {percent}%',
    loadingRecognitionModel: 'Нагрѫжаѥтъ сѧ модель распознаваниꙗ... {percent}%',
    layoutDetection: 'Ѡбрѣтаѥтъ области текста... {percent}%',
    textRecognition: 'Распознаваѥтъ текстъ ({current}/{total} областии)',
    readingOrder: 'Ѡбрабатываѥтъ порѧдъкъ чьтениꙗ...', generatingOutput: 'Порождаѥтъ изводъ...',
    processing: 'Ѡбрабатываѥтъ: {current}/{total} дѣлъ', done: 'Съвръшено',
  },
  results: {
    copy: 'Преписати', download: 'Сънѧти', downloadAll: 'Сънѧти вьсь текстъ',
    copied: 'Преписано!', noResult: 'Нѣсть извода', regions: '{count} областии',
    processingTime: 'Врѣмѧ ѡбработъки: {time}с',
  },
  history: {
    title: 'Историꙗ', clearCache: 'Очисти кешь', confirmClear: 'Истребити вьсѭ историѭ?',
    yes: 'Истребити', cancel: 'Ѿложити', empty: 'Нѣсть истории', noText: 'Нѣсть текста',
  },
  settings: {
    title: 'Оустроениꙗ', modelCache: 'Кешь моделии', clearModelCache: 'Очисти кешь моделии',
    confirmClearModel: 'Истребити ONNX модели из кеша? Паки сънимѫтъ сѧ при слѣдьнѣмь начѧтии.',
    clearDone: 'Очищено',
  },
  info: {
    privacyNotice: 'Сиꙗ программа дѣиствуѥтъ вьсецѣло въ обозрѣватели. Ѡбразы и извод OCR не посылаѭтъ сѧ на вънѣшьнь слꙋжитель.',
    author: 'Сътвори: Yuta Hashimoto',
    githubLink: 'Хранилище GitHub',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'Погрѣшьность бысть', modelLoad: 'Не можетъ нагрѫзити модель', ocr: 'Погрѣшьность въ OCR',
    fileLoad: 'Не можетъ нагрѫзити дѣло', clipboardNotSupported: 'Не можетъ достигнѫти буфера',
  },
  tooltip: { dragPageReorder: 'Привлѣци да прѣмѣниши порѧдъкъ' },
}
