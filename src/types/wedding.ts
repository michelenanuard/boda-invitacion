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
  note?: string
}

export type PersonProfile = {
  name: string
  role: 'bride' | 'groom'
  roleLabel: string
  image: string
  description: string
  parents?: string
}

export type StoryEvent = {
  year: string
  title: string
  description: string
}

export type GalleryImage = {
  id: string
  src: string
  alt: string
  caption: string
}

export type GalleryVideo = {
  title: string
  caption: string
  poster: string
  src?: string
}

export type Testimonial = {
  message: string
  name: string
  relation: string
}

export type FAQItem = {
  id: string
  question: string
  answer: string
}

export type WeddingContact = {
  email: string
  phone: string
  location: string
}

export type RSVPOption = {
  label: string
  value: string
}

export type RSVPContent = {
  title: string
  description: string
  successMessage: string
  submitLabel: string
  attendanceOptions: RSVPOption[]
}

export type WeddingData = {
  brideName: string
  groomName: string
  coupleDisplayName: string
  weddingDate: string
  weddingTime: string
  displayDate: string
  hashtag: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  ceremony: WeddingEvent
  reception: WeddingEvent
  bride: PersonProfile
  groom: PersonProfile
  story: StoryEvent[]
  gallery: GalleryImage[]
  galleryVideo: GalleryVideo
  testimonials: Testimonial[]
  faq: FAQItem[]
  rsvp: RSVPContent
  contact: WeddingContact
  theme: WeddingTheme
}
