import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '../hooks/useScrollProgress'

// ─── helpers ────────────────────────────────────────────────────────────────

function lerp(a, b, t) {
  return a + (b - a) * t
}

function buildLayer(count, { dimmer = false, cyanBias = false } = {}) {
  const positions = new Float32Array(count * 3)
  const colors    = new Float32Array(count * 3)
  const sizes     = new Float32Array(count)

  const cyan  = new THREE.Color('#00d4ff')
  const navy  = new THREE.Color('#1e40af')
  const white = new THREE.Color('#e2e8f0')
  const dim   = new THREE.Color('#3b5fd4')

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 200
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200
    positions[i * 3 + 2] = (Math.random() - 0.5) * 120

    const roll = Math.random()
    let c
    if (cyanBias) {
      c = roll < 0.12 ? cyan : roll < 0.3 ? white : roll < 0.55 ? navy : dim
    } else {
      c = roll < 0.03 ? cyan : roll < 0.12 ? white : roll < 0.35 ? navy : dim
    }

    const brightness = dimmer ? 0.55 : 1
    colors[i * 3]     = c.r * brightness
    colors[i * 3 + 1] = c.g * brightness
    colors[i * 3 + 2] = c.b * brightness

    sizes[i] = Math.random() * (dimmer ? 1.8 : 2.5) + 0.3
  }

  return { positions, colors, sizes }
}

// ─── camera: scroll pull-back + tilt + smooth mouse ─────────────────────────

function CameraController({ scrollRef, mouseRef, smoothMouse }) {
  useFrame(({ camera }) => {
    // Update smooth mouse (used by StarLayers too)
    smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * 0.03
    smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * 0.03

    const s = scrollRef.current
    const targetZ  = lerp(50, 70, s)
    const targetRX = lerp(0, -0.12, s)

    camera.position.z += (targetZ  - camera.position.z)  * 0.05
    camera.rotation.x += (targetRX - camera.rotation.x)  * 0.05
  })

  return null
}

// ─── single star layer ───────────────────────────────────────────────────────

function StarLayer({ origins, baseSizes, colors, scrollRef, smoothMouse, parallaxFactor, ptSize, opacityBase }) {
  const pointsRef  = useRef()
  const materialRef = useRef()

  const dotTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(32, 32, 32, 0, Math.PI * 2)
    ctx.fill()
    return new THREE.CanvasTexture(canvas)
  }, [])

  // Stable mutable position buffer — same reference as bufferAttribute.array
  const currentPos = useMemo(() => new Float32Array(origins), [origins])
  const sizeBuffer = useMemo(() => new Float32Array(baseSizes), [baseSizes])

  const count = origins.length / 3

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current) return

    const t    = clock.getElapsedTime()
    const s    = scrollRef.current
    const mx   = smoothMouse.current.x
    const my   = smoothMouse.current.y
    const geom = pointsRef.current.geometry
    const posAttr  = geom.attributes.position  // posAttr.array === currentPos
    const sizeAttr = geom.attributes.size

    // ── particle reactions ──────────────────────────────────────────────────
    const LERP_POS = 0.025

    for (let i = 0; i < count; i++) {
      const ox = origins[i * 3]
      const oy = origins[i * 3 + 1]
      const oz = origins[i * 3 + 2]

      let tx, ty, tz

      if (s <= 0.3) {
        // Normal — drift back to origin
        tx = ox; ty = oy; tz = oz
      } else if (s <= 0.6) {
        // Converge toward center
        const p = (s - 0.3) / 0.3
        const f = 1 - p * 0.85
        tx = ox * f; ty = oy * f; tz = oz * f
      } else {
        // Explode outward
        const p = (s - 0.6) / 0.4
        const f = 1 + p * 1.5
        tx = ox * f; ty = oy * f; tz = oz * f
      }

      currentPos[i * 3]     += (tx - currentPos[i * 3])     * LERP_POS
      currentPos[i * 3 + 1] += (ty - currentPos[i * 3 + 1]) * LERP_POS
      currentPos[i * 3 + 2] += (tz - currentPos[i * 3 + 2]) * LERP_POS
    }
    posAttr.needsUpdate = true

    // ── twinkle (~20% of stars) ─────────────────────────────────────────────
    for (let i = 0; i < count; i++) {
      if (i % 5 === 0) {
        sizeAttr.array[i] = baseSizes[i] * (0.6 + 0.4 * Math.abs(Math.sin(t * (0.5 + i * 0.001))))
      }
    }
    sizeAttr.needsUpdate = true

    // ── opacity fade during explode phase ───────────────────────────────────
    let targetOpacity = opacityBase
    if (s > 0.6) {
      const p = (s - 0.6) / 0.4
      targetOpacity = lerp(opacityBase, 0.3, p)
    }
    materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.05

    // ── mouse parallax via mesh rotation ───────────────────────────────────
    const pf = parallaxFactor
    const targetRY = mx * pf * 0.8 + Math.sin(t * 0.05) * 0.02
    const targetRX = my * pf * 0.6 + Math.cos(t * 0.04) * 0.015
    pointsRef.current.rotation.y += (targetRY - pointsRef.current.rotation.y) * 0.08
    pointsRef.current.rotation.x += (targetRX - pointsRef.current.rotation.x) * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPos, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizeBuffer, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={dotTexture}
        alphaTest={0.01}
        size={ptSize}
        sizeAttenuation
        vertexColors
        transparent={true}
        opacity={opacityBase}
        depthWrite={false}
      />
    </points>
  )
}

