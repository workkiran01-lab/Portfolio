import { useMemo, useState } from 'react'
import HeroScene from './components/HeroScene'
import MobileFallback from './components/MobileFallback'
import Nav from './components/Nav'
import HeroOverlay from './components/HeroOverlay'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import TimelineSection from './components/TimelineSection'
import Loader from './components/Loader'

export default function App() {
  const [loading, setLoading] = useState(true)

  const isMobile = useMemo(
    () =>
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || navigator.hardwareConcurrency <= 2),
    []
  )

  return (
    <div className="bg-[#020817] min-h-screen">
      {loading && <Loader onDone={() => setLoading(false)} />}
      {/* 3D starfield — swapped for CSS fallback on mobile / low-end */}
      {isMobile ? <MobileFallback /> : <HeroScene />}

      {/* Fixed nav over the canvas */}
      <Nav />

      {/* Hero section — full viewport height, content sits above canvas */}
      <div className="relative z-10 min-h-screen">
        <HeroOverlay />
      </div>

      {/* Scroll content — solid background so it covers the fixed canvas */}
      <div className="relative z-10 bg-[#020817]">
        <ProjectsSection />
        <AboutSection />
        <TimelineSection />
        <ContactSection />
      </div>
    </div>
  )
}
