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
    <div className={`mb-12 max-w-3xl ${alignClassName[align]}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#b8925d]">
        {eyebrow}
      </p>
      <h2 className="font-serif-display text-4xl font-semibold leading-tight text-[#211b17] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[#776b61] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
