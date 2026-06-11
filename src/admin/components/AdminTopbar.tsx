import { ExternalLink, Save } from 'lucide-react'

type AdminTopbarProps = {
  title: string
  isDirty: boolean
  onSave: () => void
}

export function AdminTopbar({ title, isDirty, onSave }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#f8f3ea]/90 px-5 py-4 backdrop-blur md:px-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b88a43]">Administrador</p>
          <h1 className="font-sans text-2xl font-bold text-stone-950">{title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {isDirty ? (
            <span className="inline-flex min-h-10 items-center rounded-full bg-amber-50 px-4 text-sm font-semibold text-amber-800">
              Cambios sin guardar
            </span>
          ) : null}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-800"
          >
            <ExternalLink className="h-4 w-4" />
            Ver invitación
          </a>
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#211b17] px-4 text-sm font-bold text-white disabled:opacity-45"
            disabled={!isDirty}
            onClick={onSave}
          >
            <Save className="h-4 w-4" />
            Guardar cambios
          </button>
        </div>
      </div>
    </header>
  )
}
