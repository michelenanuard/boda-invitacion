import { CalendarDays, ExternalLink, Image, MonitorUp, Palette, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdminEditor } from './hooks/useAdminEditor'

function completionScore(content: ReturnType<typeof useAdminEditor>['draft']) {
  const checks = [
    content.brideName,
    content.groomName,
    content.weddingDate,
    content.heroImage,
    content.ceremony.venue,
    content.reception.venue,
    content.gallery.length > 0 ? 'gallery' : '',
    content.faq.length > 0 ? 'faq' : '',
  ]

  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export function AdminDashboard() {
  const { draft } = useAdminEditor()
  const score = completionScore(draft)

  const quickLinks = [
    { label: 'Editar portada', href: '/admin/hero', icon: Image },
    { label: 'Editar fecha', href: '/admin/general', icon: CalendarDays },
    { label: 'Editar galería', href: '/admin/gallery', icon: Image },
    { label: 'Mensajes en vivo', href: '/admin/live-messages', icon: MonitorUp },
    { label: 'Estilo visual', href: '/admin/theme', icon: Palette },
  ]

  return (
    <div className="grid gap-6">
      <section className="rounded-[8px] bg-[#211b17] p-6 text-white shadow-[0_20px_70px_rgba(33,27,23,0.16)] md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d7bd83]">Bienvenidos</p>
        <h2 className="mt-3 font-serif-display text-5xl font-semibold text-white">
          {draft.coupleDisplayName}
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-stone-200">
          Tu invitación está lista para personalizarse. Completa datos, revisa fotos y guarda los cambios.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[8px] border border-stone-200 bg-white p-6">
          <p className="text-sm font-semibold text-stone-500">Contenido completado</p>
          <p className="mt-3 font-serif-display text-6xl font-semibold text-stone-950">{score}%</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full rounded-full bg-[#b88a43]" style={{ width: `${score}%` }} />
          </div>
        </section>

        <section className="rounded-[8px] border border-stone-200 bg-white p-6">
          <p className="mb-4 text-sm font-bold text-stone-950">Accesos rápidos</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex min-h-20 items-center gap-3 rounded-[8px] border border-stone-200 bg-stone-50 p-4 text-sm font-bold text-stone-800 hover:bg-[#fbf6ec]"
              >
                <link.icon className="h-5 w-5 text-[#b88a43]" />
                {link.label}
              </Link>
            ))}
            <a
              href="/mensajes"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-20 items-center gap-3 rounded-[8px] border border-stone-200 bg-stone-50 p-4 text-sm font-bold text-stone-800 hover:bg-[#fbf6ec]"
            >
              <Send className="h-5 w-5 text-[#b88a43]" />
              Formulario de mensajes
            </a>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-20 items-center gap-3 rounded-[8px] border border-stone-200 bg-stone-50 p-4 text-sm font-bold text-stone-800 hover:bg-[#fbf6ec]"
            >
              <ExternalLink className="h-5 w-5 text-[#b88a43]" />
              Ver invitación
            </a>
          </div>
        </section>
      </div>

      <section className="rounded-[8px] border border-stone-200 bg-white p-6">
        <p className="mb-4 text-sm font-bold text-stone-950">Guía rápida</p>
        <div className="grid gap-3 md:grid-cols-3">
          {['Completa los datos generales', 'Personaliza fotos y textos', 'Abre la pantalla de mensajes'].map((step, index) => (
            <div key={step} className="rounded-[8px] bg-[#fbf6ec] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b88a43]">Paso {index + 1}</p>
              <p className="mt-2 font-semibold text-stone-900">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
