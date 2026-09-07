import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionSettings } from './MotionSettings'
function Word({ children, progress, start, end }) {
  const { enabled } = useMotionSettings()
  const opacity = useTransform(progress, [start, end], [0.18, 1])
  return <motion.span style={enabled ? { opacity } : undefined}>{children} </motion.span>
}
export default function WordReveal({ text }) {
  const ref = useRef(null)
  const words = text.split(' ')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  return (
    <p ref={ref} className="word-reveal" aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            start={i / words.length}
            end={(i + 1) / words.length}
          >
            {word}
          </Word>
        ))}
      </span>
    </p>
  )
}
