import { motion } from 'framer-motion'
import { useState } from 'react'

const VP = { once: true, amount: 0.2 }

const links = [
  {
    label: 'Email',
    value: 'work.kiran01@gmail.com',
    href: 'mailto:work.kiran01@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kiran-shahi',
    href: 'https://linkedin.com/in/kiran-shahi',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/workkiran01-lab',
    href: 'https://github.com/workkiran01-lab',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  borderRadius: '8px',
  padding: '10px 14px',
  width: '100%',
  outline: 'none',
  fontSize: '14px',
}

export default function ContactSection() {
  const [status, setStatus] = useState('idle')

  function handleSubmit(e) {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    // TODO: wire up to Formspree or Resend
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <section id="contact" className="relative py-32 px-6 border-t border-slate-800/60">
      <div className="max-w-3xl mx-auto text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="will-change-transform"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-[#00d4ff] uppercase mb-3">
            03. Contact
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Let's Talk
          </h2>
          <p className="text-slate-400 text-lg mb-16 max-w-lg mx-auto leading-relaxed">
            Whether it's collaboration, data science, or you're an international student
            who needs help — reach out.
          </p>
        </motion.div>

        {/* Contact cards — staggered */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
              className="group flex flex-col items-center gap-3 px-8 py-6 rounded-2xl border border-slate-800 bg-[#0a0f2e]/40 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 transition-all duration-300 will-change-transform"
            >
              <span className="text-slate-500 group-hover:text-[#00d4ff] transition-colors duration-200">
                {link.icon}
              </span>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                {link.label}
              </span>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-200">
                {link.value}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-16 text-left will-change-transform"
        >
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-6 text-center">
            Or send a message
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              required
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = '#22d3ee' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = '#22d3ee' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
            <textarea
              placeholder="Message"
              rows={4}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#22d3ee' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
            <button
              type="submit"
              disabled={status !== 'idle'}
              style={{
                width: '100%',
                background: status === 'sent' ? 'rgba(34,211,238,0.3)' : '#22d3ee',
                color: '#020817',
                fontWeight: 600,
                borderRadius: '8px',
                padding: '12px',
                border: 'none',
                cursor: status !== 'idle' ? 'default' : 'pointer',
                fontSize: '14px',
                transition: 'background 0.2s',
              }}
            >
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Message sent ✓'}
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-slate-800/40"
        >
          <p className="text-slate-700 text-sm font-mono">
            © 2025 Kiran Shahi · Built with React + Three.js
          </p>
        </motion.div>
      </div>
    </section>
  )
}
