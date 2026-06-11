import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import type { WeddingData } from '../types/wedding'

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
    <footer className="border-t border-[#e7d8c2] bg-[#211b17] px-4 py-14 text-[#fbf7ef]">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8bf97]">
            Gracias por acompañarnos
          </p>
          <h2 className="mt-4 font-serif-display text-4xl font-semibold leading-tight text-[#fffdf8] md:text-5xl">
            {data.coupleDisplayName}
          </h2>
          <p className="mt-4 text-[#d8cdbf]">{data.bride.name} & {data.groom.name}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d8bf97]">
            Contacto
          </h3>
          <div className="mt-5 space-y-4 text-sm text-[#d8cdbf]">
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d8bf97]">
            Links rápidos
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-[#d8cdbf]">
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
