type MonogramProps = {
  brideName: string
  groomName: string
  className?: string
}

function initialOf(name: string) {
  return name.trim().charAt(0).toUpperCase()
}

export function Monogram({ brideName, groomName, className = '' }: MonogramProps) {
  return (
    <span
      className={`relative inline-grid aspect-square place-items-center border border-[#b88a43]/38 bg-[#fffdf8]/82 text-[#b88a43] ${className}`}
      aria-hidden="true"
    >
      <span className="absolute left-[18%] top-[8%] font-serif-display text-[1.9em] leading-none">
        {initialOf(brideName)}
      </span>
      <span className="absolute right-[17%] bottom-[8%] font-serif-display text-[1.9em] leading-none">
        {initialOf(groomName)}
      </span>
      <span className="h-[62%] w-px rotate-45 bg-[#b88a43]/35" />
      <span className="absolute h-[38%] w-[38%] rounded-full border border-[#b88a43]/18" />
    </span>
  )
}
