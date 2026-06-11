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
            className="luxury-card rounded-[8px] p-7 text-left md:p-8"
          >
            <Quote className="text-[#b88a43]" size={28} aria-hidden="true" />
            <p className="mt-5 leading-8 text-[#211b17]">{testimonial.message}</p>
            <div className="mt-7 border-t border-[#b88a43]/20 pt-5">
              <p className="font-serif-display text-2xl font-semibold text-[#211b17]">
                {testimonial.name}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#b88a43]">
                {testimonial.relation}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
