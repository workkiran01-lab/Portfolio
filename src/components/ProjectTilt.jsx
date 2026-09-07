import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { useMotionSettings } from './MotionSettings'

export default function ProjectTilt({ children, className = '', id }) {
  const ref = useRef(null)
  const { enabled } = useMotionSettings()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const lightX = useMotionValue(50)
  const lightY = useMotionValue(50)
  const rotateX = useSpring(x, { stiffness: 160, damping: 22 })
  const rotateY = useSpring(y, { stiffness: 160, damping: 22 })
  const background = useMotionTemplate`radial-gradient(550px circle at ${lightX}% ${lightY}%, rgba(125,112,255,.16), transparent 70%)`
  function move(event) {
    if (!enabled || event.pointerType !== 'mouse') return
    const box = ref.current.getBoundingClientRect()
    const px = (event.clientX - box.left) / box.width
    const py = (event.clientY - box.top) / box.height
    x.set((0.5 - py) * 4)
    y.set((px - 0.5) * 4)
    lightX.set(px * 100)
    lightY.set(py * 100)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.article
      ref={ref}
      id={id}
      className={`tilt-card ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1400 } : undefined}
    >
      {enabled && (
        <motion.div className="card-spotlight" style={{ background }} aria-hidden="true" />
      )}
      {children}
    </motion.article>
  )
}
