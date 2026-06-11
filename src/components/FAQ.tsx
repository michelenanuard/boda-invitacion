import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import type { FAQItem } from '../types/wedding'

interface FAQProps {
  items: FAQItem[]
}

function getItemKey(item: FAQItem, index: number) {
  return String(item.id ?? index)
}

export function FAQ({ items }: FAQProps) {
  const [openItem, setOpenItem] = useState<string | null>(() => (items[0] ? getItemKey(items[0], 0) : null))

  return (
    <section id="preguntas" className="bg-[#fffdf8] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#b88a43]">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            Preguntas
          </p>
          <h2 className="font-serif-display text-[clamp(2.35rem,11vw,4.8rem)] font-semibold leading-[0.96] text-[#211b17]">
            Detalles importantes
          </h2>
        </div>

        <div className="luxury-card mt-12 divide-y divide-[#b88a43]/16 overflow-hidden rounded-[8px]">
          {items.map((item, index) => {
            const itemKey = getItemKey(item, index)
            const isOpen = openItem === itemKey

            return (
              <div key={itemKey}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-[#211b17] sm:px-7"
                  aria-expanded={isOpen}
                  onClick={() => setOpenItem(isOpen ? null : itemKey)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-none text-[#b88a43] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? (
                  <div className="px-5 pb-6 text-sm leading-7 text-[#6f655d] sm:px-7 sm:text-base">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
