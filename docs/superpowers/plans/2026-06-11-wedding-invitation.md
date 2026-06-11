# Wedding Invitation Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, romantic, responsive wedding invitation landing page with centralized editable data, RSVP form, countdown, gallery lightbox, FAQ accordion, and Netlify deployment docs.

**Architecture:** Replace the Vite starter app with focused React components fed by `src/data/weddingData.ts` and typed by `src/types/wedding.ts`. Keep interaction state local to the relevant components, with small pure helpers inside components where practical. Use Tailwind CSS utilities and global CSS variables/fonts in `src/index.css`.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS 4, lucide-react, npm scripts already present in `package.json`.

---

## File Map

- Modify: `.gitignore` to keep `.superpowers/` ignored.
- Delete or leave unused: `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`.
- Modify: `src/App.tsx` to compose the landing page.
- Modify: `src/main.tsx` only if import cleanup is needed.
- Replace: `src/index.css` with Tailwind import, font imports, CSS variables, and global base styles.
- Create: `src/types/wedding.ts` for all editable data types.
- Create: `src/data/weddingData.ts` for fictitious editable wedding content.
- Create: `src/components/SectionTitle.tsx` for section labels/headings.
- Create: `src/components/Header.tsx` for sticky navigation and mobile menu.
- Create: `src/components/Hero.tsx` for first viewport invitation hero.
- Create: `src/components/EventDetails.tsx` for ceremony and reception cards.
- Create: `src/components/Countdown.tsx` for live countdown.
- Create: `src/components/Couple.tsx` for bride and groom cards.
- Create: `src/components/StoryTimeline.tsx` for vertical timeline.
- Create: `src/components/Gallery.tsx` for responsive gallery and lightbox.
- Create: `src/components/Testimonials.tsx` for family message cards.
- Create: `src/components/RSVPForm.tsx` for Netlify-ready RSVP and validation.
- Create: `src/components/FAQ.tsx` for editable accordion.
- Create: `src/components/Footer.tsx` for final contact and links.
- Replace: `README.md`.
- Create: `PERSONALIZACION.md`.
- Create: `DEPLOY-NETLIFY.md`.

## Task 1: Clean Base Styling and Types

**Files:**
- Modify: `src/index.css`
- Create: `src/types/wedding.ts`

- [ ] **Step 1: Replace global CSS**

Write `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
@import 'tailwindcss';

:root {
  --color-ivory: #fbf7ef;
  --color-paper: #fffdf8;
  --color-linen: #efe5d5;
  --color-gold: #b8925d;
  --color-ink: #211b17;
  --color-muted: #776b61;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  color: var(--color-ink);
  background:
    radial-gradient(circle at top left, rgba(184, 146, 93, 0.14), transparent 34rem),
    linear-gradient(180deg, #fbf7ef 0%, #fffdf8 45%, #f7efe3 100%);
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

img {
  max-width: 100%;
  display: block;
}

.font-serif-display {
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.section-shell {
  width: min(1120px, calc(100% - 32px));
  margin-inline: auto;
}
```

- [ ] **Step 2: Create data types**

Write `src/types/wedding.ts`:

```ts
export type WeddingTheme = {
  ivory: string
  paper: string
  linen: string
  gold: string
  ink: string
  muted: string
}

export type WeddingEvent = {
  title: string
  time: string
  venue: string
  address: string
  mapUrl: string
}

export type PersonProfile = {
  name: string
  role: string
  image: string
  description: string
}

export type StoryEvent = {
  year: string
  title: string
  description: string
}

export type GalleryImage = {
  src: string
  alt: string
  caption: string
}

export type Testimonial = {
  message: string
  name: string
  relation: string
}

export type FAQItem = {
  question: string
  answer: string
}

export type WeddingContact = {
  email: string
  phone: string
  location: string
}

export type WeddingData = {
  brideName: string
  groomName: string
  coupleDisplayName: string
  weddingDate: string
  weddingTime: string
  hashtag: string
  heroTitle: string
  heroSubtitle: string
  ceremony: WeddingEvent
  reception: WeddingEvent
  bride: PersonProfile
  groom: PersonProfile
  story: StoryEvent[]
  gallery: GalleryImage[]
  testimonials: Testimonial[]
  faq: FAQItem[]
  contact: WeddingContact
  theme: WeddingTheme
}
```

- [ ] **Step 3: Verify CSS/types compile**

Run: `npm run build`

Expected: build may still fail because `App.tsx` imports old `App.css`; continue to Task 2 where the app is replaced.

## Task 2: Centralize Editable Wedding Data

**Files:**
- Create: `src/data/weddingData.ts`

