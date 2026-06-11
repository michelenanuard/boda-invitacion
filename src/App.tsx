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
        <RSVPForm content={weddingData.rsvp} />
        <FAQ items={weddingData.faq} />
      </main>
      <Footer data={weddingData} />
    </div>
  )
}

export default App
