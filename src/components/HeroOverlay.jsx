import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionSettings } from './MotionSettings'
import Icon from './Icon'

const ease = [0.22, 1, 0.36, 1]
function NameLine({ text, offset = 0, outline = false }) {
  const { enabled } = useMotionSettings()
  return (
    <span className={`name-line ${outline ? 'name-outline' : ''}`} aria-hidden="true">
      {[...text].map((letter, i) => (
        <motion.span
          key={i}
          initial={enabled ? { y: '110%', rotate: 7, opacity: 0 } : false}
          animate={{ y: '0%', rotate: 0, opacity: 1 }}
          transition={{
            duration: enabled ? 1.1 : 0,
            delay: enabled ? 0.15 + offset + i * 0.065 : 0,
            ease
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}
export default function HeroOverlay() {
  const ref = useRef(null)
  const { enabled } = useMotionSettings()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 170])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const intro = {
    initial: enabled ? { opacity: 0, y: 20 } : false,
    animate: { opacity: 1, y: 0 },
    transition: { delay: enabled ? 0.9 : 0, duration: enabled ? 0.8 : 0 }
  }
  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-orbit-label" aria-hidden="true">
        <span className="orbit-cross">+</span> IDEAS IN MOTION{' '}
        <span className="orbit-cross">+</span>
      </div>
      <motion.div className="hero-inner container" style={enabled ? { y, opacity } : undefined}>
        <motion.div className="hero-topline" {...intro}>
          <p className="eyebrow">KATHMANDU → CALIFORNIA</p>
          <a className="availability" href="#contact">
            <span /> OPEN TO INTERNSHIPS
          </a>
        </motion.div>
        <h1 id="hero-title" className="hero-name" aria-label="Kiran Shahi">
          <NameLine text="KIRAN" />
          <NameLine text="SHAHI" offset={0.18} outline />
          <span className="hero-name-dot" aria-hidden="true">
            .
          </span>
        </h1>
        <motion.div className="hero-intro" {...intro}>
          <p className="hero-role">
            Developer. Student. <span>Always building.</span>
          </p>
          <p>
            I turn unfamiliar problems into useful software.
            <br className="desktop-break" /> Computer Science at CSULB. A growing curiosity for AI.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#projects">
              Explore my work <Icon />
            </a>
            <a className="button button-outline" href="#journey">
              Follow the journey <Icon name="down" size={17} />
            </a>
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="hero-bottom container" {...intro}>
        <a className="scroll-cue" href="#journey">
          <span className="scroll-line" aria-hidden="true" />
          <span>SCROLL TO DISCOVER</span>
        </a>
        <p>REACT / PYTHON / REAL-WORLD PROBLEMS</p>
        <span className="hero-index">01 — 05</span>
      </motion.div>
    </section>
  )
}
