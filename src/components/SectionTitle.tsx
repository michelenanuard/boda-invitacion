type SectionTitleProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center' | 'right'
}

const alignClassName = {
  left: 'text-left',
  center: 'mx-auto text-center',
  right: 'ml-auto text-right',
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionTitleProps) {
  return (
    <div className={`mb-12 max-w-3xl ${alignClassName[align]} md:mb-16`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#b88a43]">
        {eyebrow}
      </p>
      <h2 className="font-serif-display text-[clamp(2.35rem,11vw,4.8rem)] font-semibold leading-[0.96] text-[#211b17]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[#6f655d] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
