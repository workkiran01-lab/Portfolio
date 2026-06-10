import { useEffect, useRef } from 'react'

export default function CursorGlow({ isMobile }) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    if (isMobile) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2

    // Outer layer — lazy follow
    let ox = tx
    let oy = ty
    // Inner layer — snappy follow
    let ix = tx
    let iy = ty

    let raf

    function onMouseMove(e) {
      tx = e.clientX
      ty = e.clientY
    }

    function tick() {
      ox += (tx - ox) * 0.08
      oy += (ty - oy) * 0.08
      ix += (tx - ix) * 0.25
      iy += (ty - iy) * 0.25

      if (outerRef.current) {
        outerRef.current.style.left = ox + 'px'
        outerRef.current.style.top = oy + 'px'
      }
      if (innerRef.current) {
        innerRef.current.style.left = ix + 'px'
        innerRef.current.style.top = iy + 'px'
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

  const layerBase = {
    position: 'fixed',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 9998,
    top: 0,
    left: 0,
  }

  return (
    <>
      {/* Outer — broad ambient glow */}
      <div
        ref={outerRef}
        style={{
          ...layerBase,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',
        }}
      />
      {/* Inner — tight, snappier core */}
      <div
        ref={innerRef}
        style={{
          ...layerBase,
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