- [ ] **Step 1: Add fictitious wedding data**

Write `src/data/weddingData.ts`:

```ts
import type { WeddingData } from '../types/wedding'

export const weddingData: WeddingData = {
  brideName: 'Amelia',
  groomName: 'James',
  coupleDisplayName: 'Amelia & James',
  weddingDate: '2026-12-12',
  weddingTime: '17:30',
  hashtag: '#AmeliaYJames',
  heroTitle: 'Amelia & James',
  heroSubtitle: 'Nos encantaría compartir este día especial contigo',
  ceremony: {
    title: 'Ceremonia',
    time: '5:30 PM',
    venue: 'Capilla Santa Clara',
    address: 'Avenida Jardines 124, Santo Domingo',
    mapUrl: 'https://maps.google.com/?q=Capilla+Santa+Clara',
  },
  reception: {
    title: 'Recepción',
    time: '7:30 PM',
    venue: 'Hacienda Las Rosas',
    address: 'Camino del Lago 45, Santo Domingo',
    mapUrl: 'https://maps.google.com/?q=Hacienda+Las+Rosas',
  },
  bride: {
    name: 'Amelia Rose',
    role: 'La novia',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description: 'Creativa, serena y amante de los detalles simples que hacen memorable cada momento.',
  },
  groom: {
    name: 'James Carter',
    role: 'El novio',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    description: 'Leal, alegre y convencido de que las mejores historias empiezan con una conversación honesta.',
  },
  story: [
    {
      year: '2020',
      title: 'Primer encuentro',
      description: 'Una tarde tranquila, una mesa compartida y una conversación que ninguno de los dos quiso terminar.',
    },
    {
      year: '2021',
      title: 'Primera cita',
      description: 'Cena, risas y la certeza de haber encontrado a alguien con quien todo se sentía natural.',
    },
    {
      year: '2025',
      title: 'La propuesta',
      description: 'Bajo luces cálidas y con la familia cerca, llegó la pregunta que cambió el rumbo de nuestra historia.',
    },
    {
      year: '2026',
      title: 'El gran día',
      description: 'Celebraremos el amor, la familia y el inicio de una nueva vida juntos.',
    },
  ],
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
      alt: 'Pareja caminando en una boda',
      caption: 'Un paseo para recordar',
    },
    {
      src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80',
      alt: 'Decoración elegante de boda',
      caption: 'Detalles de la celebración',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
      alt: 'Novios tomados de la mano',
      caption: 'Juntos siempre',
    },
    {
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
      alt: 'Mesa de recepción de boda',
      caption: 'La mesa está servida',
    },
    {
      src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
      alt: 'Ramo de novia',
      caption: 'Flores y promesas',
    },
    {
      src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80',
      alt: 'Invitados celebrando una boda',
      caption: 'Celebrar con los nuestros',
    },
    {
      src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=80',
      alt: 'Anillos de boda',
      caption: 'Símbolos de una promesa',
    },
    {
      src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80',
      alt: 'Pareja bailando en recepción',
      caption: 'Nuestro primer baile',
    },
  ],
  testimonials: [
    {
      message: 'Verlos construir una historia tan bonita ha sido un regalo para toda la familia.',
      name: 'Nolan Racine',
      relation: 'Padre de la novia',
    },
    {
      message: 'Su amor se nota en la calma, en la risa y en la forma en que se cuidan cada día.',
      name: 'Jensen Cameron',
      relation: 'Madre del novio',
    },
    {
      message: 'No puedo esperar para celebrar este capítulo con ustedes. Será inolvidable.',
      name: 'Susan Aguilar',
      relation: 'Mejor amiga',
    },
  ],
  faq: [
    {
      question: '¿Cuál es el código de vestimenta?',
      answer: 'Formal elegante. Sugerimos tonos neutros, pasteles o colores sobrios para acompañar la estética de la celebración.',
    },
    {
      question: '¿Puedo llevar acompañante?',
      answer: 'Por favor revisa tu invitación. Si incluye acompañante, podrás indicarlo al confirmar asistencia.',
    },
    {
      question: '¿Dónde será la ceremonia?',
      answer: 'La ceremonia será en la Capilla Santa Clara. Puedes abrir la ubicación desde el botón de Google Maps.',
    },
    {
      question: '¿Hay parqueo?',
      answer: 'Sí, la recepción cuenta con parqueo privado y personal de apoyo para orientar a los invitados.',
    },
    {
      question: '¿Hasta cuándo puedo confirmar?',
      answer: 'Agradecemos confirmar asistencia antes del 14 de noviembre de 2026.',
    },
  ],
  contact: {
    email: 'confirmaciones@ameliayjames.com',
    phone: '+1 809 555 0184',
    location: 'Santo Domingo, República Dominicana',
  },
  theme: {
    ivory: '#fbf7ef',
    paper: '#fffdf8',
    linen: '#efe5d5',
    gold: '#b8925d',
    ink: '#211b17',
    muted: '#776b61',
  },
}
```

