import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const VP = { once: true, amount: 0.2 }

const stats = [
  { value: 3.57, decimals: 2, label: 'GPA' },
  { value: 2, decimals: 0, label: 'Products Shipped' },
  { value: 2024, decimals: 0, label: 'In the US Since', noComma: true },
]

const skillGroups = [
  {
    label: 'Languages',
    tags: ['Python', 'JavaScript', 'SQL', 'Java', 'C++'],
  },
  {
    label: 'Frameworks & Tools',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Supabase', 'Git', 'Vercel'],
  },
  {
    label: 'Concepts',
    tags: ['Data Structures', 'REST APIs', 'Machine Learning (intro)', 'Database Design', 'UI/UX Fundamentals'],
  },
]

// Shared skill-tag style — single source of truth
const TAG_STYLE = {
  background: 'rgba(34,211,238,0.08)',
  border: '1px solid rgba(34,211,238,0.2)',
  color: 'var(--accent)',
  borderRadius: '9999px',
  padding: '4px 14px',
  fontSize: '13px',
  display: 'inline-block',
}

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

// Count-up via rAF + easeOutExpo over 1.4s. Jumps straight to the
// final value when prefers-reduced-motion is set.
function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(target)
      return
    }

    let raf
    const t0 = performance.now()

    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      setValue(target * easeOutExpo(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value
}

function formatStat(value, decimals, noComma) {
  const fixed = value.toFixed(decimals)
  if (noComma) return fixed
  const [int, frac] = fixed.split('.')
  const grouped = Number(int).toLocaleString('en-US')
  return frac ? `${grouped}.${frac}` : grouped
}

function StatCard({ value, decimals, label, noComma, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const current = useCountUp(value, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="text-center p-5 rounded-2xl border border-slate-800 bg-[#0a0f2e]/50 hover:border-[#22d3ee]/40 transition-colors duration-300 will-change-transform"
    >
      <div className="text-3xl font-black text-[#22d3ee] mb-1">
        {formatStat(current, decimals, noComma)}
      </div>
      <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">{label}</div>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 will-change-transform"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-[#22d3ee] uppercase mb-3">
            02. About
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            From Kathmandu
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">
              to California
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="space-y-5 text-slate-400 leading-relaxed will-change-transform"
          >
            <p>
              I'm a Computer Science student at Cypress College, originally from Kathmandu, Nepal.
            </p>
            <p>
              Moving to California alone at 19 was a crash course in figuring things out without
              a manual. That experience shapes how I think about building software. I'm drawn to
              problems where the gap between "this exists" and "the right people can actually use it"
              is too wide.
            </p>
            <p>
              F1 Tax Helper came from that. Tax season blindsided me as an international student.
              No one warns you. So I built something: an AI-powered tool that walks F-1 students
              through US taxes and auto-generates Form 8843. Real students use it now.
            </p>
            <p>
              Outside of projects, I work with the International Student Program at Cypress College
              helping new arrivals get settled. I'm transferring to a 4-year university and looking
              for opportunities where good engineering and real impact overlap.
            </p>

            <div className="pt-2">
              <p className="text-sm text-slate-500 mb-1 font-mono">Currently at</p>
              <p className="text-white font-semibold">Cypress College</p>
              <p className="text-slate-400 text-sm">Student Service Assistant · International Student Program</p>
              <p className="text-[#22d3ee] text-sm mt-1">
                CSULB · Fall 2026 →{' '}
                <span
                  aria-hidden="true"
                  className="terminal-cursor inline-block w-2 h-4 bg-[#22d3ee] align-middle"
                />
              </p>
            </div>
          </motion.div>

          {/* Right — stats + skill tag cloud */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="space-y-4 will-change-transform"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.25 + i * 0.1} />
              ))}
            </div>

            {/* Skill tag cloud */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="space-y-5 will-change-transform"
            >
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-2">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        style={TAG_STYLE}
                        whileHover={{ y: -2, borderColor: 'rgba(34,211,238,0.55)' }}
                        transition={{ duration: 0.2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
