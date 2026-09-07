import { motion } from 'framer-motion'
import { useMotionSettings } from './MotionSettings'
export default function Reveal({ children, className = '', delay = 0 }) {
  const { enabled } = useMotionSettings()
  return (
    <motion.div
      className={className}
      initial={enabled ? { opacity: 0, y: 44, filter: 'blur(5px)' } : false}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: enabled ? 0.85 : 0,
        delay: enabled ? delay : 0,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
