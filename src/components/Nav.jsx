import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import Icon from './Icon'
import { useMotionSettings } from './MotionSettings'

const links = [
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
]
export default function Nav() {
  const { enabled, paused, setPaused, reducedMotion } = useMotionSettings()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const toggle = useRef(null)
  const header = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -55% 0px' }
    )
    ;['home', ...links.map(({ id }) => id)].forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!open) return
    const escape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const outside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false)
    }
    const wide = window.matchMedia('(min-width: 761px)')
    const close = () => setOpen(false)
    document.addEventListener('keydown', escape)
    document.addEventListener('pointerdown', outside)
    wide.addEventListener('change', close)
    return () => {
      document.removeEventListener('keydown', escape)
      document.removeEventListener('pointerdown', outside)
      wide.removeEventListener('change', close)
    }
  }, [open])
  return (
    <header className="site-header" ref={header}>
      <div className="nav-inner container">
        <a
          className="wordmark"
          href="#home"
          aria-label="Kiran Shahi, home"
          onClick={() => setOpen(false)}
        >
          KS<span>.</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`nav-links ${open ? 'is-open' : ''}`}
        >
          {links.map(({ id, label }) => (
            <a
              key={id}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
              href={`#${id}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <button
            className="motion-toggle"
            onClick={() => setPaused(!paused)}
            aria-pressed={!enabled}
            disabled={reducedMotion}
            aria-label={
              reducedMotion
                ? 'Reduced motion enabled by your system'
                : enabled
                  ? 'Pause animations'
                  : 'Resume animations'
            }
            title={
              reducedMotion
                ? 'Following your reduced-motion preference'
                : enabled
                  ? 'Pause animations'
                  : 'Resume animations'
            }
          >
            <span className="motion-bars" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>{enabled ? 'Motion on' : 'Motion off'}</span>
          </button>
          <a className="nav-resume" href={profile.resume} download onClick={() => setOpen(false)}>
            Résumé <Icon name="download" size={16} />
          </a>
        </nav>
      </div>
    </header>
  )
}
