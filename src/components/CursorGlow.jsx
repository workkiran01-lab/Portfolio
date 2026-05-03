import { useEffect, useRef } from 'react'

export default function CursorGlow({ isMobile }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isMobile) return

    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2
    let tx = cx
    let ty = cy
    let raf

    function onMouseMove(e) {
      tx = e.clientX
      ty = e.clientY
    }

    function tick() {
      cx += (tx - cx) * 0.1
      cy += (ty - cy) * 0.1
      if (ref.current) {
        ref.current.style.left = cx + 'px'
        ref.current.style.top = cy + 'px'
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9998,
        top: 0,
        left: 0,
      }}
    />
  )
}
