import type { ReactNode } from 'react'

type SectionPreviewProps = {
  title: string
  children: ReactNode
}

export function SectionPreview({ title, children }: SectionPreviewProps) {
  return (
    <aside className="rounded-[8px] border border-stone-200 bg-[#fbf6ec] p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b88a43]">{title}</p>
      <div className="rounded-[8px] bg-white p-4 shadow-sm">{children}</div>
    </aside>
  )
}
