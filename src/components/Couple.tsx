import type { PersonProfile } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type CoupleProps = {
  bride: PersonProfile
  groom: PersonProfile
}

function ProfileCard({ person }: { person: PersonProfile }) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-[#e7d8c2] bg-[#fffdf8] text-left shadow-[0_24px_80px_rgba(33,27,23,0.08)]">
      <div className="aspect-[4/5] overflow-hidden bg-[#efe5d5]">
        <img
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
          src={person.image}
          alt={person.name}
        />
      </div>
      <div className="p-7 md:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#b8925d]">
          {person.roleLabel}
        </p>
        <h3 className="font-serif-display text-4xl font-semibold leading-tight text-[#211b17]">
          {person.name}
        </h3>
        <p className="mt-4 leading-8 text-[#776b61]">{person.description}</p>
        {person.parents ? (
          <p className="mt-5 border-t border-[#e7d8c2] pt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#b8925d]">
            {person.parents}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export function Couple({ bride, groom }: CoupleProps) {
  return (
    <section id="pareja" className="section-shell py-20 md:py-24">
      <SectionTitle
        eyebrow="La pareja"
        title="Dos historias, un mismo destino"
        description="Una mirada cercana a quienes celebran este nuevo comienzo."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ProfileCard person={bride} />
        <ProfileCard person={groom} />
      </div>
    </section>
  )
}
