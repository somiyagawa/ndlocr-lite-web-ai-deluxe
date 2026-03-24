import { useRef, useState } from 'react'
import { L } from '../../i18n'
import type { Language } from '../../i18n'

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void
  lang: Language
  disabled?: boolean
}

export function FileDropZone({ onFilesSelected, lang, disabled = false }: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = (files: FileList | null) => {
    if (!files || disabled) return
    const accepted = Array.from(files).filter((f) => {
      if (f.type === 'application/pdf' || f.type.startsWith('image/')) return true
      const ext = f.name.toLowerCase().split('.').pop()
      return ['tif', 'tiff', 'heic', 'heif'].includes(ext ?? '')
    })
    if (accepted.length > 0) onFilesSelected(accepted)
  }

  return (
    <div
      className={`dropzone ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
    >
      <div className="dropzone-icon">📁</div>
      <p className="dropzone-text dropzone-text-desktop">
        {L(lang, {
          ja: 'ここにファイルをドラッグ＆ドロップ、またはクリックして選択',
          en: 'Drag & drop files here, or click to select',
          'zh-CN': '将文件拖放到此处，或点击选择',
          'zh-TW': '將檔案拖放到此處，或點擊選擇',
          ko: '여기에 파일을 드래그 앤 드롭하거나 클릭하여 선택',
          la: 'Fasciculos hic trahe vel preme ut eligas',
          eo: 'Trenu kaj demetu dosierojn ĉi tien aŭ alklaku por elekti',
          es: 'Arrastra y suelta archivos aquí, o haz clic para seleccionar',
          de: 'Dateien hierher ziehen oder klicken zum Auswählen',
          ar: 'اسحب الملفات وأفلتها هنا، أو انقر للاختيار',
          hi: 'फ़ाइलें यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
          ru: 'Перетащите файлы сюда или нажмите для выбора',
          el: 'Σύρετε αρχεία εδώ ή κάντε κλικ για επιλογή',
          syc: 'ܓܪܘܪ ܩ̈ܛܝܡܐ ܠܗܪܟܐ ܐܘ ܕܘܨ ܠܓܒܝܬܐ',
          cop: 'ⲡⲉϩⲣⲁⲧ ⲛⲓϫⲱⲙⲉ ⲡⲁⲓⲙⲁ, ⲏⲣⲉ ⲗⲁⲗⲁⲧ ϩⲓⲛⲁ ⲛⲧⲁⲕ',
          sa: 'यहाँ फलकान् ग्राहयतु या क्लिक्कु करोतु संस्कृतये'
        })}
      </p>
      <p className="dropzone-text dropzone-text-mobile">
        {L(lang, {
          ja: 'タップしてファイルを選択',
          en: 'Tap to select files',
          'zh-CN': '点按以选择文件',
          'zh-TW': '點按以選擇檔案',
          ko: '탭하여 파일 선택',
          la: 'Preme ut fasciculos eligas',
          eo: 'Alpremu por elekti dosierojn',
          es: 'Toca para seleccionar archivos',
          de: 'Tippen zum Auswählen',
          ar: 'اضغط لاختيار الملفات',
          hi: 'फ़ाइलें चुनने के लिए टैप करें',
          ru: 'Нажмите для выбора файлов',
          el: 'Πατήστε για επιλογή αρχείων',
          syc: 'ܕܘܨ ܠܓܒܝ ܩ̈ܛܝܡܐ',
          cop: 'ⲗⲁⲗⲁⲧ ϩⲓⲛⲁ ⲛⲧⲁⲕ ⲛⲓϫⲱⲙⲉ',
          sa: 'अੰ टैप करोतु फलकान् ग्रहणाय'
        })}
      </p>
      <p className="dropzone-formats dropzone-formats-desktop">
        {L(lang, {
          ja: '対応形式: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V で貼り付け可',
          en: 'Supported: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V to paste',
          'zh-CN': '支持格式：JPG, PNG, TIFF, HEIC, PDF · Ctrl+V 粘贴',
          'zh-TW': '支援格式：JPG, PNG, TIFF, HEIC, PDF · Ctrl+V 貼上',
          ko: '지원 형식: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V 붙여넣기',
          la: 'Formae acceptae: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V colle',
          eo: 'Subtenataj formatoj: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V alkroĉu',
          es: 'Formatos: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V para pegar',
          de: 'Unterstützt: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V zum Einfügen',
          ar: 'الصيغ المدعومة: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V للصق',
          hi: 'समर्थित: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V पेस्ट करें',
          ru: 'Форматы: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V для вставки',
          el: 'Υποστηριζόμενα: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V για επικόλληση',
          syc: 'ܛܘ̈ܦܣ ܡܩ̈ܒܠܐ: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V ܠܐܠܨ̈ܩ',
          cop: 'ⲛⲓⲧⲩⲡⲟⲥ ⲛⲉⲕⲟⲡⲓ: JPG, PNG, TIFF, HEIC, PDF · Ctrl+V ⲛϩⲁⲓ',
          sa: 'समर्थितः JPG, PNG, TIFF, HEIC, PDF · Ctrl+V सामग्रीपेऽनयतु'
        })}
      </p>
      <p className="dropzone-formats dropzone-formats-mobile">
        {L(lang, {
          ja: '対応形式: JPG, PNG, TIFF, HEIC, PDF',
          en: 'Supported: JPG, PNG, TIFF, HEIC, PDF',
          'zh-CN': '支持格式：JPG, PNG, TIFF, HEIC, PDF',
          'zh-TW': '支援格式：JPG, PNG, TIFF, HEIC, PDF',
          ko: '지원 형식: JPG, PNG, TIFF, HEIC, PDF',
          la: 'Formae acceptae: JPG, PNG, TIFF, HEIC, PDF',
          eo: 'Subtenataj formatoj: JPG, PNG, TIFF, HEIC, PDF',
          es: 'Formatos: JPG, PNG, TIFF, HEIC, PDF',
          de: 'Unterstützt: JPG, PNG, TIFF, HEIC, PDF',
          ar: 'الصيغ المدعومة: JPG, PNG, TIFF, HEIC, PDF',
          hi: 'समर्थित: JPG, PNG, TIFF, HEIC, PDF',
          ru: 'Форматы: JPG, PNG, TIFF, HEIC, PDF',
          el: 'Υποστηριζόμενα: JPG, PNG, TIFF, HEIC, PDF',
          syc: 'ܛܘ̈ܦܣ ܡܩ̈ܒܠܐ: JPG, PNG, TIFF, HEIC, PDF',
          cop: 'ⲛⲓⲧⲩⲡⲟⲥ ⲛⲉⲕⲟⲡⲓ: JPG, PNG, TIFF, HEIC, PDF',
          sa: 'समर्थितः JPG, PNG, TIFF, HEIC, PDF'
        })}
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/tiff,image/heic,image/heif,.tif,.tiff,.heic,.heif,application/pdf"
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />
    </div>
  )
}
