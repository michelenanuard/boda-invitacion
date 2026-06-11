import type { StoryEvent } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type StoryTimelineProps = {
  story: StoryEvent[]
}

export function StoryTimeline({ story }: StoryTimelineProps) {
  return (
    <section id="historia" className="bg-[#fffdf8]/70 py-20 md:py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Nuestra historia"
          title="Momentos que nos trajeron hasta aquí"
          description="Un recorrido por los capítulos que hicieron crecer esta historia."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#d8bf97] to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8">
            {story.map((event, index) => {
              const isEven = index % 2 === 0

              return (
                <article
                  key={`${event.year}-${event.title}`}
                  className={`relative grid gap-5 pl-16 md:grid-cols-2 md:pl-0 ${
                    isEven ? '' : 'md:[&>div]:col-start-2'
                  }`}
                >
                  <span className="absolute left-3 top-7 z-10 h-4 w-4 rounded-full border-4 border-[#fffdf8] bg-[#b8925d] shadow-[0_0_0_1px_#d8bf97] md:left-1/2 md:-translate-x-1/2" />
                  <div
                    className={`rounded-[8px] border border-[#e7d8c2] bg-white/85 p-6 text-left shadow-[0_18px_60px_rgba(33,27,23,0.07)] ${
                      isEven ? 'md:text-right' : ''
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b8925d]">
                      {event.year}
                    </p>
                    <h3 className="mt-3 font-serif-display text-3xl font-semibold leading-tight text-[#211b17]">
                      {event.title}
                    </h3>
                    <p className="mt-4 leading-8 text-[#776b61]">{event.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
