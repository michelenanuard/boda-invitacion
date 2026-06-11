type FormFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  helperText?: string
  error?: string
  type?: 'text' | 'textarea' | 'date' | 'time' | 'number' | 'url' | 'email' | 'tel'
  placeholder?: string
}

export function FormField({
  label,
  value,
  onChange,
  helperText,
  error,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  const className =
    'w-full rounded-[8px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-[#b88a43] focus:ring-4 focus:ring-[#b88a43]/10'

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-stone-800">{label}</span>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${className} min-h-28 resize-y`}
          placeholder={placeholder}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
          placeholder={placeholder}
          type={type}
        />
      )}
      {helperText ? <span className="mt-1 block text-xs leading-5 text-stone-500">{helperText}</span> : null}
      {error ? <span className="mt-1 block text-xs font-semibold text-rose-700">{error}</span> : null}
    </label>
  )
}
