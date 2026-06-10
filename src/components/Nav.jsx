import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = ['projects', 'about', 'journey', 'contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track which section is in view → drives the sliding underline
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    NAV_LINKS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020817]/80 backdrop-blur-md border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05, textShadow: '0 0 14px rgba(34,211,238,0.8)' }}
          className="text-xl font-bold tracking-widest text-[#22d3ee] hover:text-white transition-colors duration-200"
        >
          KS
        </motion.button>

        <div className="flex items-center gap-8">
          {NAV_LINKS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative text-sm font-medium tracking-wider transition-colors duration-200 uppercase ${
                active === id ? 'text-[#22d3ee]' : 'text-slate-400 hover:text-[#22d3ee]'
              }`}
            >
              {id}
              {active === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-px w-full bg-[#22d3ee]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}

          {/* Place resume PDF at /public/resume.pdf */}
          <a
            href="/resume.pdf"
            download
            className="group relative overflow-hidden inline-block rounded-full border border-[#22d3ee] px-4 py-1.5 text-[13px] font-medium text-[#22d3ee] no-underline transition-colors duration-200 hover:bg-[#22d3ee] hover:text-[#020817]"
          >
            {/* Shimmer sweep */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-x-[-150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[150%]"
            />
            <span className="relative">Resume</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
