import type { Translations } from './ja'

export const uk: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'Інструмент японського OCR у браузері',
  },
  upload: {
    dropzone: 'Перетягніть файли сюди або натисніть для вибору',
    directoryButton: 'Вибрати теку',
    acceptedFormats: 'Підтримувані формати: JPG, PNG, PDF',
    startButton: 'Почати OCR',
    clearButton: 'Очистити',
  },
  progress: {
    initializing: 'Ініціалізація...',
    loadingLayoutModel: 'Завантаження моделі макету... {percent}%',
    loadingRecognitionModel: 'Завантаження моделі розпізнавання... {percent}%',
    layoutDetection: 'Виявлення текстових областей... {percent}%',
    textRecognition: 'Розпізнавання тексту ({current}/{total} областей)',
    readingOrder: 'Обробка порядку читання...',
    generatingOutput: 'Генерація результату...',
    processing: 'Обробка: {current}/{total} файлів',
    done: 'Завершено',
  },
  results: {
    copy: 'Копіювати',
    download: 'Завантажити',
    downloadAll: 'Завантажити весь текст',
    copied: 'Скопійовано!',
    noResult: 'Немає результатів',
    regions: '{count} областей',
    processingTime: 'Час обробки: {time}с',
  },
  history: {
    title: 'Історія',
    clearCache: 'Очистити кеш',
    confirmClear: 'Видалити всю історію обробки?',
    yes: 'Видалити',
    cancel: 'Скасувати',
    empty: 'Історія обробки порожня',
    noText: 'Немає тексту',
  },
  settings: {
    title: 'Налаштування',
    modelCache: 'Кеш моделей',
    clearModelCache: 'Очистити кеш моделей',
    confirmClearModel: 'Видалити кешовані моделі ONNX? Вони будуть завантажені знову при наступному запуску.',
    clearDone: 'Очищено',
  },
  info: {
    privacyNotice: 'Цей додаток працює повністю у браузері. Зображення та результати OCR не надсилаються на жодний зовнішній сервер.',
    author: 'Створено: Юта Хасімото (Національний музей японської історії / Національна парламентська бібліотека)',
    githubLink: 'Репозиторій GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'Сталася помилка',
    modelLoad: 'Не вдалося завантажити модель',
    ocr: 'Помилка під час обробки OCR',
    fileLoad: 'Не вдалося завантажити файл',
    clipboardNotSupported: 'Неможливо отримати доступ до буфера обміну',
  },
  tooltip: {
    dragPageReorder: 'Перетягніть для зміни порядку',
  },
}
