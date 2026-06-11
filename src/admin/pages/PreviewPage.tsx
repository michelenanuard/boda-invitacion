import { ExternalLink } from 'lucide-react'
import { useAdminEditor } from '../hooks/useAdminEditor'

export function PreviewPage() {
  const { draft } = useAdminEditor()

  return (
    <div className="grid gap-6">
      <section className="rounded-[8px] border border-stone-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-sans text-xl font-bold text-stone-950">Vista previa rápida</h2>
            <p className="mt-1 text-sm text-stone-500">
              Guarda los cambios para verlos reflejados en la invitación pública.
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#211b17] px-5 text-sm font-bold text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir invitación
          </a>
        </div>
      </section>

      <section className="overflow-hidden rounded-[8px] border border-stone-200 bg-white shadow-[0_16px_50px_rgba(33,27,23,0.06)]">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <img src={draft.heroImage} alt="" className="h-80 w-full object-cover md:h-full" />
          <div className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b88a43]">Portada</p>
            <h3 className="mt-3 font-serif-display text-5xl font-semibold leading-none text-stone-950">
              {draft.coupleDisplayName}
            </h3>
            <p className="mt-4 leading-8 text-stone-600">{draft.heroSubtitle}</p>
            <div className="mt-6 rounded-[8px] bg-[#fbf6ec] p-4">
              <p className="font-semibold text-stone-950">{draft.displayDate}</p>
              <p className="mt-1 text-sm text-stone-600">{draft.ceremony.venue}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

