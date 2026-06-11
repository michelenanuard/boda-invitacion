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
    <section id="preguntas" className="bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            Preguntas
          </p>
          <h2 className="font-serif text-4xl font-semibold text-stone-950 sm:text-5xl">
            Detalles importantes
          </h2>
        </div>

        <div className="mt-10 divide-y divide-stone-200 rounded-md border border-stone-200 bg-white shadow-sm shadow-stone-950/5">
          {items.map((item, index) => {
            const itemKey = getItemKey(item, index)
            const isOpen = openItem === itemKey

            return (
              <div key={itemKey}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-stone-950"
                  aria-expanded={isOpen}
                  onClick={() => setOpenItem(isOpen ? null : itemKey)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-none text-rose-700 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? (
                  <div className="px-5 pb-5 text-sm leading-7 text-stone-700 sm:text-base">
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
