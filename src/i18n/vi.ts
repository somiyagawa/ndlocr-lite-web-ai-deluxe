import type { Translations } from './ja'

export const vi: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'Công cụ OCR tiếng Nhật trên trình duyệt',
  },
  upload: {
    dropzone: 'Kéo thả tệp vào đây, hoặc nhấp để chọn',
    directoryButton: 'Chọn thư mục',
    acceptedFormats: 'Định dạng hỗ trợ: JPG, PNG, PDF',
    startButton: 'Bắt đầu OCR',
    clearButton: 'Xóa',
  },
  progress: {
    initializing: 'Đang khởi tạo...',
    loadingLayoutModel: 'Đang tải mô hình bố cục... {percent}%',
    loadingRecognitionModel: 'Đang tải mô hình nhận dạng... {percent}%',
    layoutDetection: 'Đang phát hiện vùng văn bản... {percent}%',
    textRecognition: 'Đang nhận dạng văn bản ({current}/{total} vùng)',
    readingOrder: 'Đang xử lý thứ tự đọc...',
    generatingOutput: 'Đang tạo kết quả...',
    processing: 'Đang xử lý: {current}/{total} tệp',
    done: 'Hoàn tất',
  },
  results: {
    copy: 'Sao chép',
    download: 'Tải xuống',
    downloadAll: 'Tải toàn bộ văn bản',
    copied: 'Đã sao chép!',
    noResult: 'Không có kết quả',
    regions: '{count} vùng',
    processingTime: 'Thời gian xử lý: {time}s',
  },
  history: {
    title: 'Lịch sử',
    clearCache: 'Xóa bộ nhớ đệm',
    confirmClear: 'Xóa toàn bộ lịch sử xử lý?',
    yes: 'Xóa',
    cancel: 'Hủy',
    empty: 'Không có lịch sử xử lý',
    noText: 'Không có văn bản',
  },
  settings: {
    title: 'Cài đặt',
    modelCache: 'Bộ nhớ đệm mô hình',
    clearModelCache: 'Xóa bộ nhớ đệm mô hình',
    confirmClearModel: 'Xóa các mô hình ONNX đã lưu? Chúng sẽ được tải lại vào lần khởi động tiếp theo.',
    clearDone: 'Đã xóa',
  },
  info: {
    privacyNotice: 'Ứng dụng này chạy hoàn toàn trong trình duyệt. Tệp ảnh và kết quả OCR không được gửi đến bất kỳ máy chủ bên ngoài nào.',
    author: 'Tác giả: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'Kho lưu trữ GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'Đã xảy ra lỗi',
    modelLoad: 'Không thể tải mô hình',
    ocr: 'Lỗi trong quá trình xử lý OCR',
    fileLoad: 'Không thể tải tệp',
    clipboardNotSupported: 'Không thể truy cập bảng tạm',
  },
  tooltip: {
    dragPageReorder: 'Kéo để sắp xếp lại',
  },
}