// ─── nebula layer ────────────────────────────────────────────────────────────

function makeGradientTexture(inner, mid, outer) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width  = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  grad.addColorStop(0,    inner)
  if (mid) grad.addColorStop(0.45, mid)
  grad.addColorStop(1,    outer)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  return tex
}

function NebulaLayer() {
  const meshRefs = [useRef(), useRef(), useRef()]

  const cyanTex   = useMemo(() => makeGradientTexture('rgba(34,211,238,0.45)', 'rgba(30,58,138,0.2)', 'rgba(0,0,0,0)'), [])
  const violetTex = useMemo(() => makeGradientTexture('rgba(139,92,246,0.35)', 'rgba(79,42,138,0.12)', 'rgba(0,0,0,0)'), [])

  useFrame(() => {
    meshRefs[0].current && (meshRefs[0].current.rotation.z += 0.00015)
    meshRefs[1].current && (meshRefs[1].current.rotation.z += 0.00015)
    meshRefs[2].current && (meshRefs[2].current.rotation.z += 0.00015)
  })

  return (
    <>
      <mesh ref={meshRefs[0]} position={[-6, 3, -15]} scale={[20, 20, 1]} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={cyanTex} transparent={true} depthTest={false} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={meshRefs[1]} position={[7, -2, -18]} scale={[18, 18, 1]} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={violetTex} transparent={true} depthTest={false} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={meshRefs[2]} position={[1, -6, -12]} scale={[14, 14, 1]} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={cyanTex} transparent={true} opacity={0.75} depthTest={false} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

// ─── scene root ──────────────────────────────────────────────────────────────

function SceneContent({ scrollRef }) {
  const mouseRef   = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handle = (e) => {
      mouseRef.current = {
        x:  (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  // Background layer: 2500 stars — smaller, dimmer, less parallax
  const bg = useMemo(() => buildLayer(2500, { dimmer: true,  cyanBias: false }), [])
  // Foreground layer: 1500 stars — slightly larger, brighter, cyan-tinted, more parallax
  const fg = useMemo(() => buildLayer(1500, { dimmer: false, cyanBias: true  }), [])

  return (
    <>
      <CameraController scrollRef={scrollRef} mouseRef={mouseRef} smoothMouse={smoothMouse} />

      {/* Nebula glows — rendered first so they sit behind both star layers */}
      <NebulaLayer />

      {/* BG layer: slow parallax */}
      <StarLayer
        origins={bg.positions}
        baseSizes={bg.sizes}
        colors={bg.colors}
        scrollRef={scrollRef}
        smoothMouse={smoothMouse}
        parallaxFactor={0.05}
        ptSize={0.6}
        opacityBase={0.7}
      />

      {/* FG layer: faster parallax, brighter */}
      <StarLayer
        origins={fg.positions}
        baseSizes={fg.sizes}
        colors={fg.colors}
        scrollRef={scrollRef}
        smoothMouse={smoothMouse}
        parallaxFactor={0.1}
        ptSize={0.95}
        opacityBase={0.95}
      />
    </>
  )
}

// ─── export ──────────────────────────────────────────────────────────────────

export default function HeroScene() {
  const scrollRef = useScrollProgress()

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: false, alpha: false }}
        style={{ background: 'linear-gradient(180deg, #020817 0%, #0a0f2e 50%, #020817 100%)' }}
      >
        <SceneContent scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
