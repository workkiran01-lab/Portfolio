import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function HeroOverlay() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
      <div className="relative text-center max-w-4xl">
        {/* Backlight glow behind the name — purely decorative */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22d3ee] opacity-[0.07] blur-[120px]"
        />

        {/* Status badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 flex justify-center"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="h-[6px] w-[6px] rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-slate-300">
              OPEN TO SUMMER 2026 INTERNSHIPS
            </span>
          </span>
        </motion.div>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-sm font-mono tracking-[0.25em] text-[#22d3ee] uppercase mb-6"
        >
          CS Student &amp; Builder · Kathmandu → California
        </motion.p>

        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-7xl sm:text-8xl md:text-9xl text-white leading-none mb-6"
          style={{ fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          KIRAN
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">
            SHAHI
          </span>
        </motion.h1>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Building tools that help people who are being left behind.
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3.5 bg-[#22d3ee] text-[#020817] font-semibold text-sm tracking-wider rounded-lg hover:bg-white transition-all duration-200 hover:scale-105"
          >
            See My Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3.5 border border-[#22d3ee]/50 text-[#22d3ee] font-semibold text-sm tracking-wider rounded-lg hover:border-[#22d3ee] hover:bg-[#22d3ee]/10 transition-all duration-200"
          >
            Get In Touch
          </button>
        </motion.div>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors group"
            aria-label="Scroll down"
          >
            <span className="text-xs tracking-widest uppercase font-mono">scroll</span>
            {/* Mouse outline with animated scroll dot */}
            <span className="flex h-8 w-5 items-start justify-center rounded-full border border-slate-600 pt-0.5">
              <motion.span
                animate={{ y: [2, 12] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', repeatType: 'loop' }}
                className="block h-[5px] w-[2px] rounded-full bg-slate-400"
              />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
