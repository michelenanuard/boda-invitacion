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
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = useMemo(() => name.trim().length >= 2 && message.trim().length >= 4, [message, name])

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      setStatus('Escribe tu nombre y un mensaje antes de enviarlo.')
      return
    }

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const nextMessage = await saveGuestMessage({ name, message, photo: photo || undefined })
      setName('')
      setMessage('')
      setPhoto('')
      setStatus(
        nextMessage.status === 'pending'
          ? 'Gracias. Tu mensaje fue enviado y aparecerá cuando sea aprobado.'
          : 'Gracias. Tu mensaje ya está listo para aparecer en pantalla.',
      )
    } catch (error) {
      console.error('[SupabaseMessages] Error enviando formulario', error)
      setStatus('')
      setSubmitError('No pudimos enviar tu mensaje en este momento. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#100d0a] px-4 py-6 text-[#fffdf8] sm:px-6 sm:py-8 md:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(184,138,67,0.22),transparent_24rem),radial-gradient(circle_at_86%_72%,rgba(215,189,131,0.14),transparent_22rem)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(135deg,rgba(255,253,248,.6)_25%,transparent_25%)] [background-size:18px_18px]" />

      <section className="relative mx-auto flex min-h-[calc(100svh-3rem)] max-w-6xl flex-col justify-center py-4 sm:min-h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-3xl text-center">
          <Monogram
            brideName={content.brideName}
            groomName={content.groomName}
            className="h-16 w-16 bg-transparent text-[0.72rem] sm:h-20 sm:w-20 sm:text-[0.9rem]"
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#d7bd83] sm:mt-7 sm:tracking-[0.34em]">
            Mensajes para los novios
          </p>
          <h1 className="mt-4 break-words font-serif-display text-[clamp(2.75rem,13vw,7rem)] font-semibold leading-[0.9] sm:leading-[0.86]">
            Comparte tus buenos deseos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#f3eadb]/82 sm:text-lg sm:leading-8">
            Tu mensaje aparecerá en la pantalla de la celebración durante unos segundos.
          </p>
        </div>

        <form
          className="mx-auto mt-8 grid w-full max-w-5xl gap-4 rounded-[8px] border border-[#b88a43]/46 bg-[#17120d]/82 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur sm:mt-10 md:grid-cols-[auto_1fr_1.35fr_auto] md:items-center md:p-5"
          onSubmit={submitMessage}
        >
          <label className="grid justify-items-center gap-3 text-sm font-semibold text-[#d7bd83] md:justify-items-start">
            <span className="sr-only">Agregar foto</span>
            <span className="grid h-16 w-16 cursor-pointer place-items-center rounded-full border border-[#b88a43]/55 bg-[#fffdf8]/8 text-[#d7bd83] transition hover:bg-[#fffdf8]/12">
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

          <label className="relative block min-w-0">
            <span className="sr-only">Tu nombre</span>
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#d7bd83]" />
            <input
              className="h-14 min-h-14 w-full rounded-[8px] border border-[#b88a43]/38 bg-[#100d0a]/72 pl-12 pr-4 text-base text-[#fffdf8] outline-none transition placeholder:text-[#f3eadb]/48 focus:border-[#d7bd83] focus:ring-4 focus:ring-[#b88a43]/15"
              value={name}
              maxLength={40}
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Tu nombre"
            />
          </label>

          <label className="relative block min-w-0 md:translate-y-[3px]">
            <span className="sr-only">Mensaje</span>
            <PenLine className="pointer-events-none absolute left-4 top-5 h-5 w-5 text-[#d7bd83] md:top-1/2 md:-translate-y-1/2" />
            <textarea
              className="h-28 min-h-28 w-full resize-y rounded-[8px] border border-[#b88a43]/38 bg-[#100d0a]/72 py-4 pl-12 pr-20 text-base leading-6 text-[#fffdf8] outline-none transition placeholder:text-[#f3eadb]/48 focus:border-[#d7bd83] focus:ring-4 focus:ring-[#b88a43]/15 md:hidden"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Escribe tu mensaje para los novios..."
              rows={1}
            />
            <input
              className="hidden h-14 min-h-14 w-full rounded-[8px] border border-[#b88a43]/38 bg-[#100d0a]/72 pl-12 pr-16 text-base leading-none text-[#fffdf8] outline-none transition placeholder:text-[#f3eadb]/48 focus:border-[#d7bd83] focus:ring-4 focus:ring-[#b88a43]/15 md:block"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Escribe tu mensaje para los novios..."
            />
            <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-[#d7bd83] md:bottom-auto md:top-1/2 md:-translate-y-1/2">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </label>

          <button
            type="submit"
            className="inline-flex h-14 min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#b88a43] px-7 text-base font-bold text-[#fffdf8] shadow-[0_18px_50px_rgba(184,138,67,0.24)] transition hover:bg-[#d7bd83] hover:text-[#211b17] disabled:cursor-not-allowed disabled:opacity-45 md:w-auto"
            disabled={!canSubmit || isSubmitting}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>

        {status ? (
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 text-[#d7bd83]">{status}</p>
        ) : null}
        {submitError ? (
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 text-rose-200">{submitError}</p>
        ) : null}

        <div className="mt-8 flex justify-center">
          <Link className="inline-flex min-h-11 items-center text-sm font-semibold text-[#fffdf8]/70 underline-offset-4 hover:text-[#d7bd83] hover:underline" to="/">
            Volver a la invitación
          </Link>
        </div>
      </section>
    </main>
  )
}
