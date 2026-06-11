# Wedding Invitation Landing Design

Date: 2026-06-11

## Goal

Build an original, editable, responsive wedding invitation landing page inspired by the structure and romantic premium feel of Amelia & James, without copying proprietary code, WordPress implementation details, plugins, or protected external images.

The project will remain a frontend-only Vite app using React, TypeScript, Tailwind CSS, and lucide-react. It must run with `npm run dev` and build with `npm run build`.

## Content Strategy

The first implementation will use fictitious placeholder wedding data so the site works as a reusable template. All wedding-specific information must be centralized in `src/data/weddingData.ts`.

Editable data includes:

- Couple names and display name
- Wedding date and time
- Hero title and subtitle
- Hashtag
- Ceremony and reception details
- Bride and groom profile cards
- Story timeline
- Gallery image list
- Testimonials
- FAQ items
- Contact details
- Theme colors if useful

Components should not hardcode wedding content except for stable UI labels such as form field names or button labels.

## Visual Direction

Use an editorial premium romantic style:

- Warm ivory and white backgrounds
- Soft beige surfaces
- Muted gold accents
- Warm black body text
- Delicate shadows and subtle borders
- Elegant serif headings paired with a clean sans-serif UI font
- Hero with an elegant visual background and overlay

The design should feel like a high-quality digital wedding invitation, not a generic SaaS landing page. It should avoid copying the referenced theme's code, exact layout, or image assets.

## Information Architecture

The landing page will be a single-page app with smooth-scroll anchors:

- `inicio`
- `historia`
- `galeria`
- `preguntas`
- `rsvp`

The header will expose the requested menu labels:

- Inicio
- Nuestra Historia
- Galería
- Preguntas
- RSVP

It will also include a primary CTA: Confirmar Asistencia.

## Component Architecture

Create or replace the app with this structure:

```text
src/
  assets/
    images/
  components/
    Header.tsx
    Hero.tsx
    EventDetails.tsx
    Countdown.tsx
    Couple.tsx
    StoryTimeline.tsx
    Gallery.tsx
    Testimonials.tsx
    RSVPForm.tsx
    FAQ.tsx
    Footer.tsx
    SectionTitle.tsx
  data/
    weddingData.ts
  types/
    wedding.ts
  App.tsx
  main.tsx
  index.css
```

`App.tsx` composes the page. Each section component receives typed data from `weddingData.ts`, or imports the central data directly only where that matches the final implementation style cleanly.

## Section Behavior

### Header

Sticky or fixed top header with translucent warm background, text logo, desktop navigation, mobile hamburger menu, and CTA. Mobile menu closes when a link is selected.

### Hero

Displays:

- Small label: "La boda de"
- Large couple title
- Subtitle
- Wedding date
- CTA to RSVP
- CTA to location
- Elegant background image or visual placeholder with overlay

### Event Details

Two event cards:

- Ceremony
- Reception

Each card shows time, venue, address, and Google Maps button.

### Countdown

Calculates days, hours, minutes, and seconds dynamically from the configured wedding date and time. If the date has passed, it should not show negative values.

### Couple

Bride and groom cards with image placeholder, name, and editable description.

### Story Timeline

Vertical timeline with four editable events:

- First meeting
- First date
- Proposal
- Wedding day

### Gallery

Responsive grid with eight editable image entries. Clicking an image opens a simple lightbox/modal. The modal can be closed with a close button, backdrop click, or Escape key if implemented cleanly.

### Testimonials

Three message cards with quote text, author name, and family relationship.

### RSVP

Frontend-only RSVP form with:

- Full name
- Phone
- Email
- Attendance: yes/no
- Guest count
- Message

Validation should cover required name, valid email, attendance selection, and non-negative guest count. On submit, show a success message and reset or preserve the form in a clear state.

The form must be prepared for Netlify Forms:

- `name="rsvp"`
- `data-netlify="true"`
- hidden `form-name` field

### FAQ

Accordion powered by editable FAQ data:

- Dress code
- Plus-one policy
- Ceremony location
- Parking
- RSVP deadline

### Footer

Displays couple names, date, hashtag, contact, location, and quick links.

## Styling and Responsiveness

Use Tailwind utility classes and global CSS for theme foundations, imported fonts, CSS variables, and smooth scrolling.

The app must be responsive across:

- iPhone
- Android
- Tablet
- Laptop
- Desktop

Layout must avoid text overlap, oversized controls, and unstable grids. Cards should remain restrained, with subtle radius and spacing.

## Documentation

Update or create:

- `README.md`: install, run locally, customize data, change images, build, publish to Netlify, upload folder
- `PERSONALIZACION.md`: edit names, date, places, gallery, texts, RSVP, colors, map links
- `DEPLOY-NETLIFY.md`: build, Netlify Drop, Netlify Forms, custom domain

## Validation Plan

Before claiming completion:

- Verify imports and file structure
- Confirm requested components exist
- Run TypeScript/build with `npm run build`
- Run lint with `npm run lint` if the configured project supports it
- Start `npm run dev`
- Check the app in browser when available
- Verify menu anchors
- Verify RSVP success state
- Verify countdown updates
- Verify gallery lightbox
- Verify FAQ accordion

## Constraints

- Do not use WordPress, PHP, MySQL, LocalWP, or plugins.
- Do not copy proprietary theme code.
- Do not copy protected external images.
- Do not add unnecessary heavy libraries.
- Keep the implementation original, editable, and suitable for future Netlify deployment.

## Notes

The workspace is not currently a Git repository, so the design spec cannot be committed unless Git is initialized later.
