import { CalendarHeart } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface CountdownProps {
  weddingDate: string
  weddingTime: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const difference = Math.max(targetDate.getTime() - Date.now(), 0)

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  }
}

export function Countdown({ weddingDate, weddingTime }: CountdownProps) {
  const targetDate = useMemo(() => new Date(`${weddingDate}T${weddingTime}`), [weddingDate, weddingTime])
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [targetDate])

  const units = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ]

  return (
    <section className="paper-texture border-y border-[#b88a43]/14 px-5 py-16 text-[#211b17] sm:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="luxury-card grid items-center gap-9 rounded-[8px] p-6 md:grid-cols-[0.78fr_1.22fr] md:p-10">
          <div className="text-center md:text-left">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#b88a43]">
              <CalendarHeart className="h-4 w-4" aria-hidden="true" />
              Save the date
            </p>
            <h2 className="font-serif-display text-5xl font-semibold leading-[0.95] text-[#211b17] md:text-6xl">
              Falta poco para brindar juntos
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="relative overflow-hidden rounded-[8px] border border-[#b88a43]/22 bg-[#fffdf8]/72 px-3 py-6 text-center sm:px-4"
              >
                <div className="absolute inset-x-4 top-0 h-px bg-[#b88a43]/50" />
                <div className="font-serif-display text-5xl font-semibold leading-none text-[#211b17] sm:text-6xl">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#b88a43]">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
