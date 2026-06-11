import { Image } from 'lucide-react'
import { FormField } from './FormField'

type ImagePickerFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ImagePickerField({ label, value, onChange }: ImagePickerFieldProps) {
  const uploadImage = (file: File) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result)
      }
    }

    reader.readAsDataURL(file)
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
        Subir imagen
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) uploadImage(file)
          }}
        />
      </label>
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