- [ ] **Step 2: Verify data type correctness**

Run: `npm run build`

Expected: build may still fail due old app imports, but no errors should point to `weddingData.ts` or `wedding.ts`.

## Task 3: Build Shared Section and Static Components

**Files:**
- Create: `src/components/SectionTitle.tsx`
- Create: `src/components/EventDetails.tsx`
- Create: `src/components/Couple.tsx`
- Create: `src/components/StoryTimeline.tsx`
- Create: `src/components/Testimonials.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Add `SectionTitle`**

Write `src/components/SectionTitle.tsx`:

```tsx
type SectionTitleProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionTitle({ eyebrow, title, description, align = 'center' }: SectionTitleProps) {
  return (
    <div className={align === 'center' ? 'mx-auto mb-12 max-w-2xl text-center' : 'mb-10 max-w-2xl'}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#b8925d]">{eyebrow}</p>
      <h2 className="font-serif-display text-4xl font-semibold leading-tight text-[#211b17] md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-[#776b61]">{description}</p> : null}
    </div>
  )
}
```

- [ ] **Step 2: Add `EventDetails`**

Write `src/components/EventDetails.tsx`:

```tsx
import { CalendarHeart, Clock, MapPin } from 'lucide-react'
import type { WeddingEvent } from '../types/wedding'
import { SectionTitle } from './SectionTitle'

type EventDetailsProps = {
  ceremony: WeddingEvent
  reception: WeddingEvent
}

export function EventDetails({ ceremony, reception }: EventDetailsProps) {
  const events = [ceremony, reception]

  return (
    <section id="detalles" className="section-shell py-20">
      <SectionTitle
        eyebrow="Celebración"
        title="Ceremonia y recepción"
        description="Dos momentos pensados para reunir a las personas que más queremos."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <article key={event.title} className="rounded-[8px] border border-[#e7d8c2] bg-white/78 p-8 shadow-[0_24px_80px_rgba(33,27,23,0.08)] backdrop-blur">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf1df] text-[#b8925d]">
              <CalendarHeart size={22} aria-hidden="true" />
            </div>
            <h3 className="font-serif-display text-3xl font-semibold text-[#211b17]">{event.title}</h3>
            <div className="mt-6 space-y-4 text-[#776b61]">
              <p className="flex items-center gap-3"><Clock size={18} aria-hidden="true" />{event.time}</p>
              <p className="font-semibold text-[#211b17]">{event.venue}</p>
              <p className="flex items-start gap-3 leading-7"><MapPin className="mt-1 shrink-0" size={18} aria-hidden="true" />{event.address}</p>
            </div>
            <a className="mt-8 inline-flex items-center justify-center rounded-full border border-[#b8925d] px-5 py-3 text-sm font-semibold text-[#211b17] transition hover:bg-[#b8925d] hover:text-white" href={event.mapUrl} target="_blank" rel="noreferrer">
              Ver en Google Maps
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add remaining static components**

Create each remaining static component using typed props from `src/types/wedding.ts`. Ensure each component imports only what it uses and exports a named function.

- [ ] **Step 4: Verify no missing component imports**

Run: `npm run build`

Expected: build can still fail until `App.tsx` is replaced, but component syntax errors should be fixed before moving on.

## Task 4: Build Interactive Components

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/Countdown.tsx`
- Create: `src/components/Gallery.tsx`
- Create: `src/components/RSVPForm.tsx`
- Create: `src/components/FAQ.tsx`

- [ ] **Step 1: Add `Header` with mobile state**

Use `Menu`, `X`, and `Heart` icons from `lucide-react`. Create a `navItems` array with anchor targets and labels. Close the mobile menu in the link `onClick`.

- [ ] **Step 2: Add `Hero`**

Render the first viewport with an image-backed editorial layout, overlay, wedding label, date, primary RSVP button, and secondary map button. Use the first gallery image as the hero background unless a future `heroImage` field is added.

- [ ] **Step 3: Add `Countdown`**

Use `useEffect` and `useState` to update every second. Build a target date from `${weddingDate}T${weddingTime}:00`. Clamp remaining milliseconds to `0`.

- [ ] **Step 4: Add `Gallery` lightbox**

Use `useState<number | null>` for the selected image. Open on image click. Close on backdrop button or close icon. Add an Escape key listener while a selection is active.

- [ ] **Step 5: Add `RSVPForm` validation**

Use local form state. Validate:

```ts
const nextErrors: Record<string, string> = {}
if (!form.name.trim()) nextErrors.name = 'Escribe tu nombre completo.'
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Escribe un email válido.'
if (!form.attending) nextErrors.attending = 'Selecciona si asistirás.'
if (Number(form.guests) < 0) nextErrors.guests = 'La cantidad no puede ser negativa.'
```

On valid submit, set success message to `Gracias por confirmar. Hemos recibido tu respuesta.` and keep the Netlify attributes on the form.

- [ ] **Step 6: Add `FAQ` accordion**

Use `useState<number | null>(0)` so the first item starts open. Toggle the clicked item between open and closed.

- [ ] **Step 7: Verify interactive component syntax**

Run: `npm run build`

Expected: build can still fail only if `App.tsx` is not yet composed; fix any component-level TypeScript errors before moving on.

## Task 5: Compose the App

**Files:**
- Modify: `src/App.tsx`
- Optionally delete: `src/App.css`

- [ ] **Step 1: Replace starter app**

Write `src/App.tsx`:

```tsx
import { Couple } from './components/Couple'
import { Countdown } from './components/Countdown'
import { EventDetails } from './components/EventDetails'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { RSVPForm } from './components/RSVPForm'
import { StoryTimeline } from './components/StoryTimeline'
import { Testimonials } from './components/Testimonials'
import { weddingData } from './data/weddingData'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header coupleDisplayName={weddingData.coupleDisplayName} />
      <main>
        <Hero data={weddingData} />
        <EventDetails ceremony={weddingData.ceremony} reception={weddingData.reception} />
        <Countdown weddingDate={weddingData.weddingDate} weddingTime={weddingData.weddingTime} />
        <Couple bride={weddingData.bride} groom={weddingData.groom} />
        <StoryTimeline story={weddingData.story} />
        <Gallery images={weddingData.gallery} />
        <Testimonials testimonials={weddingData.testimonials} />
        <RSVPForm />
        <FAQ items={weddingData.faq} />
      </main>
      <Footer data={weddingData} />
    </div>
  )
}

