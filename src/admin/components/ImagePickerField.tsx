import { Image } from 'lucide-react'
import { useState } from 'react'
import { FormField } from './FormField'
import { prepareImageForStorage } from '../utils/imageUpload'

type ImagePickerFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ImagePickerField({ label, value, onChange }: ImagePickerFieldProps) {
  const [uploadError, setUploadError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const uploadImage = async (file: File) => {
    setUploadError('')
    setIsProcessing(true)

    try {
      onChange(await prepareImageForStorage(file))
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'No pudimos procesar esta imagen.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <FormField
        label={label}
        value={value}
        onChange={onChange}
        type="url"
        helperText="Puedes pegar una URL o subir una imagen desde este equipo. En producción conviene usar almacenamiento real."
      />
      <label className="mt-3 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border border-[#b88a43]/35 bg-[#fffdf8] px-4 text-sm font-bold text-[#211b17]">
        {isProcessing ? 'Procesando imagen...' : 'Subir imagen'}
        <input
          className="hidden"
          type="file"
          accept="image/*"
          disabled={isProcessing}
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) void uploadImage(file)
          }}
        />
      </label>
      {uploadError ? <p className="mt-2 text-xs leading-5 text-rose-600">{uploadError}</p> : null}
      <div className="mt-3 overflow-hidden rounded-[8px] border border-stone-200 bg-stone-50">
        {value ? (
          <img src={value} alt="" className="h-56 w-full object-cover" />
        ) : (
          <div className="grid h-40 place-items-center text-stone-400">
            <Image className="h-8 w-8" />
          </div>
        )}
      </div>
    </div>
  )
}
