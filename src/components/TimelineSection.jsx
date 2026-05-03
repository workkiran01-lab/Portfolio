import { motion } from 'framer-motion'

const VP = { once: true, amount: 0.2 }

const entries = [
  {
    year: '2024 — Present',
    title: 'Student Service Assistant',
    subtitle: 'International Student Program, Cypress College',
    description: 'Helping new international arrivals navigate life in the US — especially students from Nepal.',
  },
  {
    year: '2024',
    title: 'Launched F1 Tax Helper',
    subtitle: 'Side Project',
    description: 'Built and shipped an AI-powered tax tool for F-1 students. Used by real students during tax season.',
  },
  {
    year: '2024 · Fall',
    title: 'Started CS at Cypress College',
    subtitle: 'Cypress College, Bellflower CA',
    description: 'Began studying Computer Science. GPA 3.57.',
  },
  {
    year: '2024 · Spring',
    title: 'Arrived in the US',
    subtitle: 'Webster University',
    description: 'Left Nepal alone at 18. Figured it out.',
  },
]

export default function TimelineSection() {
  return (
    <section className="relative py-32 px-6 border-t border-slate-800/60">
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
          {/* Center line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px"
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
                className="relative pl-12 will-change-transform"
              >
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 w-8 h-8 flex items-center justify-center"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#22d3ee', boxShadow: '0 0 6px rgba(34,211,238,0.6)' }}
                  />
                </div>

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
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
