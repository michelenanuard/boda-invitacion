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

const fieldClassName =
  'min-h-12 w-full rounded-[8px] border border-[#b88a43]/18 bg-[#fffdf8] px-4 py-3 text-base text-[#211b17] outline-none transition placeholder:text-[#6f655d]/55 focus:border-[#b88a43] focus:ring-4 focus:ring-[#b88a43]/12'

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
    <section id="rsvp" className="section-band bg-[#f3eadb] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-[#b88a43] sm:tracking-[0.32em]">
            RSVP
          </p>
          <h2 className="font-serif-display text-[clamp(2.45rem,11vw,5rem)] font-semibold leading-[0.96] text-[#211b17]">
            {content.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#6f655d] sm:mt-6 sm:leading-8 md:text-lg">
            {content.description}
          </p>
          <div className="mt-8 hidden h-px max-w-xs bg-gradient-to-r from-[#b88a43]/45 to-transparent lg:block" />
        </div>

        <form
          name="rsvp"
          method="POST"
          data-netlify="true"
          className="luxury-card min-w-0 rounded-[8px] p-5 text-left sm:p-8 lg:p-10"
          onSubmit={submitForm}
          noValidate
        >
          <input type="hidden" name="form-name" value="rsvp" />

          {submitted ? (
            <div className="mb-6 flex items-start gap-3 rounded-[8px] border border-emerald-200 bg-emerald-50 p-4 text-base leading-6 text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
              <p>{content.successMessage}</p>
            </div>
          ) : null}
          {submitError ? (
            <div className="mb-6 rounded-[8px] border border-rose-200 bg-rose-50 p-4 text-base leading-6 text-rose-900">
              {submitError}
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block min-w-0">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#394136]">
                <User className="h-4 w-4 text-[#b88a43]" aria-hidden="true" />
                Nombre completo
              </span>
              <input
                name="name"
                value={values.name}
                onChange={updateField}
                className={fieldClassName}
                autoComplete="name"
                required
              />
              {errors.name ? <span className="mt-2 block text-sm leading-5 text-rose-700">{errors.name}</span> : null}
            </label>

            <label className="block min-w-0">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#394136]">
                <Phone className="h-4 w-4 text-[#b88a43]" aria-hidden="true" />
                Teléfono
              </span>
              <input
                name="phone"
                value={values.phone}
                onChange={updateField}
                className={fieldClassName}
                autoComplete="tel"
                type="tel"
              />
            </label>

            <label className="block min-w-0 sm:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#394136]">
                <Mail className="h-4 w-4 text-[#b88a43]" aria-hidden="true" />
                Email
              </span>
              <input
                name="email"
                value={values.email}
                onChange={updateField}
                className={fieldClassName}
                autoComplete="email"
                type="email"
                required
              />
              {errors.email ? <span className="mt-2 block text-sm leading-5 text-rose-700">{errors.email}</span> : null}
            </label>

            <fieldset className="min-w-0 sm:col-span-2">
              <legend className="mb-3 text-sm font-semibold text-[#394136]">¿Asistirás?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {content.attendanceOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex min-h-14 cursor-pointer items-center gap-3 rounded-[8px] border border-[#b88a43]/18 bg-[#fffdf8] px-4 py-3 text-base text-[#394136] transition has-[:checked]:border-[#b88a43] has-[:checked]:bg-[#fbf6ec] has-[:checked]:shadow-[0_12px_34px_rgba(184,138,67,0.12)]"
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={option.value}
                      checked={values.attending === option.value}
                      onChange={updateField}
                      required
                    />
                    <span className="min-w-0 break-words">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.attending ? <span className="mt-2 block text-sm leading-5 text-rose-700">{errors.attending}</span> : null}
            </fieldset>

            <label className="block min-w-0 sm:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#394136]">
                <Users className="h-4 w-4 text-[#b88a43]" aria-hidden="true" />
                Cantidad de invitados
              </span>
              <input
                name="guests"
                value={values.guests}
                onChange={updateField}
                className={fieldClassName}
                min="0"
                type="number"
                required
              />
              {errors.guests ? <span className="mt-2 block text-sm leading-5 text-rose-700">{errors.guests}</span> : null}
            </label>

            <label className="block min-w-0 sm:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#394136]">
                <MessageCircle className="h-4 w-4 text-[#b88a43]" aria-hidden="true" />
                Mensaje
              </span>
              <textarea
                name="message"
                value={values.message}
                onChange={updateField}
                className={`${fieldClassName} min-h-36 resize-y`}
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#211b17] px-7 py-3 text-base font-bold text-white shadow-[0_18px_44px_rgba(33,27,23,0.16)] transition-colors hover:bg-[#394136] sm:w-auto"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {content.submitLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
