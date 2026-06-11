import { CheckCircle2, Mail, MessageCircle, Phone, Send, User, Users } from 'lucide-react'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import type { RSVPContent } from '../types/wedding'

type FormValues = {
  name: string
  phone: string
  email: string
  attending: string
  guests: string
  message: string
}

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  attending: '',
  guests: '1',
  message: '',
}

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const guestCount = Number(values.guests)

  if (!values.name.trim()) {
    errors.name = 'Escribe tu nombre completo.'
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Escribe un email válido.'
  }

  if (!values.attending) {
    errors.attending = 'Selecciona si asistirás.'
  }

  if (!values.guests.trim() || !Number.isInteger(guestCount) || guestCount < 0) {
    errors.guests = 'La cantidad no puede ser negativa.'
  }

  return errors
}

function isLocalHost() {
  return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)
}

type RSVPFormProps = {
  content: RSVPContent
}

export function RSVPForm({ content }: RSVPFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitError('')

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }

    if (!isLocalHost()) {
      try {
        const formData = new FormData(event.currentTarget)
        const encodedData = new URLSearchParams()

        formData.forEach((value, key) => {
          encodedData.append(key, String(value))
        })

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodedData.toString(),
        })
      } catch {
        setSubmitted(false)
        setSubmitError('No pudimos enviar tu respuesta. Inténtalo de nuevo en unos minutos.')
        return
      }
    }

    setSubmitted(true)
    setValues(initialValues)
  }

  return (
    <section id="rsvp" className="bg-rose-50 px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
            RSVP
          </p>
          <h2 className="font-serif-display text-4xl font-semibold text-stone-950 sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-stone-700">
            {content.description}
          </p>
        </div>

        <form
          name="rsvp"
          method="POST"
          data-netlify="true"
          className="rounded-md border border-rose-100 bg-white p-5 text-left shadow-xl shadow-rose-950/5 sm:p-8"
          onSubmit={submitForm}
          noValidate
        >
          <input type="hidden" name="form-name" value="rsvp" />

          {submitted ? (
            <div className="mb-6 flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
              <p>{content.successMessage}</p>
            </div>
          ) : null}
          {submitError ? (
            <div className="mb-6 rounded-md border border-rose-200 bg-rose-50 p-4 text-rose-900">
              {submitError}
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-800">
                <User className="h-4 w-4" aria-hidden="true" />
                Nombre completo
              </span>
              <input
                name="name"
                value={values.name}
                onChange={updateField}
                className="w-full rounded-md border border-stone-200 px-4 py-3 text-stone-950 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                autoComplete="name"
                required
              />
              {errors.name ? <span className="mt-1 block text-sm text-rose-700">{errors.name}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-800">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Teléfono
              </span>
              <input
                name="phone"
                value={values.phone}
                onChange={updateField}
                className="w-full rounded-md border border-stone-200 px-4 py-3 text-stone-950 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                autoComplete="tel"
                type="tel"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-800">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </span>
              <input
                name="email"
                value={values.email}
                onChange={updateField}
                className="w-full rounded-md border border-stone-200 px-4 py-3 text-stone-950 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                autoComplete="email"
                type="email"
                required
              />
              {errors.email ? <span className="mt-1 block text-sm text-rose-700">{errors.email}</span> : null}
            </label>

            <fieldset className="sm:col-span-2">
              <legend className="mb-3 text-sm font-semibold text-stone-800">¿Asistirás?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {content.attendanceOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-stone-200 px-4 py-3 text-stone-800 transition has-[:checked]:border-rose-400 has-[:checked]:bg-rose-50"
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={option.value}
                      checked={values.attending === option.value}
                      onChange={updateField}
                      required
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.attending ? <span className="mt-1 block text-sm text-rose-700">{errors.attending}</span> : null}
            </fieldset>

            <label className="block sm:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-800">
                <Users className="h-4 w-4" aria-hidden="true" />
                Cantidad de invitados
              </span>
              <input
                name="guests"
                value={values.guests}
                onChange={updateField}
                className="w-full rounded-md border border-stone-200 px-4 py-3 text-stone-950 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                min="0"
                type="number"
                required
              />
              {errors.guests ? <span className="mt-1 block text-sm text-rose-700">{errors.guests}</span> : null}
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-800">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Mensaje
              </span>
              <textarea
                name="message"
                value={values.message}
                onChange={updateField}
                className="min-h-32 w-full resize-y rounded-md border border-stone-200 px-4 py-3 text-stone-950 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-rose-800 sm:w-auto"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {content.submitLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
