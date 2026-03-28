import type { Translations } from './ja'

export const pt: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'Ferramenta de OCR japonês no navegador',
  },
  upload: {
    dropzone: 'Arraste ficheiros para aqui, ou clique para selecionar',
    directoryButton: 'Selecionar pasta',
    acceptedFormats: 'Formatos suportados: JPG, PNG, PDF',
    startButton: 'Iniciar OCR',
    clearButton: 'Limpar',
  },
  progress: {
    initializing: 'A inicializar...',
    loadingLayoutModel: 'A carregar modelo de layout... {percent}%',
    loadingRecognitionModel: 'A carregar modelo de reconhecimento... {percent}%',
    layoutDetection: 'A detetar áreas de texto... {percent}%',
    textRecognition: 'A reconhecer texto ({current}/{total} áreas)',
    readingOrder: 'A processar ordem de leitura...',
    generatingOutput: 'A gerar saída...',
    processing: 'A processar: {current}/{total} ficheiros',
    done: 'Concluído',
  },
  results: {
    copy: 'Copiar',
    download: 'Transferir',
    downloadAll: 'Transferir todo o texto',
    copied: 'Copiado!',
    noResult: 'Sem resultados',
    regions: '{count} áreas',
    processingTime: 'Tempo de processamento: {time}s',
  },
  history: {
    title: 'Histórico',
    clearCache: 'Limpar cache',
    confirmClear: 'Eliminar todo o histórico de processamento?',
    yes: 'Eliminar',
    cancel: 'Cancelar',
    empty: 'Sem histórico de processamento',
    noText: 'Sem texto',
  },
  settings: {
    title: 'Definições',
    modelCache: 'Cache de modelos',
    clearModelCache: 'Limpar cache de modelos',
    confirmClearModel: 'Eliminar modelos ONNX em cache? Serão transferidos novamente no próximo arranque.',
    clearDone: 'Limpo',
  },
  info: {
    privacyNotice: 'Esta aplicação funciona inteiramente no navegador. As imagens e os resultados OCR não são enviados para nenhum servidor externo.',
    author: 'Criado por Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Repositório GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'Ocorreu um erro',
    modelLoad: 'Falha ao carregar o modelo',
    ocr: 'Erro durante o processamento OCR',
    fileLoad: 'Falha ao carregar o ficheiro',
    clipboardNotSupported: 'Não é possível aceder à área de transferência',
  },
  tooltip: {
    dragPageReorder: 'Arrastar para reordenar',
  },
}
