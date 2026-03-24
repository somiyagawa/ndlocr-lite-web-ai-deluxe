import { useRef } from 'react'
import { L } from '../../i18n'
import type { Language } from '../../i18n'

interface DirectoryPickerProps {
  onFilesSelected: (files: File[]) => void
  lang: Language
  disabled?: boolean
}

export function DirectoryPicker({ onFilesSelected, lang, disabled = false }: DirectoryPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    const files = inputRef.current?.files
    if (!files) return
    const accepted = Array.from(files).filter(
      (f) => f.type === 'application/pdf' || f.type.startsWith('image/')
    )
    if (accepted.length > 0) onFilesSelected(accepted)
  }

  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={() => !disabled && inputRef.current?.click()}
        disabled={disabled}
      >
        📂 {L(lang, {
          ja: 'フォルダを選択',
          en: 'Select Folder',
          'zh-CN': '选择文件夹',
          'zh-TW': '選擇資料夾',
          ko: '폴더 선택',
          la: 'Involucrum eligere',
          eo: 'Elekti dosierujon',
          es: 'Seleccionar carpeta',
          de: 'Ordner auswählen',
          ar: 'اختر مجلداً',
          hi: 'फ़ोल्डर चुनें',
          ru: 'Выбрать папку',
          el: 'Επιλογή φακέλου',
          syc: 'ܓܒܝ ܣܕܪ'
        })}
      </button>
      <input
        ref={inputRef}
        type="file"
        // @ts-expect-error webkitdirectory is not in standard types
        webkitdirectory=""
        multiple
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  )
}
