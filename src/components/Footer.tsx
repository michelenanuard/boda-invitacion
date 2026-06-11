import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import type { WeddingData } from '../types/wedding'
import { Monogram } from './Monogram'

type FooterProps = {
  data: WeddingData
}

const quickLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#detalles', label: 'Detalles' },
  { href: '#historia', label: 'Historia' },
  { href: '#rsvp', label: 'RSVP' },
]

export function Footer({ data }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-[#b88a43]/18 bg-[#211b17] px-5 py-16 text-[#fbf6ec] sm:px-8 md:py-20">
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-[#d7bd83]/45 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr_0.8fr]">
        <div>
          <Monogram brideName={data.brideName} groomName={data.groomName} className="mb-7 h-16 w-16 text-[0.72rem]" />
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d7bd83]">
            Gracias por acompañarnos
          </p>
          <h2 className="mt-5 font-serif-display text-5xl font-semibold leading-[0.95] text-[#fffdf8] md:text-6xl">
            {data.coupleDisplayName}
          </h2>
          <p className="mt-5 max-w-sm leading-8 text-[#d8cdbf]">
            {data.bride.name} & {data.groom.name}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7bd83]">
            Contacto
          </h3>
          <div className="mt-6 space-y-4 text-sm text-[#d8cdbf]">
            <p className="flex items-center gap-3">
              <CalendarDays size={17} aria-hidden="true" />
              <span>{data.displayDate}</span>
            </p>
            <p className="flex items-center gap-3">
              <Mail size={17} aria-hidden="true" />
              <a className="transition hover:text-white" href={`mailto:${data.contact.email}`}>
                {data.contact.email}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone size={17} aria-hidden="true" />
              <a className="transition hover:text-white" href={`tel:${data.contact.phone}`}>
                {data.contact.phone}
              </a>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
              <span>{data.contact.location}</span>
            </p>
          </div>
        </div>

        <nav aria-label="Links rápidos">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7bd83]">
            Links rápidos
          </h3>
          <div className="mt-6 grid gap-3 text-sm text-[#d8cdbf]">
            {quickLinks.map((link) => (
              <a key={link.href} className="transition hover:text-white" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  )
}
