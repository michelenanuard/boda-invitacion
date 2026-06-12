import { Quote } from 'lucide-react'
import type { Testimonial } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type TestimonialsProps = {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="mensajes" className="section-shell">
      <SectionTitle
        eyebrow="Mensajes"
        title="Palabras de quienes nos acompañan"
        description="Tres voces cercanas para celebrar el amor, la familia y la alegría compartida."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial) => (
          <article
            key={`${testimonial.name}-${testimonial.relation}`}
            className="luxury-card min-w-0 rounded-[8px] p-5 text-left sm:p-7 md:p-8"
          >
            <Quote className="text-[#b88a43]" size={28} aria-hidden="true" />
            <p className="mt-5 break-words leading-7 text-[#211b17] sm:leading-8">{testimonial.message}</p>
            <div className="mt-7 border-t border-[#b88a43]/20 pt-5">
              <p className="break-words font-serif-display text-2xl font-semibold text-[#211b17]">
                {testimonial.name}
              </p>
              <p className="mt-1 break-words text-xs font-semibold uppercase tracking-[0.16em] text-[#b88a43] sm:tracking-[0.2em]">
                {testimonial.relation}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
