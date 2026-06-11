import { CalendarHeart, Clock, MapPin, Navigation } from 'lucide-react'
import type { WeddingEvent } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type EventDetailsProps = {
  ceremony: WeddingEvent
  reception: WeddingEvent
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  return (
    <article className="luxury-card group relative overflow-hidden rounded-[8px] p-7 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(33,27,23,0.13)] md:p-9">
      <div className="absolute right-6 top-5 font-serif-display text-7xl font-semibold leading-none text-[#b88a43]/10">
        0{index + 1}
      </div>
      <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#b88a43]/20 bg-[#f3eadb] text-[#b88a43]">
        <CalendarHeart size={24} aria-hidden="true" />
      </div>

      <h3 className="font-serif-display text-4xl font-semibold text-[#211b17]">
        {event.title}
      </h3>

      <div className="mt-7 space-y-4 text-[#6f655d]">
        <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#394136]">
          <Clock className="shrink-0 text-[#b88a43]" size={18} aria-hidden="true" />
          <span>{event.time}</span>
        </p>
        <p className="font-serif-display text-2xl font-semibold leading-tight text-[#211b17]">
          {event.venue}
        </p>
        <p className="flex items-start gap-3 leading-7">
          <MapPin className="mt-1 shrink-0 text-[#b88a43]" size={18} aria-hidden="true" />
          <span>{event.address}</span>
        </p>
        {event.note ? <p className="border-l border-[#b88a43]/35 pl-4 leading-7">{event.note}</p> : null}
      </div>

      <a
        className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#b88a43] px-5 py-3 text-sm font-semibold text-[#211b17] transition hover:bg-[#b88a43] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b88a43] focus:ring-offset-2 focus:ring-offset-[#fffdf8]"
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
