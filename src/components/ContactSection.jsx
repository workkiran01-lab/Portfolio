import { useState } from 'react'
import Reveal from './Reveal'
import Icon from './Icon'
import { profile } from '../data/profile'

export default function ContactSection() {
  const [status, setStatus] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const name = fields.get('name').trim()
    const email = fields.get('email').trim()
    const message = fields.get('message').trim()
    if (!name || !email || !message) {
      setStatus('Please fill in your name, email, and message.')
      return
    }
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus(
      'Continue in your email app to send your message. If it doesn’t open, use the email address on this page. Your message stays here.'
    )
  }
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <Reveal className="contact-story">
          <p className="eyebrow">04 / THE NEXT CHAPTER</p>
          <h2 id="contact-title">
            Let’s build
            <br />
            <span>what’s next.</span>
          </h2>
          <p>
            I’m looking for software engineering internships and opportunities to build with people
            who care about their work. I’d love to hear from you.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <Icon />
          </a>
          <div className="contact-socials">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Icon size={17} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Icon size={17} />
            </a>
            <a href={profile.resume} download="Kiran_Shahi_Resume.pdf">
              Résumé <Icon name="download" size={17} />
            </a>
          </div>
          <p className="contact-location">Based in California · Open to a conversation</p>
        </Reveal>
        <Reveal delay={0.1} className="contact-form-panel">
          <h3>Start a conversation</h3>
          <p>Write a note, then send it from your email app.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  maxLength={100}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Your email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="alex@company.com"
                  maxLength={200}
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">What’s on your mind?</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={1500}
                placeholder="Tell me about the role, your team, or an idea…"
                required
              />
            </div>
            <button className="button button-primary" type="submit">
              Open email draft <Icon name="mail" size={18} />
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
