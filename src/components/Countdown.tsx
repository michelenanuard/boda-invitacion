import { CalendarHeart, CalendarPlus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { WeddingEvent } from '../types/wedding'

interface CountdownProps {
  weddingDate: string
  weddingTime: string
  coupleDisplayName: string
  ceremony: WeddingEvent
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

function formatCalendarDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeCalendarText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
}

function createCalendarUid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function downloadCalendarEvent({
  coupleDisplayName,
  ceremony,
  targetDate,
}: {
  coupleDisplayName: string
  ceremony: WeddingEvent
  targetDate: Date
}) {
  if (Number.isNaN(targetDate.getTime())) {
    return
  }

  const endDate = new Date(targetDate.getTime() + 90 * 60 * 1000)
  const title = `Boda de ${coupleDisplayName}`
  const description = `Ceremonia en ${ceremony.venue}. ${ceremony.note ?? ''}`.trim()
  const location = [ceremony.venue, ceremony.address].filter(Boolean).join(', ')
  const calendarContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Save The Date//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${createCalendarUid()}@wedding-invitation`,
    `DTSTAMP:${formatCalendarDate(new Date())}`,
    `DTSTART:${formatCalendarDate(targetDate)}`,
    `DTEND:${formatCalendarDate(endDate)}`,
    `SUMMARY:${escapeCalendarText(title)}`,
    `DESCRIPTION:${escapeCalendarText(description)}`,
    `LOCATION:${escapeCalendarText(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const file = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' })
  const fileUrl = URL.createObjectURL(file)
  const link = document.createElement('a')

  link.href = fileUrl
  link.download = `save-the-date-${coupleDisplayName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(fileUrl)
}

export function Countdown({ weddingDate, weddingTime, coupleDisplayName, ceremony }: CountdownProps) {
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
    <section className="paper-texture border-y border-[#b88a43]/14 px-4 py-14 text-[#211b17] sm:px-6 sm:py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="luxury-card grid items-center gap-7 rounded-[8px] p-5 sm:gap-9 sm:p-6 md:grid-cols-[0.78fr_1.22fr] md:p-10">
          <div className="text-center md:text-left">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#b88a43] sm:tracking-[0.32em]">
              <CalendarHeart className="h-4 w-4" aria-hidden="true" />
              Save the date
            </p>
            <h2 className="font-serif-display text-[2.6rem] font-semibold leading-[0.95] text-[#211b17] sm:text-5xl md:text-6xl">
              Falta poco para brindar juntos
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="relative overflow-hidden rounded-[8px] border border-[#b88a43]/22 bg-[#fffdf8]/72 px-2 py-5 text-center sm:px-4 sm:py-6"
              >
                <div className="absolute inset-x-4 top-0 h-px bg-[#b88a43]/50" />
                <div className="font-serif-display text-4xl font-semibold leading-none text-[#211b17] sm:text-5xl lg:text-6xl">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#b88a43] sm:text-[0.72rem] sm:tracking-[0.22em]">
                  {unit.label}
                </div>
              </div>
            ))}
            <div className="col-span-2 mt-2 flex justify-center sm:col-span-4 md:justify-end">
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#b88a43]/32 bg-[#fffdf8]/58 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#9c6f2d] transition hover:border-[#b88a43]/58 hover:bg-[#fffdf8] hover:text-[#211b17] focus:outline-none focus:ring-4 focus:ring-[#b88a43]/16"
                onClick={() => downloadCalendarEvent({ coupleDisplayName, ceremony, targetDate })}
              >
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Agregar al calendario
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
