import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminApp } from './admin/AdminApp'
import { AdminLogin } from './admin/AdminLogin'
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
import { GuestMessagesPage } from './pages/GuestMessagesPage'
import { LiveMessagesScreen } from './pages/LiveMessagesScreen'
import { useAdminAuth } from './admin/hooks/useAdminAuth'
import { useWeddingContent } from './hooks/useWeddingContent'
import type { CSSProperties } from 'react'

function InvitationPage() {
  const { content } = useWeddingContent()
  const themeStyle = {
    '--color-ivory': content.theme.ivory,
    '--color-paper': content.theme.paper,
    '--color-ivory-soft': content.theme.linen,
    '--color-gold': content.theme.gold,
    '--color-ink': content.theme.ink,
    '--color-ink-muted': content.theme.muted,
  } as CSSProperties

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbf6ec] text-[#211b17]" style={themeStyle}>
      <Header
        brideName={content.brideName}
        groomName={content.groomName}
        coupleDisplayName={content.coupleDisplayName}
      />
      <main>
        <Hero data={content} />
        <EventDetails ceremony={content.ceremony} reception={content.reception} />
        <Countdown
          weddingDate={content.weddingDate}
          weddingTime={content.weddingTime}
          coupleDisplayName={content.coupleDisplayName}
          ceremony={content.ceremony}
        />
        <Couple bride={content.bride} groom={content.groom} />
        <StoryTimeline story={content.story} />
        <Gallery images={content.gallery} video={content.galleryVideo} />
        <Testimonials testimonials={content.testimonials} />
        <RSVPForm content={content.rsvp} contactPhone={content.contact.phone} coupleDisplayName={content.coupleDisplayName} />
        <FAQ items={content.faq} />
      </main>
      <Footer data={content} />
    </div>
  )
}

function ProtectedAdminRoute() {
  const { isAuthenticated } = useAdminAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <AdminApp />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<InvitationPage />} />
      <Route path="/mensajes" element={<GuestMessagesPage />} />
      <Route path="/pantalla-mensajes" element={<LiveMessagesScreen />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<ProtectedAdminRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
