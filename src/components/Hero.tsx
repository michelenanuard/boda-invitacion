import { Calendar, MapPin } from 'lucide-react'
import type { WeddingData } from '../types/wedding'
import { Monogram } from './Monogram'

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
    <section id="inicio" className="paper-texture px-5 pb-20 pt-10 sm:px-8 md:pb-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="reveal-soft mx-auto mb-8 flex justify-center lg:hidden">
          <Monogram brideName={data.brideName} groomName={data.groomName} className="h-16 w-16 text-[0.72rem]" />
        </div>

        <div className="fine-frame relative overflow-hidden bg-[#211b17] shadow-[0_34px_110px_rgba(33,27,23,0.16)]">
          <img
            src={data.heroImage}
            alt=""
            className="h-[58svh] min-h-[520px] w-full object-cover opacity-92 sm:h-[72svh] lg:h-[calc(100svh-170px)] lg:min-h-[720px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,27,23,0.1),rgba(33,27,23,0.24)),linear-gradient(90deg,rgba(33,27,23,0.52),transparent_38%,rgba(33,27,23,0.18))]" />

          <div className="absolute inset-x-5 bottom-5 grid gap-5 sm:inset-x-8 sm:bottom-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.5fr)] lg:items-end">
            <div className="reveal-soft max-w-3xl text-center text-[#fffdf8] lg:text-left">
              <p className="mb-5 inline-flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#d7bd83]">
                <span className="h-px w-10 bg-[#d7bd83]" />
                La boda de
              </p>
              <h1 className="font-serif-display text-[clamp(3.35rem,17vw,10.5rem)] font-semibold leading-[0.82] sm:leading-[0.78]">
                <span className="block">{data.brideName}</span>
                <span className="block">&amp; {data.groomName}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[19rem] text-base leading-8 text-[#fffdf8] sm:max-w-[25rem] sm:text-lg lg:mx-0 lg:max-w-xl">
                {data.heroSubtitle}
              </p>
            </div>

            <div className="reveal-soft luxury-card relative mx-auto flex w-full max-w-md flex-col items-center overflow-hidden rounded-[8px] p-6 text-center text-[#211b17] sm:p-8 lg:mr-0">
              <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-[#b88a43]/45 to-transparent" />
              <Monogram brideName={data.brideName} groomName={data.groomName} className="mx-auto h-16 w-16 text-[0.72rem]" />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#b88a43]">
                Invitación formal
              </p>
              <p className="mx-auto mt-4 max-w-[17.5rem] text-center font-serif-display text-2xl font-semibold leading-tight text-[#211b17] sm:max-w-[20rem] sm:text-4xl">
                Te esperamos para celebrar nuestro inicio.
              </p>
              <div className="my-7 h-px w-full bg-[#b88a43]/20" />
              <p className="flex flex-wrap items-center justify-center gap-3 text-center text-xs font-semibold uppercase leading-6 tracking-[0.14em] text-[#394136] sm:text-sm sm:tracking-[0.18em]">
                <Calendar className="h-4 w-4 text-[#b88a43]" aria-hidden="true" />
                {formattedDate}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#6f655d]">{data.ceremony.venue}</p>
            </div>
          </div>
        </div>

        <div className="reveal-soft mx-auto mt-8 flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#rsvp"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#211b17] px-7 py-3 text-sm font-bold text-[#fffdf8] shadow-[0_18px_42px_rgba(33,27,23,0.14)] transition-colors hover:bg-[#394136] sm:w-auto"
          >
            Confirmar asistencia
          </a>
          <a
            href={data.ceremony.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#b88a43]/45 bg-[#fffdf8]/70 px-7 py-3 text-sm font-bold text-[#211b17] transition-colors hover:bg-[#fffdf8] sm:w-auto"
          >
            <MapPin className="h-4 w-4 text-[#b88a43]" aria-hidden="true" />
            Ver ubicación
          </a>
        </div>
      </div>
    </section>
  )
}
