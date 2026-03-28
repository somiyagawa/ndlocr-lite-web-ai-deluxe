import type { Translations } from './ja'

export const cs: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Japonský OCR nástroj v prohlížeči' },
  upload: {
    dropzone: 'Přetáhněte soubory sem, nebo klikněte pro výběr',
    directoryButton: 'Vybrat složku',
    acceptedFormats: 'Podporované formáty: JPG, PNG, PDF',
    startButton: 'Spustit OCR',
    clearButton: 'Vymazat',
  },
  progress: {
    initializing: 'Inicializace...', loadingLayoutModel: 'Načítání modelu rozvržení... {percent}%',
    loadingRecognitionModel: 'Načítání modelu rozpoznávání... {percent}%',
    layoutDetection: 'Detekce textových oblastí... {percent}%',
    textRecognition: 'Rozpoznávání textu ({current}/{total} oblastí)',
    readingOrder: 'Zpracování pořadí čtení...', generatingOutput: 'Generování výstupu...',
    processing: 'Zpracování: {current}/{total} souborů', done: 'Hotovo',
  },
  results: {
    copy: 'Kopírovat', download: 'Stáhnout', downloadAll: 'Stáhnout veškerý text',
    copied: 'Zkopírováno!', noResult: 'Žádné výsledky', regions: '{count} oblastí',
    processingTime: 'Doba zpracování: {time}s',
  },
  history: {
    title: 'Historie', clearCache: 'Vymazat mezipaměť', confirmClear: 'Smazat celou historii zpracování?',
    yes: 'Smazat', cancel: 'Zrušit', empty: 'Žádná historie zpracování', noText: 'Žádný text',
  },
  settings: {
    title: 'Nastavení', modelCache: 'Mezipaměť modelů', clearModelCache: 'Vymazat mezipaměť modelů',
    confirmClearModel: 'Smazat uložené modely ONNX? Při příštím spuštění budou znovu staženy.',
    clearDone: 'Vymazáno',
  },
  info: {
    privacyNotice: 'Tato aplikace běží zcela v prohlížeči. Obrazové soubory a výsledky OCR nejsou odesílány na žádný externí server.',
    author: 'Vytvořil: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Repozitář GitHub',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'Došlo k chybě', modelLoad: 'Nepodařilo se načíst model', ocr: 'Chyba při zpracování OCR',
    fileLoad: 'Nepodařilo se načíst soubor', clipboardNotSupported: 'Nelze přistupovat ke schránce',
  },
  tooltip: { dragPageReorder: 'Přetáhněte pro změnu pořadí' },
}
