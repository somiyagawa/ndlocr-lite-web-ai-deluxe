import type { Translations } from './ja'

export const pl: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'Narzędzie OCR języka japońskiego w przeglądarce',
  },
  upload: {
    dropzone: 'Przeciągnij pliki tutaj lub kliknij, aby wybrać',
    directoryButton: 'Wybierz folder',
    acceptedFormats: 'Obsługiwane formaty: JPG, PNG, PDF',
    startButton: 'Rozpocznij OCR',
    clearButton: 'Wyczyść',
  },
  progress: {
    initializing: 'Inicjalizacja...',
    loadingLayoutModel: 'Ładowanie modelu układu... {percent}%',
    loadingRecognitionModel: 'Ładowanie modelu rozpoznawania... {percent}%',
    layoutDetection: 'Wykrywanie obszarów tekstu... {percent}%',
    textRecognition: 'Rozpoznawanie tekstu ({current}/{total} obszarów)',
    readingOrder: 'Przetwarzanie kolejności czytania...',
    generatingOutput: 'Generowanie wyniku...',
    processing: 'Przetwarzanie: {current}/{total} plików',
    done: 'Gotowe',
  },
  results: {
    copy: 'Kopiuj',
    download: 'Pobierz',
    downloadAll: 'Pobierz cały tekst',
    copied: 'Skopiowano!',
    noResult: 'Brak wyników',
    regions: '{count} obszarów',
    processingTime: 'Czas przetwarzania: {time}s',
  },
  history: {
    title: 'Historia',
    clearCache: 'Wyczyść pamięć podręczną',
    confirmClear: 'Usunąć całą historię przetwarzania?',
    yes: 'Usuń',
    cancel: 'Anuluj',
    empty: 'Brak historii przetwarzania',
    noText: 'Brak tekstu',
  },
  settings: {
    title: 'Ustawienia',
    modelCache: 'Pamięć podręczna modeli',
    clearModelCache: 'Wyczyść pamięć podręczną modeli',
    confirmClearModel: 'Usunąć modele ONNX z pamięci podręcznej? Zostaną pobrane ponownie przy następnym uruchomieniu.',
    clearDone: 'Wyczyszczono',
  },
  info: {
    privacyNotice: 'Ta aplikacja działa w całości w przeglądarce. Pliki graficzne i wyniki OCR nie są wysyłane na żaden zewnętrzny serwer.',
    author: 'Autor: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Repozytorium GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'Wystąpił błąd',
    modelLoad: 'Nie udało się załadować modelu',
    ocr: 'Błąd podczas przetwarzania OCR',
    fileLoad: 'Nie udało się załadować pliku',
    clipboardNotSupported: 'Brak dostępu do schowka',
  },
  tooltip: {
    dragPageReorder: 'Przeciągnij, aby zmienić kolejność',
  },
}
