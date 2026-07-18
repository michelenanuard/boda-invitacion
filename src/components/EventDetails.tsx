import { CalendarHeart, Clock3, GlassWater, MapPin, Navigation } from 'lucide-react'
import type { WeddingEvent } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type EventDetailsProps = { ceremony: WeddingEvent; reception: WeddingEvent }

export function EventDetails({ ceremony, reception }: EventDetailsProps) {
  return (
    <section id="detalles" className="section-band">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Celebración"
          title="Ceremonia y recepción"
          description="Te esperamos para compartir cada instante de nuestra celebración."
        />

        <article className="luxury-card relative mx-auto max-w-4xl overflow-hidden rounded-[8px] p-5 sm:p-8 md:p-10 lg:p-12">
          <span className="pointer-events-none absolute right-5 top-4 font-serif-display text-6xl font-semibold leading-none text-[#b88a43]/10 sm:right-8 sm:top-6 sm:text-7xl">
            01
          </span>

          <header className="relative max-w-2xl border-b border-[#b88a43]/18 pb-7 sm:pb-9">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#b88a43]/25 bg-[#f3eadb] text-[#b88a43] shadow-sm">
              <CalendarHeart size={25} aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b88a43]">Nuestro gran día</p>
            <h3 className="mt-3 max-w-xl font-serif-display text-4xl font-semibold leading-tight text-[#211b17] sm:text-5xl">
              Ceremonia y recepción
            </h3>
          </header>

          <div className="grid gap-5 py-7 sm:gap-6 sm:py-9 md:grid-cols-2">
            <section className="rounded-[8px] border border-[#b88a43]/16 bg-[#fffdf8]/72 p-5 sm:p-6" aria-labelledby="ceremonia-title">
              <div className="flex items-center gap-3 text-[#b88a43]">
                <Clock3 size={20} aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Ceremonia</p>
              </div>
              <p className="mt-5 inline-flex rounded-full bg-[#f3eadb] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#394136]">
                {ceremony.time}
              </p>
              <h4 id="ceremonia-title" className="mt-5 font-serif-display text-3xl font-semibold leading-tight text-[#211b17]">
                {ceremony.venue}
              </h4>
            </section>

            <section className="rounded-[8px] border border-[#b88a43]/16 bg-[#fffdf8]/72 p-5 sm:p-6" aria-labelledby="recepcion-title">
              <div className="flex items-center gap-3 text-[#b88a43]">
                <GlassWater size={20} aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Recepción</p>
              </div>
              <h4 id="recepcion-title" className="mt-5 font-serif-display text-3xl font-semibold leading-tight text-[#211b17]">
                {reception.venue}
              </h4>
              <p className="mt-4 max-w-sm text-base leading-7 text-[#6f655d]">
                Hemos preparado cada momento con amor, desde nuestro &quot;para siempre&quot; hasta el último brindis.
              </p>
            </section>
          </div>

          <div className="grid gap-5 border-t border-[#b88a43]/18 pt-7 sm:pt-9 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f3eadb] text-[#b88a43]">
                  <MapPin size={19} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b88a43]">Ubicación</p>
                  <p className="mt-2 max-w-2xl text-base leading-7 text-[#6f655d] sm:text-lg sm:leading-8">{ceremony.address}</p>
                </div>
              </div>
              {ceremony.note ? (
                <p className="max-w-2xl rounded-[8px] border-l-2 border-[#b88a43] bg-[#f3eadb]/60 px-5 py-4 text-base leading-7 text-[#394136]">
                  {ceremony.note}
                </p>
              ) : null}
            </div>

            <a
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#b88a43] bg-[#fffdf8] px-6 py-3 text-sm font-semibold text-[#211b17] transition-colors duration-200 hover:bg-[#b88a43] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b88a43] focus:ring-offset-2 focus:ring-offset-[#fffdf8] md:w-auto"
              href={ceremony.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Navigation size={17} aria-hidden="true" />
              Abrir en Google Maps
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
