import { Heart } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Monogram } from '../components/Monogram'
import { useLiveMessages } from '../hooks/useLiveMessages'
import { useWeddingContent } from '../hooks/useWeddingContent'
import type { LiveGuestMessage } from '../services/liveMessagesService'

type VisibleMessage = LiveGuestMessage & {
  slot: number
  expiresAt: number
}

const messageSlots = [
  'left-[5%] top-[4%] w-[19rem]',
  'right-[6%] top-[4%] w-[19rem]',
  'left-[6%] top-[29%] w-[24rem]',
  'left-[42%] top-[31%] w-[20rem]',
  'right-[6%] top-[29%] w-[24rem]',
  'left-[12%] bottom-[9%] w-[21rem]',
  'left-[42%] bottom-[3%] w-[20rem]',
  'right-[9%] bottom-[8%] w-[22rem]',
]

const sampleMessages: VisibleMessage[] = [
  {
    id: 'sample-1',
    name: 'Ana & Juan',
    message: 'Que este sea solo el comienzo de una hermosa historia juntos.',
    photo:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=180&q=80',
    createdAt: Date.now() - 10000,
    status: 'approved',
    slot: 2,
    expiresAt: Date.now() + 600000,
  },
  {
    id: 'sample-2',
    name: 'Carla & Diego',
    message: 'Hoy celebramos el amor más bonito. Felicidades.',
    photo:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=180&q=80',
    createdAt: Date.now() - 8000,
    status: 'approved',
    slot: 4,
    expiresAt: Date.now() + 600000,
  },
  {
    id: 'sample-3',
    name: 'Felipe',
    message: 'Que el amor, la paciencia y las risas nunca falten en su camino.',
    photo:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=180&q=80',
    createdAt: Date.now() - 5000,
    status: 'approved',
    slot: 6,
    expiresAt: Date.now() + 600000,
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function LiveMessageCard({ message }: { message: VisibleMessage }) {
  return (
    <article
      className={`live-message-card absolute hidden rounded-[8px] border border-[#d7bd83]/18 bg-[#fff8eb]/94 p-4 text-[#211b17] shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur md:block ${messageSlots[message.slot]}`}
      style={{ animationDelay: `${message.slot * 90}ms` }}
    >
      <div className="flex gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-[#b88a43]/38 bg-[#f3eadb] font-serif-display text-2xl font-semibold text-[#b88a43]">
          {message.photo ? <img src={message.photo} alt="" className="h-full w-full object-cover" /> : getInitials(message.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-serif-display text-2xl font-semibold leading-none text-[#9c6f2d]">
              {message.name}
            </h2>
            <Heart className="h-5 w-5 shrink-0 text-[#b88a43]" aria-hidden="true" />
          </div>
          <p className="mt-2 text-sm leading-6 text-[#211b17]">{message.message}</p>
        </div>
      </div>
    </article>
  )
}

function MobileMessageStack({ messages }: { messages: VisibleMessage[] }) {
  return (
    <div className="mx-auto mt-10 grid w-full max-w-md gap-4 md:hidden">
      {messages.slice(0, 4).map((message) => (
        <div key={message.id} className="rounded-[8px] border border-[#d7bd83]/18 bg-[#fff8eb]/94 p-4 text-[#211b17]">
          <div className="flex gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-[#b88a43]/38 bg-[#f3eadb] font-serif-display text-xl font-semibold text-[#b88a43]">
              {message.photo ? <img src={message.photo} alt="" className="h-full w-full object-cover" /> : getInitials(message.name)}
            </div>
            <div>
              <p className="font-serif-display text-xl font-semibold text-[#9c6f2d]">{message.name}</p>
              <p className="mt-1 text-sm leading-6">{message.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function LiveMessagesScreen() {
  const { content } = useWeddingContent()
  const { messages, settings } = useLiveMessages()
  const [visibleMessages, setVisibleMessages] = useState<VisibleMessage[]>([])

  const approvedMessages = useMemo(
    () => messages.filter((message) => message.status === 'approved').sort((a, b) => a.createdAt - b.createdAt),
    [messages],
  )

  useEffect(() => {
    const updateTimer = window.setTimeout(() => {
      setVisibleMessages((currentMessages) => {
        const currentIds = new Set(currentMessages.map((message) => message.id))
        const nextMessages = approvedMessages
          .filter((message) => !currentIds.has(message.id))
          .map((message, index) => ({
            ...message,
            slot: (currentMessages.length + index) % messageSlots.length,
            expiresAt: Date.now() + settings.displayDurationSeconds * 1000,
          }))

        return [...currentMessages, ...nextMessages].slice(-messageSlots.length)
      })
    }, 0)

    return () => window.clearTimeout(updateTimer)
  }, [approvedMessages, settings.displayDurationSeconds])

  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now()
      setVisibleMessages((currentMessages) => currentMessages.filter((message) => message.expiresAt > now))
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const messagesToShow = visibleMessages.length > 0 ? visibleMessages : sampleMessages

  return (
    <main className="relative h-screen overflow-hidden bg-[#100d0a] px-5 py-7 text-[#fffdf8] sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(184,138,67,0.18),transparent_20rem),radial-gradient(circle_at_76%_30%,rgba(255,253,248,0.08),transparent_24rem),radial-gradient(circle_at_84%_82%,rgba(184,138,67,0.16),transparent_20rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,rgba(215,189,131,.62)_1px,transparent_1px)] [background-size:90px_90px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full border border-[#b88a43]/22" />
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full border border-[#b88a43]/16" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl flex-col items-center">
        <Monogram
          brideName={content.brideName}
          groomName={content.groomName}
          className="h-24 w-24 bg-transparent text-[1rem]"
        />
        <h1 className="mt-5 text-center font-serif-display text-[clamp(3rem,7vw,5.8rem)] font-semibold leading-[0.92]">
          <span className="text-[#d7bd83]">Mensajes</span> para los novios
        </h1>
        <div className="mt-5 flex items-center gap-5 text-[#d7bd83]">
          <span className="h-px w-20 bg-[#b88a43]" />
          <Heart className="h-6 w-6" aria-hidden="true" />
          <span className="h-px w-20 bg-[#b88a43]" />
        </div>
        <p className="mt-5 text-center text-lg tracking-wide text-[#fffdf8]/88">
          Comparte tu mensaje de amor y buenos deseos
        </p>

        <div className="relative mt-4 hidden min-h-[57vh] w-full md:block">
          {messagesToShow.map((message) => (
            <LiveMessageCard key={message.id} message={message} />
          ))}
        </div>

        <MobileMessageStack messages={messagesToShow} />

        <div className="relative mt-auto flex flex-col items-center gap-3 pb-3 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-[#d7bd83]">
            Escanea el QR o entra a /mensajes para participar
          </p>
          <p className="text-sm text-[#fffdf8]/62">
            Los mensajes aparecen temporalmente y se actualizan en vivo.
          </p>
        </div>
      </section>
    </main>
  )
}
