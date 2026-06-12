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
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#b88a43]/45 to-transparent sm:left-6 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-5">
            {story.map((event, index) => {
              const isEven = index % 2 === 0

              return (
                <article
                  key={`${event.year}-${event.title}`}
                  className={`relative grid gap-5 pl-11 sm:pl-20 md:grid-cols-2 md:pl-0 ${
                    isEven ? '' : 'md:[&>div]:col-start-2'
                  }`}
                >
                  <span className="absolute left-[7px] top-7 z-10 h-5 w-5 rounded-full border-[5px] border-[#fffdf8] bg-[#b88a43] shadow-[0_0_0_1px_rgba(184,138,67,0.45)] sm:left-[17px] sm:top-8 md:left-1/2 md:-translate-x-1/2" />
                  <div
                    className={`luxury-card min-w-0 rounded-[8px] p-5 sm:p-6 md:p-7 ${
                      isEven ? 'md:mr-10 md:text-right' : 'md:ml-10'
                    }`}
                  >
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="mb-5 aspect-[4/3] w-full rounded-[8px] object-cover shadow-[0_18px_50px_rgba(33,27,23,0.10)]"
                      />
                    ) : null}
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b88a43] sm:tracking-[0.26em]">
                      {event.year}
                    </p>
                    <h3 className="mt-3 break-words font-serif-display text-3xl font-semibold leading-tight text-[#211b17] md:text-4xl">
                      {event.title}
                    </h3>
                    <p className="mt-4 break-words leading-7 text-[#6f655d] sm:leading-8">{event.description}</p>
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
