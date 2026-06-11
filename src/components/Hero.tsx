import { Calendar, Heart, MapPin } from 'lucide-react'
import type { WeddingData } from '../types/wedding'

type HeroProps = {
  data: WeddingData
}

function formatWeddingDate(date: string, time: string) {
  const parsedDate = new Date(`${date}T${time}`)

  if (Number.isNaN(parsedDate.getTime())) {
    return [date, time].filter(Boolean).join(' · ')
  }

  return new Intl.DateTimeFormat('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(parsedDate)
}

export function Hero({ data }: HeroProps) {
  const formattedDate = data.displayDate || formatWeddingDate(data.weddingDate, data.weddingTime)

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-stone-950 px-5 py-28 text-white sm:px-8"
    >
      <img
        src={data.heroImage}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-stone-950/55" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-stone-950/75 to-transparent" />

      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.24em] text-rose-50 backdrop-blur">
          <Heart className="h-4 w-4 fill-rose-200 text-rose-200" aria-hidden="true" />
          La boda de
        </p>
        <h1 className="mx-auto max-w-4xl font-serif-display text-5xl font-semibold leading-tight text-white sm:text-7xl lg:text-8xl">
          {data.heroTitle}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-100 sm:text-xl">
          {data.heroSubtitle}
        </p>
        <p className="mt-8 inline-flex items-center gap-3 text-base font-semibold text-rose-50 sm:text-lg">
          <Calendar className="h-5 w-5" aria-hidden="true" />
          <span>{formattedDate}</span>
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#rsvp"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-stone-950 shadow-xl shadow-stone-950/20 transition-colors hover:bg-rose-50 sm:w-auto"
          >
            Confirmar asistencia
          </a>
          <a
            href={data.ceremony.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20 sm:w-auto"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Ver ubicación
          </a>
        </div>
      </div>
    </section>
  )
}
