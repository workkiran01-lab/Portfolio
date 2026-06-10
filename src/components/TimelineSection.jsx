import { motion } from 'framer-motion'

const VP = { once: true, amount: 0.2 }

const entries = [
  {
    year: '2026 · Spring',
    title: 'Data Management Project',
    subtitle: 'International Student Program, Cypress College',
    description: 'Leading data management work for the ISP office — organizing and maintaining student records and program data.',
  },
  {
    year: '2025 · Summer — Present',
    title: 'Student Service Assistant · Part Time',
    subtitle: 'International Student Program, Cypress College',
    description: 'Helping new international arrivals navigate life in the US — especially students from Nepal who remind me of myself.',
  },
  {
    year: '2024 · Fall — Present',
    title: 'Transferred to Cypress College',
    subtitle: 'Cypress College, Cypress CA',
    description: 'Transferred to study Computer Science. GPA 3.57 and building.',
  },
  {
    year: '2024 · Spring',
    title: 'Arrived in the US',
    subtitle: 'Webster University',
    description: 'Left Kathmandu alone at 19. First stop: Webster University. Figured it out.',
  },
  {
    year: 'In Progress',
    title: 'F1 Tax Helper',
    subtitle: 'Side Project',
    description: 'Building an AI-powered tax tool for F-1 international students. Form 8843 auto-generation, AI chat assistant, Google OAuth.',
  },
]

export default function TimelineSection() {
  return (
    <section id="journey" className="relative py-32 px-6 border-t border-slate-800/60">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 will-change-transform"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-[#22d3ee] uppercase mb-3">
            03. Journey
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            How I Got{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">
              Here
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — draws in from the top */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-4 top-0 bottom-0 w-px origin-top"
            style={{ background: 'rgba(34,211,238,0.2)' }}
          />

          <div className="space-y-10">
            {entries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 0.55, delay: i * 0.15, ease: 'easeOut' }}
                className="group relative pl-12 will-change-transform"
              >
                {/* Dot — pulsing ripple, glow intensifies on hover */}
                <div className="absolute left-0 top-1.5 w-8 h-8 flex items-center justify-center">
                  <div
                    className="dot-ripple w-2 h-2 rounded-full bg-[#22d3ee] [filter:drop-shadow(0_0_4px_rgba(34,211,238,0.6))] group-hover:[filter:drop-shadow(0_0_10px_rgba(34,211,238,1))] transition-[filter] duration-300"
                  />
                </div>

                <div className="transition-transform duration-300 group-hover:translate-x-1">
                  <p className="text-xs font-mono text-[#22d3ee] tracking-wider mb-1">
                    {entry.year}
                  </p>
                  <p className="text-base font-semibold text-white mb-0.5">
                    {entry.title}
                  </p>
                  <p className="text-sm text-slate-500 mb-1.5">
                    {entry.subtitle}
                  </p>
                  <p className="text-sm text-slate-400 italic leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
