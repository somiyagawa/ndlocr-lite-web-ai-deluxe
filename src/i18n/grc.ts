import type { Translations } from './ja'

export const grc: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'Ἐργαλεῖον OCR Ἰαπωνικῆς ἐν τῷ περιηγητῇ' },
  upload: {
    dropzone: 'Ἕλκυσον ἀρχεῖα ἐνταῦθα, ἢ πάτησον πρὸς ἐκλογήν',
    directoryButton: 'Ἐκλογὴ φακέλου',
    acceptedFormats: 'Ὑποστηριζόμεναι μορφαί: JPG, PNG, PDF',
    startButton: 'Ἄρξαι OCR',
    clearButton: 'Καθάρισον',
  },
  progress: {
    initializing: 'Ἀρχικοποίησις...', loadingLayoutModel: 'Φόρτωσις μοντέλου διατάξεως... {percent}%',
    loadingRecognitionModel: 'Φόρτωσις μοντέλου ἀναγνωρίσεως... {percent}%',
    layoutDetection: 'Ἀνίχνευσις περιοχῶν κειμένου... {percent}%',
    textRecognition: 'Ἀναγνώρισις κειμένου ({current}/{total} περιοχαί)',
    readingOrder: 'Ἐπεξεργασία τάξεως ἀναγνώσεως...',
    generatingOutput: 'Παραγωγὴ ἀποτελέσματος...',
    processing: 'Ἐπεξεργασία: {current}/{total} ἀρχεῖα', done: 'Ἐτελέσθη',
  },
  results: {
    copy: 'Ἀντίγραφον', download: 'Κατέβασμα', downloadAll: 'Κατέβασμα παντὸς κειμένου',
    copied: 'Ἀντεγράφη!', noResult: 'Οὐδὲν ἀποτέλεσμα', regions: '{count} περιοχαί',
    processingTime: 'Χρόνος ἐπεξεργασίας: {time}δ',
  },
  history: {
    title: 'Ἱστορία', clearCache: 'Καθαρισμὸς κρυφῆς μνήμης',
    confirmClear: 'Διαγραφὴ πάσης ἱστορίας ἐπεξεργασίας;',
    yes: 'Διέγραψον', cancel: 'Ἀκύρωσις', empty: 'Οὐδεμία ἱστορία ἐπεξεργασίας', noText: 'Οὐδὲν κείμενον',
  },
  settings: {
    title: 'Ῥυθμίσεις', modelCache: 'Κρυφὴ μνήμη μοντέλων', clearModelCache: 'Καθαρισμὸς κρυφῆς μνήμης μοντέλων',
    confirmClearModel: 'Διαγραφὴ ἀποθηκευμένων μοντέλων ONNX; Θὰ ἐπαναφορτωθῶσιν ἐν τῇ ἑπομένῃ ἐκκινήσει.',
    clearDone: 'Ἐκαθαρίσθη',
  },
  info: {
    privacyNotice: 'Τοῦτο τὸ πρόγραμμα λειτουργεῖ ἐξ ὁλοκλήρου ἐν τῷ περιηγητῇ. Αἱ εἰκόνες καὶ τὰ ἀποτελέσματα OCR οὐκ ἀποστέλλονται εἰς οὐδένα ἐξωτερικὸν διακομιστήν.',
    author: 'Δημιουργός: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Ἀποθετήριον GitHub',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'Σφάλμα ἐγένετο', modelLoad: 'Ἀπέτυχεν ἡ φόρτωσις τοῦ μοντέλου', ocr: 'Σφάλμα κατὰ τὴν ἐπεξεργασίαν OCR',
    fileLoad: 'Ἀπέτυχεν ἡ φόρτωσις τοῦ ἀρχείου', clipboardNotSupported: 'Ἀδύνατος ἡ πρόσβασις εἰς τὸ πρόχειρον',
  },
  tooltip: { dragPageReorder: 'Ἕλκυσον πρὸς ἀναδιάταξιν' },
}
