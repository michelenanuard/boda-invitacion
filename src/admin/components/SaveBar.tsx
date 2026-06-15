import { CheckCircle2, Save } from 'lucide-react'

type SaveBarProps = {
  isDirty: boolean
  isSaving: boolean
  savedMessage: string
  saveError: string
  onSave: () => void | Promise<void>
}

export function SaveBar({ isDirty, isSaving, savedMessage, saveError, onSave }: SaveBarProps) {
  return (
    <div className="sticky bottom-4 z-30 mx-auto mt-8 flex max-w-3xl items-center justify-between gap-4 rounded-[8px] border border-stone-200 bg-white/95 p-3 shadow-[0_18px_60px_rgba(33,27,23,0.12)] backdrop-blur">
      <div className="text-sm">
        {saveError ? (
          <p className="max-w-md font-semibold text-rose-700">{saveError}</p>
        ) : isDirty ? (
          <p className="font-semibold text-amber-700">Cambios sin guardar</p>
        ) : (
          <p className="inline-flex items-center gap-2 font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {savedMessage || 'Todo guardado'}
          </p>
        )}
      </div>
      <button
        type="button"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#211b17] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-45"
        disabled={!isDirty || isSaving}
        onClick={onSave}
      >
        <Save className="h-4 w-4" />
        {isSaving ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </div>
  )
}
