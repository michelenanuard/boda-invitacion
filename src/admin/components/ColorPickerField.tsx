type ColorPickerFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorPickerField({ label, value, onChange }: ColorPickerFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-stone-800">{label}</span>
      <div className="flex items-center gap-3 rounded-[8px] border border-stone-200 bg-white p-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-14 rounded border border-stone-200"
          type="color"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 px-2 text-sm text-stone-800 outline-none"
          type="text"
        />
      </div>
    </label>
  )
}
