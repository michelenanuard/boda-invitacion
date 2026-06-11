import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'

type RepeaterFieldProps<T> = {
  title: string
  items: T[]
  createItem: () => T
  getItemLabel: (item: T, index: number) => string
  onChange: (items: T[]) => void
  renderItem: (item: T, index: number, updateItem: (item: T) => void) => ReactNode
}

export function RepeaterField<T>({
  title,
  items,
  createItem,
  getItemLabel,
  onChange,
  renderItem,
}: RepeaterFieldProps<T>) {
  const updateItem = (index: number, item: T) => {
    onChange(items.map((current, currentIndex) => (currentIndex === index ? item : current)))
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, currentIndex) => currentIndex !== index))
  }

  const moveItem = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction

    if (nextIndex < 0 || nextIndex >= items.length) {
      return
    }

    const nextItems = [...items]
    const [item] = nextItems.splice(index, 1)
    nextItems.splice(nextIndex, 0, item)
    onChange(nextItems)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-sans text-base font-bold text-stone-950">{title}</h3>
        <button
          type="button"
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#211b17] px-4 text-sm font-bold text-white"
          onClick={() => onChange([...items, createItem()])}
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <article key={index} className="rounded-[8px] border border-stone-200 bg-stone-50 p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-stone-800">{getItemLabel(item, index)}</p>
              <div className="flex gap-2">
                <button type="button" className="rounded-full border border-stone-200 bg-white p-2" onClick={() => moveItem(index, -1)}>
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" className="rounded-full border border-stone-200 bg-white p-2" onClick={() => moveItem(index, 1)}>
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button type="button" className="rounded-full border border-stone-200 bg-white p-2" onClick={() => onChange([...items, item])}>
                  <Copy className="h-4 w-4" />
                </button>
                <button type="button" className="rounded-full border border-rose-200 bg-white p-2 text-rose-700" onClick={() => removeItem(index)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {renderItem(item, index, (nextItem) => updateItem(index, nextItem))}
          </article>
        ))}
      </div>
    </div>
  )
}
