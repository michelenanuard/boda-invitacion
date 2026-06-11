import { Clock } from 'lucide-react'
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
    <section className="bg-stone-50 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
          <Clock className="h-4 w-4" aria-hidden="true" />
          Cuenta regresiva
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="rounded-md border border-stone-200 bg-white px-4 py-6 shadow-sm shadow-stone-950/5"
            >
              <div className="font-serif-display text-4xl font-semibold text-stone-950 sm:text-5xl">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
