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
    <div className={`mb-10 max-w-3xl ${alignClassName[align]} md:mb-16`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#b88a43] sm:tracking-[0.32em]">
        {eyebrow}
      </p>
      <h2 className="break-words font-serif-display text-[clamp(2.25rem,10vw,4.8rem)] font-semibold leading-[0.98] text-[#211b17] sm:leading-[0.96]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 break-words text-base leading-7 text-[#6f655d] sm:leading-8 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
