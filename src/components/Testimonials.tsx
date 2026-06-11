import { Quote } from 'lucide-react'
import type { Testimonial } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type TestimonialsProps = {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="mensajes" className="section-shell py-20 md:py-24">
      <SectionTitle
        eyebrow="Mensajes"
        title="Palabras de quienes nos acompañan"
        description="Tres voces cercanas para celebrar el amor, la familia y la alegría compartida."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial) => (
          <article
            key={`${testimonial.name}-${testimonial.relation}`}
            className="rounded-[8px] border border-[#e7d8c2] bg-[#fffdf8]/85 p-7 text-left shadow-[0_20px_70px_rgba(33,27,23,0.08)]"
          >
            <Quote className="text-[#b8925d]" size={28} aria-hidden="true" />
            <p className="mt-5 leading-8 text-[#211b17]">{testimonial.message}</p>
            <div className="mt-7 border-t border-[#e7d8c2] pt-5">
              <p className="font-serif-display text-2xl font-semibold text-[#211b17]">
                {testimonial.name}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#b8925d]">
                {testimonial.relation}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
