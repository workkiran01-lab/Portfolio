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
          {/* Place resume PDF at /public/resume.pdf */}
          <a
            href="/resume.pdf"
            download
            style={{
              border: '1px solid #22d3ee',
              color: '#22d3ee',
              background: 'transparent',
              borderRadius: '9999px',
              padding: '6px 16px',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#22d3ee'; e.currentTarget.style.color = '#020817' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#22d3ee' }}
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}
