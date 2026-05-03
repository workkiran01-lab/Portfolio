import { motion } from 'framer-motion'
import { useRef } from 'react'

const tags = ['React', 'Vite', 'Tailwind', 'Supabase', 'Groq API', 'Vercel']

const VP = { once: true, amount: 0.2 }

function Tag({ label }) {
  return (
    <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
      {label}
    </span>
  )
}

function ProjectCard({ title, description, tags: cardTags, liveUrl, githubUrl, status, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="relative rounded-2xl border border-slate-800 bg-[#0a0f2e]/60 backdrop-blur-sm p-8 hover:border-[#00d4ff]/30 transition-all duration-300 group will-change-transform"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(0,212,255,0.04),transparent_60%)]" />

      <div className="relative">
        {status === 'live' && (
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 tracking-wider">LIVE</span>
          </div>
        )}
        {status === 'wip' && (
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-mono text-amber-400 tracking-wider">IN PROGRESS</span>
          </div>
        )}

        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed mb-6 text-sm">{description}</p>

        {cardTags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {cardTags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        )}

        {(liveUrl || githubUrl) && (
          <div className="flex gap-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#00d4ff] hover:text-white transition-colors duration-200 flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Site
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const headingRef = useRef()

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 will-change-transform"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-[#00d4ff] uppercase mb-3">
            02. Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Things I've Built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            title="F1 Tax Helper"
            description="AI-powered US tax tool built specifically for F-1 international students. Includes an AI chat assistant (Alex), Form 8843 auto-generator, personalized tax questionnaire, and document checklist. Live and used by real students."
            tags={tags}
            liveUrl="https://f1-tax-helper.vercel.app"
            githubUrl="https://github.com/workkiran01-lab/f1-tax-helper"
            status="live"
            delay={0.1}
          />
          <ProjectCard
            title="Next Project"
            description="Currently scoping a data tool for community organizations that can't afford enterprise software. Early research phase."
            status="wip"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}
