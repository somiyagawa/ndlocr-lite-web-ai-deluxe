import type { Translations } from './ja'

export const hu: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Japán OCR eszköz a böngészőben' },
  upload: {
    dropzone: 'Húzza ide a fájlokat, vagy kattintson a kiválasztáshoz',
    directoryButton: 'Mappa kiválasztása',
    acceptedFormats: 'Támogatott formátumok: JPG, PNG, PDF',
    startButton: 'OCR indítása',
    clearButton: 'Törlés',
  },
  progress: {
    initializing: 'Inicializálás...', loadingLayoutModel: 'Elrendezési modell betöltése... {percent}%',
    loadingRecognitionModel: 'Felismerési modell betöltése... {percent}%',
    layoutDetection: 'Szövegterületek felismerése... {percent}%',
    textRecognition: 'Szöveg felismerése ({current}/{total} terület)',
    readingOrder: 'Olvasási sorrend feldolgozása...', generatingOutput: 'Kimenet generálása...',
    processing: 'Feldolgozás: {current}/{total} fájl', done: 'Kész',
  },
  results: {
    copy: 'Másolás', download: 'Letöltés', downloadAll: 'Összes szöveg letöltése',
    copied: 'Másolva!', noResult: 'Nincs eredmény', regions: '{count} terület',
    processingTime: 'Feldolgozási idő: {time}mp',
  },
  history: {
    title: 'Előzmények', clearCache: 'Gyorsítótár törlése', confirmClear: 'Minden feldolgozási előzmény törlése?',
    yes: 'Törlés', cancel: 'Mégse', empty: 'Nincsenek feldolgozási előzmények', noText: 'Nincs szöveg',
  },
  settings: {
    title: 'Beállítások', modelCache: 'Modell gyorsítótár', clearModelCache: 'Modell gyorsítótár törlése',
    confirmClearModel: 'Tárolt ONNX modellek törlése? A következő indításkor újra letöltődnek.',
    clearDone: 'Törölve',
  },
  info: {
    privacyNotice: 'Ez az alkalmazás teljes egészében a böngészőben fut. A képfájlok és az OCR eredmények nem kerülnek semmilyen külső szerverre.',
    author: 'Készítette: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'GitHub tárház',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'Hiba történt', modelLoad: 'A modell betöltése sikertelen', ocr: 'Hiba az OCR feldolgozás során',
    fileLoad: 'A fájl betöltése sikertelen', clipboardNotSupported: 'A vágólap nem érhető el',
  },
  tooltip: { dragPageReorder: 'Húzza az átrendezéshez' },
}
