import { CalendarHeart, Clock, MapPin, Navigation } from 'lucide-react'
import type { WeddingEvent } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type EventDetailsProps = {
  ceremony: WeddingEvent
  reception: WeddingEvent
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  return (
    <article className="luxury-card group relative overflow-hidden rounded-[8px] p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(33,27,23,0.13)] sm:p-7 md:p-9">
      <div className="absolute right-5 top-5 font-serif-display text-6xl font-semibold leading-none text-[#b88a43]/10 sm:right-6 sm:text-7xl">
        0{index + 1}
      </div>
      <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#b88a43]/20 bg-[#f3eadb] text-[#b88a43]">
        <CalendarHeart size={24} aria-hidden="true" />
      </div>

      <h3 className="break-words font-serif-display text-3xl font-semibold text-[#211b17] sm:text-4xl">
        {event.title}
      </h3>

      <div className="mt-7 space-y-4 text-[#6f655d]">
        <p className="flex min-w-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#394136] sm:tracking-[0.16em]">
          <Clock className="shrink-0 text-[#b88a43]" size={18} aria-hidden="true" />
          <span className="min-w-0 break-words">{event.time}</span>
        </p>
        <p className="break-words font-serif-display text-2xl font-semibold leading-tight text-[#211b17]">
          {event.venue}
        </p>
        <p className="flex min-w-0 items-start gap-3 leading-7">
          <MapPin className="mt-1 shrink-0 text-[#b88a43]" size={18} aria-hidden="true" />
          <span className="min-w-0 break-words">{event.address}</span>
        </p>
        {event.note ? <p className="border-l border-[#b88a43]/35 pl-4 leading-7">{event.note}</p> : null}
      </div>

      <a
        className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#b88a43] px-5 py-3 text-sm font-semibold text-[#211b17] transition hover:bg-[#b88a43] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b88a43] focus:ring-offset-2 focus:ring-offset-[#fffdf8] sm:w-auto"
        href={event.mapUrl}
        target="_blank"
        rel="noreferrer"
      >
        <Navigation size={16} aria-hidden="true" />
        Google Maps
      </a>
    </article>
  )
}

export function EventDetails({ ceremony, reception }: EventDetailsProps) {
  return (
    <section id="detalles" className="section-band">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Celebración"
          title="Ceremonia y recepción"
          description="Un itinerario sobrio y claro para que cada invitado llegue con calma a los momentos principales."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <EventCard event={ceremony} index={0} />
          <EventCard event={reception} index={1} />
        </div>
      </div>
    </section>
  )
}
