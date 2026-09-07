import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMotionSettings } from './MotionSettings'

// All shapes share the same particle count, allowing the vertex shader to morph
// between them without rebuilding geometry or updating particle buffers per frame.
function makeParticles(count) {
  const knot = new Float32Array(count * 3)
  const globe = new Float32Array(count * 3)
  const galaxy = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2
    const tube = i * goldenAngle
    const radius = 2 + 0.65 * Math.cos(3 * t)
    knot.set(
      [
        (radius + 0.22 * Math.cos(tube)) * Math.cos(2 * t),
        (radius + 0.22 * Math.cos(tube)) * Math.sin(2 * t),
        0.85 * Math.sin(3 * t) + 0.22 * Math.sin(tube)
      ],
      i * 3
    )
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    globe.set([Math.cos(tube) * ring * 2.4, y * 2.4, Math.sin(tube) * ring * 2.4], i * 3)
    const r = Math.sqrt(i / count) * 4
    const angle = tube + r * 1.2
    galaxy.set([Math.cos(angle) * r, Math.sin(angle) * r * 0.5, Math.sin(tube * 3) * 0.4], i * 3)
    seeds[i] = ((i * 16807) % 2147483647) / 2147483647 + (i % 17) / 17
  }
  return { knot, globe, galaxy, seeds }
}

const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  uniform float uPixelRatio;
  attribute vec3 aGlobe;
  attribute vec3 aGalaxy;
  attribute float aSeed;
  varying float vSeed;
  varying float vDepth;
  void main() {
    vec3 p = mix(position, aGlobe, smoothstep(0.0, 1.0, uMorph));
    p = mix(p, aGalaxy, smoothstep(1.0, 2.0, uMorph));
    p += normalize(p + vec3(0.001)) * sin(uTime * 0.65 + aSeed * 20.0) * 0.065;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp((9.0 + 12.0 * fract(aSeed * 13.0)) * uPixelRatio / -mv.z, 1.0, 7.0);
    vSeed = aSeed;
    vDepth = clamp(1.1 + mv.z * 0.07, 0.25, 1.0);
  }
`
const fragmentShader = `
  uniform float uTime;
  varying float vSeed;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 1.7);
    vec3 cyan = vec3(0.22, 0.85, 1.0);
    vec3 violet = vec3(0.57, 0.30, 1.0);
    vec3 color = mix(cyan, violet, smoothstep(0.2, 0.9, fract(vSeed * 7.0)));
    color += vec3(0.25) * pow(glow, 4.0);
    float shimmer = 0.75 + 0.25 * sin(uTime * 0.7 + vSeed * 30.0);
    gl_FragColor = vec4(color, glow * vDepth * shimmer);
  }
`

function Sculpture({ compact, enabled, phase, pointer }) {
  const group = useRef(null)
  const rings = useRef(null)
  const time = useRef(0)
  const particles = useMemo(() => makeParticles(compact ? 1700 : 3600), [compact])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) }
    }),
    []
  )
  useFrame((_, delta) => {
    // Cap delta after switching tabs so the animation resumes without jumping.
    const dt = Math.min(delta, 0.05)
    if (enabled) time.current += dt
    const t = time.current
    uniforms.uTime.value = t
    const target = phase.current
    uniforms.uMorph.value = THREE.MathUtils.damp(uniforms.uMorph.value, target.morph, 3, dt)
    if (group.current) {
      group.current.rotation.y = t * 0.09 + (enabled ? pointer.current.x * 0.18 : 0)
      group.current.rotation.z = Math.sin(t * 0.1) * 0.16 - 0.28
      group.current.rotation.x = Math.sin(t * 0.12) * 0.12 + 0.25
      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        compact ? 0 : target.x,
        2.5,
        dt
      )
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y,
        compact ? 0.45 : 0,
        2.5,
        dt
      )
    }
    if (rings.current) {
      rings.current.rotation.z = t * 0.045
      rings.current.rotation.y = Math.sin(t * 0.08) * 0.35
    }
  })
  return (
    <group ref={group} position={[compact ? 0 : 2, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles.knot, 3]} />
          <bufferAttribute attach="attributes-aGlobe" args={[particles.globe, 3]} />
          <bufferAttribute attach="attributes-aGalaxy" args={[particles.galaxy, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[particles.seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <group ref={rings}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.5, i * 0.6, i * 0.7]}>
            <torusGeometry args={[3.05 + i * 0.14, 0.005, 6, compact ? 90 : 160]} />
            <meshBasicMaterial
              color={i === 1 ? '#a68bff' : '#5bddff'}
              transparent
              opacity={0.2}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function HeroScene() {
  const { enabled } = useMotionSettings()
  const phase = useRef({ morph: 0, x: 2 })
  const pointer = useRef({ x: 0, y: 0 })
  const [compact, setCompact] = useState(() => window.innerWidth < 760)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const resize = () => setCompact(window.innerWidth < 760)
    const move = (event) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1
      }
    }
    const visibility = () => setVisible(!document.hidden)
    const scroll = () => {
      const journey = document.getElementById('journey')
      const projects = document.getElementById('projects')
      if (!journey || !projects) return
      const view = window.innerHeight
      const journeyTop = journey.getBoundingClientRect().top
      const projectTop = projects.getBoundingClientRect().top
      const toGlobe = THREE.MathUtils.clamp((view * 0.85 - journeyTop) / view, 0, 1)
      const toGalaxy = THREE.MathUtils.clamp((view - projectTop) / view, 0, 1)
      phase.current = { morph: toGlobe + toGalaxy, x: 2 - toGlobe * 4 + toGalaxy * 3.5 }
    }
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', scroll, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    scroll()
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', scroll)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])
  return (
    <div className="scene-layer" aria-hidden="true">
      <div className="scene-atmosphere" />
      {!failed && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, compact ? 11 : 9], fov: 48 }}
              dpr={[1, 1.5]}
              frameloop={enabled && visible ? 'always' : 'demand'}
              gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', () => setFailed(true), {
                  once: true
                })
              }}
            >
              <Sculpture
                compact={compact}
                enabled={enabled && visible}
                phase={phase}
                pointer={pointer}
              />
            </Canvas>
          </Suspense>
        </SceneBoundary>
      )}
      <div className="scene-shade" />
    </div>
  )
}
