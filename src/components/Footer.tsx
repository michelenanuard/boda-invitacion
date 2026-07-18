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

function getWhatsAppUrl(phone: string) {
  const normalizedPhone = phone.replace(/\D/g, '')
  return `https://wa.me/${normalizedPhone}`
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-[#b88a43]/18 bg-[#211b17] px-4 py-14 text-center text-[#fbf6ec] sm:px-6 sm:py-16 md:px-8 md:py-20 md:text-left">
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-[#d7bd83]/45 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr_0.8fr]">
        <div>
          <Monogram brideName={data.brideName} groomName={data.groomName} className="mx-auto mb-7 h-16 w-16 text-[0.72rem] md:mx-0" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7bd83] sm:tracking-[0.32em]">
            Gracias por acompañarnos
          </p>
          <h2 className="mt-5 break-words font-serif-display text-4xl font-semibold leading-[0.95] text-[#fffdf8] sm:text-5xl md:text-6xl">
            {data.coupleDisplayName}
          </h2>
          <p className="mx-auto mt-5 max-w-sm break-words leading-8 text-[#d8cdbf] md:mx-0">
            {data.bride.name} & {data.groom.name}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7bd83]">
            Contacto
          </h3>
          <div className="mt-6 space-y-3 text-sm text-[#d8cdbf]">
            <p className="flex min-w-0 items-center justify-center gap-3 md:justify-start">
              <CalendarDays size={17} aria-hidden="true" />
              <span className="min-w-0 break-words">{data.displayDate}</span>
            </p>
            <p className="flex min-w-0 items-center justify-center gap-3 md:justify-start">
              <Mail size={17} aria-hidden="true" />
              <a className="min-w-0 break-words transition hover:text-white" href={`mailto:${data.contact.email}`}>
                {data.contact.email}
              </a>
            </p>
            <p className="flex min-w-0 items-center justify-center gap-3 md:justify-start">
              <Phone size={17} aria-hidden="true" />
              <a
                className="inline-flex min-h-11 items-center transition hover:text-white"
                href={getWhatsAppUrl(data.contact.phone)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Contactar por WhatsApp al ${data.contact.phone}`}
              >
                {data.contact.phone}
              </a>
            </p>
            <p className="flex min-w-0 items-start justify-center gap-3 md:justify-start">
              <MapPin className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
              <span className="min-w-0 break-words">{data.contact.location}</span>
            </p>
          </div>
        </div>

        <nav aria-label="Links rápidos">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7bd83]">
            Links rápidos
          </h3>
          <div className="mt-6 grid gap-2 text-sm text-[#d8cdbf]">
            {quickLinks.map((link) => (
              <a key={link.href} className="inline-flex min-h-11 items-center justify-center transition hover:text-white md:justify-start" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          {data.socialLinks.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7bd83]">
                Redes
              </h3>
              <div className="mt-4 grid gap-2 text-sm text-[#d8cdbf]">
                {data.socialLinks.map((link) => (
                  <a key={link.id} className="inline-flex min-h-11 items-center justify-center transition hover:text-white md:justify-start" href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </nav>
      </div>
    </footer>
  )
}
