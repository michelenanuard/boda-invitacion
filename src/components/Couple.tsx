import type { PersonProfile } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type CoupleProps = {
  bride: PersonProfile
  groom: PersonProfile
}

function ProfileCard({ person }: { person: PersonProfile }) {
  return (
    <article className="luxury-card overflow-hidden rounded-[8px] text-left">
      <div className="aspect-[4/5] overflow-hidden bg-[#f3eadb]">
        <img
          className="h-full w-full object-cover transition duration-700 hover:scale-105"
          src={person.image}
          alt={person.name}
        />
      </div>
      <div className="p-5 sm:p-7 md:p-9">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#b88a43] sm:tracking-[0.26em]">
          {person.roleLabel}
        </p>
        <h3 className="break-words font-serif-display text-3xl font-semibold leading-tight text-[#211b17] sm:text-4xl md:text-5xl">
          {person.name}
        </h3>
        <p className="mt-5 leading-7 text-[#6f655d] sm:leading-8">{person.description}</p>
        {person.parents ? (
          <p className="mt-6 break-words border-t border-[#b88a43]/20 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#b88a43] sm:tracking-[0.18em]">
            {person.parents}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export function Couple({ bride, groom }: CoupleProps) {
  return (
    <section id="pareja" className="section-shell">
      <SectionTitle
        eyebrow="La pareja"
        title="Dos historias, un mismo destino"
        description="Una mirada cercana a quienes celebran este nuevo comienzo."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        <ProfileCard person={bride} />
        <ProfileCard person={groom} />
      </div>
    </section>
  )
}
