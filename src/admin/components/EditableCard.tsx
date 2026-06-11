import type { ReactNode } from 'react'

type EditableCardProps = {
  title: string
  description?: string
  children: ReactNode
}

export function EditableCard({ title, description, children }: EditableCardProps) {
  return (
    <section className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-[0_16px_50px_rgba(33,27,23,0.06)] md:p-6">
      <div className="mb-5">
        <h2 className="font-sans text-lg font-bold leading-tight text-stone-950">{title}</h2>
        {description ? <p className="mt-1 text-sm leading-6 text-stone-500">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
