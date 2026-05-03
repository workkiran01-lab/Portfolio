import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-bold tracking-widest text-[#00d4ff] hover:text-white transition-colors duration-200"
        >
          KS
        </button>

        <div className="flex items-center gap-8">
          {['about', 'projects', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm font-medium tracking-wider text-slate-400 hover:text-[#00d4ff] transition-colors duration-200 uppercase"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
