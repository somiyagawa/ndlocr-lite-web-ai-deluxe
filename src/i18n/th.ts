import type { Translations } from './ja'

export const th: Translations = {
  app: {
    title: 'NDL(Kotenseki)OCR-lite Web',
    subtitle: 'เครื่องมือ OCR ภาษาญี่ปุ่นบนเบราว์เซอร์',
  },
  upload: {
    dropzone: 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือก',
    directoryButton: 'เลือกโฟลเดอร์',
    acceptedFormats: 'รูปแบบที่รองรับ: JPG, PNG, PDF',
    startButton: 'เริ่ม OCR',
    clearButton: 'ล้าง',
  },
  progress: {
    initializing: 'กำลังเริ่มต้น...',
    loadingLayoutModel: 'กำลังโหลดโมเดลเลย์เอาต์... {percent}%',
    loadingRecognitionModel: 'กำลังโหลดโมเดลรู้จำ... {percent}%',
    layoutDetection: 'กำลังตรวจจับพื้นที่ข้อความ... {percent}%',
    textRecognition: 'กำลังรู้จำข้อความ ({current}/{total} พื้นที่)',
    readingOrder: 'กำลังจัดลำดับการอ่าน...',
    generatingOutput: 'กำลังสร้างผลลัพธ์...',
    processing: 'กำลังประมวลผล: {current}/{total} ไฟล์',
    done: 'เสร็จสิ้น',
  },
  results: {
    copy: 'คัดลอก',
    download: 'ดาวน์โหลด',
    downloadAll: 'ดาวน์โหลดข้อความทั้งหมด',
    copied: 'คัดลอกแล้ว!',
    noResult: 'ไม่มีผลลัพธ์',
    regions: '{count} พื้นที่',
    processingTime: 'เวลาประมวลผล: {time} วินาที',
  },
  history: {
    title: 'ประวัติ',
    clearCache: 'ล้างแคช',
    confirmClear: 'ลบประวัติการประมวลผลทั้งหมด?',
    yes: 'ลบ',
    cancel: 'ยกเลิก',
    empty: 'ไม่มีประวัติการประมวลผล',
    noText: 'ไม่มีข้อความ',
  },
  settings: {
    title: 'ตั้งค่า',
    modelCache: 'แคชโมเดล',
    clearModelCache: 'ล้างแคชโมเดล',
    confirmClearModel: 'ลบโมเดล ONNX ที่แคชไว้? จะดาวน์โหลดใหม่เมื่อเปิดครั้งต่อไป',
    clearDone: 'ล้างแล้ว',
  },
  info: {
    privacyNotice: 'แอปนี้ทำงานทั้งหมดในเบราว์เซอร์ ไฟล์ภาพและผลลัพธ์ OCR จะไม่ถูกส่งไปยังเซิร์ฟเวอร์ภายนอก',
    author: 'สร้างโดย Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'คลัง GitHub',
  },
  language: {
    switchTo: '日本語',
  },
  error: {
    generic: 'เกิดข้อผิดพลาด',
    modelLoad: 'โหลดโมเดลไม่สำเร็จ',
    ocr: 'เกิดข้อผิดพลาดระหว่างประมวลผล OCR',
    fileLoad: 'โหลดไฟล์ไม่สำเร็จ',
    clipboardNotSupported: 'ไม่สามารถเข้าถึงคลิปบอร์ด',
  },
  tooltip: {
    dragPageReorder: 'ลากเพื่อเรียงลำดับใหม่',
  },
}
