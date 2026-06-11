import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Heading, Italic } from 'lucide-react'
import { useState } from 'react'

type TextEditorFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  helperText?: string
}

type TextAlign = 'left' | 'center' | 'right' | 'justify'

function wrapSelection(value: string, wrapper: string) {
  return `${wrapper}${value}${wrapper}`
}

export function TextEditorField({ label, value, onChange, helperText }: TextEditorFieldProps) {
  const [align, setAlign] = useState<TextAlign>('left')

  const tools = [
    { label: 'Negrita', icon: Bold, action: () => onChange(wrapSelection(value, '**')) },
    { label: 'Cursiva', icon: Italic, action: () => onChange(wrapSelection(value, '*')) },
    { label: 'Título', icon: Heading, action: () => onChange(`# ${value}`) },
  ]

  const alignTools = [
    { label: 'Izquierda', icon: AlignLeft, value: 'left' as const },
    { label: 'Centro', icon: AlignCenter, value: 'center' as const },
    { label: 'Derecha', icon: AlignRight, value: 'right' as const },
    { label: 'Justificado', icon: AlignJustify, value: 'justify' as const },
  ]

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-stone-800">{label}</span>
      <div className="mb-2 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-stone-200 bg-white px-3 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            onClick={tool.action}
          >
            <tool.icon className="h-4 w-4" />
            {tool.label}
          </button>
        ))}
        {alignTools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-stone-700 ${
              align === tool.value ? 'border-[#b88a43] bg-[#fbf6ec]' : 'border-stone-200 bg-white'
            }`}
            aria-label={tool.label}
            onClick={() => setAlign(tool.value)}
          >
            <tool.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-32 w-full resize-y rounded-[8px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-[#b88a43] focus:ring-4 focus:ring-[#b88a43]/10"
      />
      {helperText ? <p className="mt-1 text-xs leading-5 text-stone-500">{helperText}</p> : null}
      <div className="mt-3 rounded-[8px] border border-dashed border-stone-200 bg-stone-50 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Vista previa</p>
        <p className="whitespace-pre-line text-sm leading-7 text-stone-800" style={{ textAlign: align }}>
          {value || 'Aquí aparecerá una vista previa del texto.'}
        </p>
      </div>
    </div>
  )
}
