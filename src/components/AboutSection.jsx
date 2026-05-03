import { motion } from 'framer-motion'

const VP = { once: true, amount: 0.2 }

const stats = [
  { value: '3.57', label: 'GPA' },
  { value: '1', label: 'Live Project' },
  { value: '21', label: 'Age' },
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
          <p className="text-xs font-mono tracking-[0.25em] text-[#00d4ff] uppercase mb-3">
            01. About
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            From Kathmandu
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#3b82f6]">
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
              <p className="text-[#00d4ff] text-sm mt-1">Transferring to a 4-year university →</p>
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
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: 'easeOut' }}
                  className="text-center p-5 rounded-xl border border-slate-800 bg-[#0a0f2e]/50 will-change-transform"
                >
                  <div className="text-3xl font-black text-[#00d4ff] mb-1">{s.value}</div>
                  <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">{s.label}</div>
                </motion.div>
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
                      <span
                        key={tag}
                        style={{
                          background: 'rgba(34,211,238,0.08)',
                          border: '1px solid rgba(34,211,238,0.2)',
                          color: '#22d3ee',
                          borderRadius: '9999px',
                          padding: '4px 14px',
                          fontSize: '13px',
                        }}
                      >
                        {tag}
                      </span>
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
