import type { StoryEvent } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type StoryTimelineProps = {
  story: StoryEvent[]
}

export function StoryTimeline({ story }: StoryTimelineProps) {
  return (
    <section id="historia" className="section-band bg-[#fffdf8]/74">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Nuestra historia"
          title="Momentos que nos trajeron hasta aquí"
          description="Un recorrido por los capítulos que hicieron crecer esta historia hasta el día que celebraremos juntos."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#b88a43]/45 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-5">
            {story.map((event, index) => {
              const isEven = index % 2 === 0

              return (
                <article
                  key={`${event.year}-${event.title}`}
                  className={`relative grid gap-5 pl-20 md:grid-cols-2 md:pl-0 ${
                    isEven ? '' : 'md:[&>div]:col-start-2'
                  }`}
                >
                  <span className="absolute left-[17px] top-8 z-10 h-5 w-5 rounded-full border-[5px] border-[#fffdf8] bg-[#b88a43] shadow-[0_0_0_1px_rgba(184,138,67,0.45)] md:left-1/2 md:-translate-x-1/2" />
                  <div
                    className={`luxury-card rounded-[8px] p-6 md:p-7 ${
                      isEven ? 'md:mr-10 md:text-right' : 'md:ml-10'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#b88a43]">
                      {event.year}
                    </p>
                    <h3 className="mt-3 font-serif-display text-3xl font-semibold leading-tight text-[#211b17] md:text-4xl">
                      {event.title}
                    </h3>
                    <p className="mt-4 leading-8 text-[#6f655d]">{event.description}</p>
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
