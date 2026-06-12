import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Monogram } from '../components/Monogram'
import { getMessageLifeTime, LIVE_MESSAGES_CONFIG } from '../config/liveMessagesConfig'
import { useLiveMessages } from '../hooks/useLiveMessages'
import { useWeddingContent } from '../hooks/useWeddingContent'
import type { LiveGuestMessage } from '../services/liveMessagesService'

type VisibleMessage = LiveGuestMessage & {
  slot: number
  shownAt: number
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

const displaySlotOrder = [2, 4, 6, 3, 5, 7]

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function MessageAvatar({ message, className }: { message: LiveGuestMessage; className: string }) {
  return (
    <div
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full border border-[#b88a43]/38 bg-[#f3eadb] font-serif-display font-semibold text-[#b88a43] ${className}`}
    >
      {message.photo ? (
        <img src={message.photo} alt="" className="h-full w-full object-cover" />
      ) : (
        getInitials(message.name)
      )}
    </div>
  )
}

function LiveMessageCard({ message }: { message: VisibleMessage }) {
  return (
    <motion.article
      layout
      className={`absolute hidden rounded-[8px] border border-[#d7bd83]/18 bg-[#fff8eb]/94 p-4 text-[#211b17] shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur md:block ${messageSlots[message.slot]}`}
      initial={{ opacity: 0, y: 34, scale: 0.96, filter: 'blur(10px)' }}
      animate={{
        opacity: 1,
        y: [34, 0, -20],
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          opacity: { duration: LIVE_MESSAGES_CONFIG.animationDuration * 0.75 },
          y: {
            duration: Math.min(
              LIVE_MESSAGES_CONFIG.verticalTravelDuration,
              Math.max(2, (message.expiresAt - message.shownAt) / 1000),
            ),
            times: [0, 0.08, 1],
            ease: ['easeOut', 'linear'],
          },
          scale: { duration: LIVE_MESSAGES_CONFIG.animationDuration },
          filter: { duration: LIVE_MESSAGES_CONFIG.animationDuration },
        },
      }}
      exit={{
        opacity: 0,
        y: -58,
        scale: 0.98,
        filter: 'blur(8px)',
        transition: { duration: LIVE_MESSAGES_CONFIG.exitAnimationDuration, ease: 'easeIn' },
      }}
    >
      <div className="flex gap-4">
        <MessageAvatar message={message} className="h-16 w-16 text-2xl" />
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
    </motion.article>
  )
}

function MobileMessageStack({ messages }: { messages: VisibleMessage[] }) {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-md gap-4 md:hidden">
      <AnimatePresence initial={false}>
        {messages.slice(0, LIVE_MESSAGES_CONFIG.maxVisibleMessages).map((message) => (
          <motion.div
            layout
            key={message.id}
            className="min-w-0 rounded-[8px] border border-[#d7bd83]/18 bg-[#fff8eb]/94 p-4 text-[#211b17]"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, y: -42, scale: 0.98 }}
            transition={{ duration: LIVE_MESSAGES_CONFIG.animationDuration, ease: 'easeOut' }}
          >
            <div className="flex gap-4">
              <MessageAvatar message={message} className="h-14 w-14 text-xl" />
              <div className="min-w-0">
                <p className="break-words font-serif-display text-xl font-semibold text-[#9c6f2d]">{message.name}</p>
                <p className="mt-1 break-words text-sm leading-6">{message.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function LiveMessagesScreen() {
  const { content } = useWeddingContent()
  const { messages } = useLiveMessages()
  const [visibleMessages, setVisibleMessages] = useState<VisibleMessage[]>([])
  const [hasProjectedMessages, setHasProjectedMessages] = useState(false)
  const queuedMessages = useRef<LiveGuestMessage[]>([])
  const queuedMessageIds = useRef(new Set<string>())
  const projectedMessageIds = useRef(new Set<string>())
  const nextSlotIndex = useRef(0)

  const approvedMessages = useMemo(
    () => messages.filter((message) => message.status === 'approved').sort((a, b) => a.createdAt - b.createdAt),
    [messages],
  )

  useEffect(() => {
    const newMessages = approvedMessages.filter(
      (message) => !projectedMessageIds.current.has(message.id) && !queuedMessageIds.current.has(message.id),
    )

    newMessages.forEach((message) => {
      queuedMessages.current.push(message)
      queuedMessageIds.current.add(message.id)
    })
  }, [approvedMessages])

  useEffect(() => {
    const queueInterval = window.setInterval(() => {
      setVisibleMessages((currentMessages) => {
        const now = Date.now()
        const activeMessages = currentMessages.filter((message) => message.expiresAt > now)
        const availableSlots = LIVE_MESSAGES_CONFIG.maxVisibleMessages - activeMessages.length

        if (availableSlots <= 0 || queuedMessages.current.length === 0) {
          return activeMessages
        }

        const nextMessages = queuedMessages.current.splice(0, availableSlots).map((message) => {
          queuedMessageIds.current.delete(message.id)
          projectedMessageIds.current.add(message.id)

          const slot = displaySlotOrder[nextSlotIndex.current % displaySlotOrder.length]
          nextSlotIndex.current += 1

          return {
            ...message,
            slot,
            shownAt: now,
            expiresAt: now + getMessageLifeTime(message.message),
          }
        })

        if (nextMessages.length > 0) {
          setHasProjectedMessages(true)
        }

        return [...activeMessages, ...nextMessages]
      })
    }, LIVE_MESSAGES_CONFIG.queueIntervalMs)

    return () => window.clearInterval(queueInterval)
  }, [])

  useEffect(() => {
    const cleanupInterval = window.setInterval(() => {
      const now = Date.now()
      setVisibleMessages((currentMessages) => currentMessages.filter((message) => message.expiresAt > now))
    }, 500)

    return () => window.clearInterval(cleanupInterval)
  }, [])

  const hasRealMessages = approvedMessages.length > 0 || hasProjectedMessages
  const messagesToShow = visibleMessages.length > 0 ? visibleMessages : []
  const showEmptyState = !hasRealMessages && messagesToShow.length === 0

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#100d0a] px-4 py-5 text-[#fffdf8] sm:px-6 sm:py-7 md:h-screen md:overflow-hidden md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(184,138,67,0.18),transparent_20rem),radial-gradient(circle_at_76%_30%,rgba(255,253,248,0.08),transparent_24rem),radial-gradient(circle_at_84%_82%,rgba(184,138,67,0.16),transparent_20rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,rgba(215,189,131,.62)_1px,transparent_1px)] [background-size:90px_90px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full border border-[#b88a43]/22" />
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full border border-[#b88a43]/16" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-7xl flex-col items-center md:min-h-[calc(100vh-3.5rem)]">
        <Monogram
          brideName={content.brideName}
          groomName={content.groomName}
          className="h-[4.5rem] w-[4.5rem] bg-transparent text-[0.78rem] sm:h-24 sm:w-24 sm:text-[1rem]"
        />
        <h1 className="mt-5 break-words text-center font-serif-display text-[clamp(2.65rem,13vw,5.8rem)] font-semibold leading-[0.95] md:leading-[0.92]">
          <span className="text-[#d7bd83]">Mensajes</span> para los novios
        </h1>
        <div className="mt-5 flex items-center gap-4 text-[#d7bd83] sm:gap-5">
          <span className="h-px w-14 bg-[#b88a43] sm:w-20" />
          <Heart className="h-6 w-6" aria-hidden="true" />
          <span className="h-px w-14 bg-[#b88a43] sm:w-20" />
        </div>
        <p className="mt-5 text-center text-base leading-7 tracking-wide text-[#fffdf8]/88 sm:text-lg">
          Comparte tu mensaje de amor y buenos deseos
        </p>

        <div className="relative mt-4 hidden min-h-[57vh] w-full md:block">
          <AnimatePresence initial={false}>
            {messagesToShow.map((message) => (
              <LiveMessageCard key={message.id} message={message} />
            ))}
          </AnimatePresence>
          {showEmptyState ? (
            <div className="absolute inset-0 grid place-items-center">
              <p className="mx-auto max-w-xl text-center font-serif-display text-3xl font-semibold text-[#fffdf8]/62">
                Sé el primero en dejar un mensaje para los novios
              </p>
            </div>
          ) : null}
        </div>

        <MobileMessageStack messages={messagesToShow} />
        {showEmptyState ? (
          <p className="mx-auto mt-10 max-w-md break-words text-center font-serif-display text-2xl font-semibold text-[#fffdf8]/62 md:hidden">
            Sé el primero en dejar un mensaje para los novios
          </p>
        ) : null}

        <div className="relative mt-auto flex flex-col items-center gap-3 pb-3 text-center">
          <p className="break-words text-xs uppercase tracking-[0.18em] text-[#d7bd83] sm:text-sm sm:tracking-[0.24em]">
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
