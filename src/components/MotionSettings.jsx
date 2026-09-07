import { createContext, useContext, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const MotionContext = createContext(null)
export function MotionSettings({ children }) {
  const reducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  return (
    <MotionContext.Provider
      value={{ enabled: !reducedMotion && !paused, paused, setPaused, reducedMotion }}
    >
      {children}
    </MotionContext.Provider>
  )
}
export function useMotionSettings() {
  return useContext(MotionContext)
}
