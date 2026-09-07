import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import HeroOverlay from './components/HeroOverlay'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import TimelineSection from './components/TimelineSection'
import ContactSection from './components/ContactSection'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 })
  const reducedMotion = useReducedMotion()
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {!reducedMotion && (
        <motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" />
      )}
      <Nav />
      <main id="main" tabIndex={-1}>
        <HeroOverlay />
        <ProjectsSection />
        <AboutSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <footer className="site-footer container">
        <a href="#home" className="wordmark" aria-label="Kiran Shahi, back to top">
          kiran<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Kiran Shahi</p>
        <a href="https://github.com/workkiran01-lab/Portfolio" target="_blank" rel="noreferrer">
          Built with React. Made with care.
        </a>
      </footer>
    </MotionConfig>
  )
}
