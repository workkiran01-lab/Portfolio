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
      <div className="text-center max-w-4xl">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-sm font-mono tracking-[0.25em] text-[#00d4ff] uppercase mb-6"
        >
          CS Student &amp; Builder · Kathmandu → California
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-7xl sm:text-8xl md:text-9xl text-white leading-none mb-6"
          style={{ fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          KIRAN
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#3b82f6]">
            SHAHI
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Building tools that help people who are being left behind.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3.5 bg-[#00d4ff] text-[#020817] font-semibold text-sm tracking-wider rounded-lg hover:bg-white transition-all duration-200 hover:scale-105"
          >
            See My Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3.5 border border-[#00d4ff]/50 text-[#00d4ff] font-semibold text-sm tracking-wider rounded-lg hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-200"
          >
            Get In Touch
          </button>
        </motion.div>

        <motion.div
          custom={4}
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
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"
            />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
