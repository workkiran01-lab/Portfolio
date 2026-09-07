import { lazy, Suspense } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { MotionSettings, useMotionSettings } from './components/MotionSettings'
import Nav from './components/Nav'
import HeroOverlay from './components/HeroOverlay'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import TimelineSection from './components/TimelineSection'
import ContactSection from './components/ContactSection'
const HeroScene = lazy(() => import('./components/HeroScene'))

function Portfolio() {
  const { enabled } = useMotionSettings()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 })
  return (
    <MotionConfig reducedMotion={enabled ? 'never' : 'always'}>
      <div className={`portfolio ${enabled ? 'motion-on' : 'motion-off'}`}>
        <Suspense
          fallback={
            <div className="scene-layer">
              <div className="scene-atmosphere" />
            </div>
          }
        >
          <HeroScene />
        </Suspense>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {enabled && (
          <motion.div
            className="reading-progress"
            style={{ scaleX: progress }}
            aria-hidden="true"
          />
        )}
        <Nav />
        <main id="main" tabIndex={-1}>
          <HeroOverlay />
          <TimelineSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
        </main>
        <footer className="site-footer container">
          <a href="#home" className="wordmark" aria-label="Kiran Shahi, back to top">
            KS<span>.</span>
          </a>
          <p>© {new Date().getFullYear()} Kiran Shahi</p>
          <a href="https://github.com/workkiran01-lab/Portfolio" target="_blank" rel="noreferrer">
            The source behind the experience <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </MotionConfig>
  )
}
export default function App() {
  return (
    <MotionSettings>
      <Portfolio />
    </MotionSettings>
  )
}
