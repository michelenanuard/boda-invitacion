import { ImagePlus, PenLine, Send, UserRound } from 'lucide-react'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Monogram } from '../components/Monogram'
import { useWeddingContent } from '../hooks/useWeddingContent'
import { saveGuestMessage } from '../services/guestMessagesService'

const MAX_MESSAGE_LENGTH = 200

function readFileAsDataUrl(file: File, onLoad: (value: string) => void) {
  const reader = new FileReader()

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      onLoad(reader.result)
    }
  }

  reader.readAsDataURL(file)
}

export function GuestMessagesPage() {
  const { content } = useWeddingContent()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [photo, setPhoto] = useState('')
  const [status, setStatus] = useState('')

  const canSubmit = useMemo(() => name.trim().length >= 2 && message.trim().length >= 4, [message, name])

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      setStatus('Escribe tu nombre y un mensaje antes de enviarlo.')
      return
    }

    const nextMessage = saveGuestMessage({ name, message, photo: photo || undefined })
    setName('')
    setMessage('')
    setPhoto('')
    setStatus(
      nextMessage.status === 'pending'
        ? 'Gracias. Tu mensaje fue enviado y aparecerá cuando sea aprobado.'
        : 'Gracias. Tu mensaje ya está listo para aparecer en pantalla.',
    )
  }

  return (
    <main className="min-h-screen bg-[#100d0a] px-5 py-8 text-[#fffdf8] sm:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(184,138,67,0.22),transparent_24rem),radial-gradient(circle_at_86%_72%,rgba(215,189,131,0.14),transparent_22rem)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(135deg,rgba(255,253,248,.6)_25%,transparent_25%)] [background-size:18px_18px]" />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <Monogram
            brideName={content.brideName}
            groomName={content.groomName}
            className="h-20 w-20 bg-transparent text-[0.9rem]"
          />
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.34em] text-[#d7bd83]">
            Mensajes para los novios
          </p>
          <h1 className="mt-4 font-serif-display text-[clamp(3rem,13vw,7rem)] font-semibold leading-[0.86]">
            Comparte tus buenos deseos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#f3eadb]/82 sm:text-lg">
            Tu mensaje aparecerá en la pantalla de la celebración durante unos segundos.
          </p>
        </div>

        <form
          className="mx-auto mt-10 grid w-full max-w-5xl gap-4 rounded-[8px] border border-[#b88a43]/46 bg-[#17120d]/82 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur md:grid-cols-[auto_1fr_1.35fr_auto] md:items-end md:p-5"
          onSubmit={submitMessage}
        >
          <label className="grid gap-3 text-sm font-semibold text-[#d7bd83]">
            <span className="sr-only">Agregar foto</span>
            <span className="grid h-16 w-16 cursor-pointer place-items-center rounded-full border border-[#b88a43]/55 bg-[#fffdf8]/8 text-[#d7bd83]">
              {photo ? (
                <img src={photo} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                <ImagePlus className="h-6 w-6" aria-hidden="true" />
              )}
            </span>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) readFileAsDataUrl(file, setPhoto)
              }}
            />
          </label>

          <label className="relative block">
            <span className="sr-only">Tu nombre</span>
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#d7bd83]" />
            <input
              className="min-h-14 w-full rounded-[8px] border border-[#b88a43]/38 bg-[#100d0a]/72 pl-12 pr-4 text-sm text-[#fffdf8] outline-none transition placeholder:text-[#f3eadb]/48 focus:border-[#d7bd83] focus:ring-4 focus:ring-[#b88a43]/15"
              value={name}
              maxLength={40}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tu nombre"
            />
          </label>

          <label className="relative block">
            <span className="sr-only">Mensaje</span>
            <PenLine className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#d7bd83]" />
            <input
              className="min-h-14 w-full rounded-[8px] border border-[#b88a43]/38 bg-[#100d0a]/72 pl-12 pr-20 text-sm text-[#fffdf8] outline-none transition placeholder:text-[#f3eadb]/48 focus:border-[#d7bd83] focus:ring-4 focus:ring-[#b88a43]/15"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Escribe tu mensaje para los novios..."
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#d7bd83]">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </label>

          <button
            type="submit"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#b88a43] px-7 text-sm font-bold text-[#fffdf8] shadow-[0_18px_50px_rgba(184,138,67,0.24)] transition hover:bg-[#d7bd83] hover:text-[#211b17] disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!canSubmit}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Enviar mensaje
          </button>
        </form>

        {status ? (
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-[#d7bd83]">{status}</p>
        ) : null}

        <div className="mt-8 flex justify-center">
          <Link className="text-sm font-semibold text-[#fffdf8]/70 underline-offset-4 hover:text-[#d7bd83] hover:underline" to="/">
            Volver a la invitación
          </Link>
        </div>
      </section>
    </main>
  )
}
