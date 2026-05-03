import { motion } from 'framer-motion'

const VP = { once: true, amount: 0.2 }
const VP_HALF = { once: true, amount: 0.5 }

const stats = [
  { value: '3.57', label: 'GPA' },
  { value: '1', label: 'Live Project' },
  { value: '21', label: 'Age' },
]

const skills = [
  { area: 'Data Science',     level: 85 },
  { area: 'React / Frontend', level: 80 },
  { area: 'Python / ML',      level: 70 },
  { area: 'SQL / Databases',  level: 65 },
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
              Moving to California alone at 21 was a crash course in figuring things out without
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

          {/* Right — stats + skill bars */}
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

            {/* Skill bars — staggered */}
            <div className="space-y-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.area}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP_HALF}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  className="will-change-transform"
                >
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-300 font-medium">{skill.area}</span>
                    <span className="text-slate-600 font-mono text-xs">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={VP_HALF}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] rounded-full will-change-transform"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
