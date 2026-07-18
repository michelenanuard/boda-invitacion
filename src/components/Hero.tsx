import { MapPin } from 'lucide-react'
import type { WeddingData } from '../types/wedding'
import { Monogram } from './Monogram'

type HeroProps = {
  data: WeddingData
}

type HeroInvitationCardProps = {
  data: WeddingData
  className?: string
}

function HeroInvitationCard({ data, className = '' }: HeroInvitationCardProps) {
  return (
    <div
      className={`reveal-soft luxury-card relative mx-auto w-full max-w-md flex-col items-center overflow-hidden rounded-[8px] p-5 text-center text-[#211b17] sm:p-8 ${className}`}
    >
      <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-[#b88a43]/45 to-transparent" />
      <Monogram brideName={data.brideName} groomName={data.groomName} className="mx-auto h-16 w-16 text-[0.72rem]" />
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#b88a43]">
        Invitación formal
      </p>
      <p className="mx-auto mt-4 max-w-[17.5rem] text-center font-serif-display text-[1.75rem] font-semibold leading-tight text-[#211b17] sm:max-w-[20rem] sm:text-4xl">
        Será un honor compartir este momento juntos.
      </p>
      <div className="my-7 h-px w-full bg-[#b88a43]/20" />
      <p className="flex max-w-sm items-center justify-center gap-3 text-center text-sm font-semibold leading-6 text-[#394136] sm:text-base">
        <MapPin className="h-4 w-4 shrink-0 text-[#b88a43]" aria-hidden="true" />
        Renaissance Santo Domingo Jaragua Hotel
      </p>
    </div>
  )
}

export function Hero({ data }: HeroProps) {
  return (
    <section id="inicio" className="paper-texture px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:px-8 md:pb-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="reveal-soft mx-auto mb-8 flex justify-center lg:hidden">
          <Monogram brideName={data.brideName} groomName={data.groomName} className="h-16 w-16 text-[0.72rem]" />
        </div>

        <div className="fine-frame relative overflow-hidden bg-[#211b17] shadow-[0_34px_110px_rgba(33,27,23,0.16)]">
          <img
            src={data.heroImage}
            alt=""
            className="h-[70svh] min-h-[460px] w-full object-cover object-center opacity-92 sm:h-[72svh] sm:min-h-[520px] lg:h-[calc(100svh-170px)] lg:min-h-[720px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,27,23,0.08),rgba(33,27,23,0.42)),linear-gradient(90deg,rgba(33,27,23,0.48),transparent_48%,rgba(33,27,23,0.16))]" />

          <div className="absolute inset-x-4 bottom-6 grid gap-4 sm:inset-x-8 sm:bottom-8 sm:gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.5fr)] lg:items-end">
            <div className="reveal-soft max-w-3xl text-center text-[#fffdf8]">
              <p className="mb-4 inline-flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#d7bd83] sm:mb-5 sm:tracking-[0.32em]">
                <span className="h-px w-8 bg-[#d7bd83] sm:w-10" />
                La boda de
              </p>
              <h1 className="break-words font-serif-display text-[clamp(3rem,16vw,10.5rem)] font-semibold leading-[0.86] sm:leading-[0.78]">
                <span className="block">{data.brideName}</span>
                <span className="block">&amp; {data.groomName}</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[20rem] text-base leading-7 text-[#fffdf8] sm:mt-6 sm:max-w-[25rem] sm:text-lg sm:leading-8 lg:max-w-xl">
                {data.heroSubtitle}
              </p>
            </div>

            <HeroInvitationCard data={data} className="hidden lg:mr-0 lg:flex" />
          </div>
        </div>

        <HeroInvitationCard data={data} className="mt-5 flex lg:hidden" />

        <div className="reveal-soft mx-auto mt-7 flex max-w-xl flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
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
