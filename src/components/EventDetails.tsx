import { CalendarHeart, Clock, MapPin, Navigation } from 'lucide-react'
import type { WeddingEvent } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type EventDetailsProps = {
  ceremony: WeddingEvent
  reception: WeddingEvent
}

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <article className="group rounded-[8px] border border-[#e7d8c2] bg-[#fffdf8]/85 p-7 text-left shadow-[0_24px_80px_rgba(33,27,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(33,27,23,0.12)] md:p-8">
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf1df] text-[#b8925d] ring-1 ring-[#e7d8c2]">
        <CalendarHeart size={22} aria-hidden="true" />
      </div>

      <h3 className="font-serif-display text-3xl font-semibold text-[#211b17]">
        {event.title}
      </h3>

      <div className="mt-6 space-y-4 text-[#776b61]">
        <p className="flex items-center gap-3">
          <Clock className="shrink-0 text-[#b8925d]" size={18} aria-hidden="true" />
          <span>{event.time}</span>
        </p>
        <p className="font-semibold text-[#211b17]">{event.venue}</p>
        <p className="flex items-start gap-3 leading-7">
          <MapPin className="mt-1 shrink-0 text-[#b8925d]" size={18} aria-hidden="true" />
          <span>{event.address}</span>
        </p>
      </div>

      <a
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-[#b8925d] px-5 py-3 text-sm font-semibold text-[#211b17] transition hover:bg-[#b8925d] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b8925d] focus:ring-offset-2 focus:ring-offset-[#fffdf8]"
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
    <section id="detalles" className="section-shell py-20 md:py-24">
      <SectionTitle
        eyebrow="Celebración"
        title="Ceremonia y recepción"
        description="Cada momento importante reunido en un itinerario claro para acompañar la celebración."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <EventCard event={ceremony} />
        <EventCard event={reception} />
      </div>
    </section>
  )
}