export default App
```

- [ ] **Step 2: Remove old CSS import**

Confirm `src/App.tsx` does not import `./App.css`.

- [ ] **Step 3: Build**

Run: `npm run build`

Expected: TypeScript and Vite build complete with exit code 0.

## Task 6: Documentation

**Files:**
- Replace: `README.md`
- Create: `PERSONALIZACION.md`
- Create: `DEPLOY-NETLIFY.md`

- [ ] **Step 1: Replace README**

Include:

- Requirements: Node and npm
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- Edit data in `src/data/weddingData.ts`
- Change images by replacing gallery/person URLs
- Deploy `dist` to Netlify

- [ ] **Step 2: Add personalization guide**

Document editing:

- Names
- Date and time
- Ceremony/reception
- Gallery
- Texts
- RSVP copy
- Colors in `src/index.css` and `theme`
- Google Maps links

- [ ] **Step 3: Add Netlify guide**

Document:

- Run `npm run build`
- Upload `dist` to Netlify Drop
- Netlify Forms caveat for static builds
- Later custom domain configuration

## Task 7: Final Verification

**Files:**
- No code files unless verification exposes issues.

- [ ] **Step 1: Inspect file structure**

Run: `rg --files src`

Expected: all requested files exist under `src/components`, `src/data`, and `src/types`.

- [ ] **Step 2: Build**

Run: `npm run build`

Expected: exit code 0.

- [ ] **Step 3: Lint**

Run: `npm run lint`

Expected: exit code 0. If ESLint fails due generated project config incompatibility, fix the lint errors if they are in project code; report any config-only blocker clearly.

- [ ] **Step 4: Start dev server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 5: Browser verification**

Open the local URL and verify:

- Header anchors scroll to their sections.
- Mobile header can open and close.
- RSVP invalid submission shows validation messages.
- RSVP valid submission shows success message.
- Countdown displays non-negative values and updates.
- Gallery opens and closes a lightbox.
- FAQ accordion toggles.
- Text does not overlap at desktop and mobile widths.

## Self-Review

- Spec coverage: the plan covers architecture, centralized data, all requested components, section behavior, styling, responsive requirements, docs, and final validation.
- Placeholder scan: no `TBD` or `TODO` items are present. The word "placeholder" is used only for approved fictitious content.
- Type consistency: component names and data property names match `WeddingData` and the requested file structure.
- Workspace note: this directory is not a Git repository, so commit steps are intentionally omitted.
