import Reveal from './Reveal'
import Icon from './Icon'
import { profile } from '../data/profile'

const features = [
  {
    number: '01',
    title: 'Understand the situation',
    detail: 'A personalized questionnaire captures student circumstances.'
  },
  {
    number: '02',
    title: 'Find the next step',
    detail: 'An AI chat assistant and checklist organize questions and documents.'
  },
  {
    number: '03',
    title: 'Prepare the paperwork',
    detail: 'A guided form creates a downloadable Form 8843 PDF.'
  }
]
export default function ProjectsSection() {
  return (
    <section id="projects" className="section container" aria-labelledby="work-title">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2 id="work-title">
            Ideas, put into practice<span>.</span>
          </h2>
        </div>
        <p>Personal projects built around practical problems and hands-on learning.</p>
      </Reveal>
      <Reveal>
        <article id="f1-tax-helper" className="featured-project">
          <div className="project-story">
            <div className="project-meta">
              <span>FEATURED PROJECT</span>
              <span className="project-category">WEB APPLICATION</span>
            </div>
            <h3>
              F1 Tax Helper<span>↗</span>
            </h3>
            <p className="project-lede">
              A clearer starting point for international students navigating US taxes.
            </p>
            <p>
              Tax preparation was a problem I experienced as an international student. I built F1
              Tax Helper to bring guidance, document preparation, and next steps into one
              application.
            </p>
            <ul className="tags" aria-label="F1 Tax Helper technologies">
              {['React', 'JavaScript', 'Tailwind CSS', 'Supabase', 'PDF generation'].map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="project-links">
              <a
                className="button button-primary"
                href={profile.f1Live}
                target="_blank"
                rel="noreferrer"
              >
                Visit project <Icon size={18} />
              </a>
              <a className="text-link" href={profile.f1Source} target="_blank" rel="noreferrer">
                View source <Icon name="code" size={18} />
              </a>
            </div>
          </div>
          <div className="project-detail">
            <div className="detail-top">
              <span className="detail-wordmark">
                F1<span> / </span>Tax Helper
              </span>
              <span className="detail-label">THE STUDENT FLOW</span>
            </div>
            <ol className="feature-flow">
              {features.map((feature) => (
                <li key={feature.number}>
                  <span className="feature-number">{feature.number}</span>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="detail-foot">
              <Icon name="code" size={18} />
              <span>Questionnaire · AI chat · PDF tools</span>
            </div>
          </div>
        </article>
      </Reveal>
      <div className="project-grid">
        <Reveal delay={0.05}>
          <article id="parkos" className="project-card">
            <div className="project-meta">
              <span>02 / PARKOS</span>
              <span className="in-progress">IN DEVELOPMENT</span>
            </div>
            <h3>ParkOS</h3>
            <p className="card-subtitle">Exploring multi-tenant software.</p>
            <p>A multi-tenant SaaS application I’m currently building alongside F1 Tax Helper.</p>
            <ul className="tags" aria-label="ParkOS project areas">
              <li>SaaS</li>
              <li>Multi-tenancy</li>
            </ul>
            <p className="project-note">Work in progress</p>
          </article>
        </Reveal>
        <Reveal delay={0.12}>
          <article className="project-card">
            <div className="project-meta">
              <span>03 / PERSONAL PORTFOLIO</span>
              <Icon name="code" />
            </div>
            <h3>A home for my work</h3>
            <p className="card-subtitle">The site you’re exploring.</p>
            <p>
              A responsive React portfolio with scroll-triggered motion, keyboard-friendly
              navigation, and support for reduced-motion preferences.
            </p>
            <ul className="tags" aria-label="Portfolio technologies">
              <li>React</li>
              <li>Framer Motion</li>
              <li>Vite</li>
            </ul>
            <a
              className="text-link"
              href={profile.portfolioSource}
              target="_blank"
              rel="noreferrer"
            >
              Explore the code <Icon />
            </a>
          </article>
        </Reveal>
      </div>
      <Reveal className="work-footer">
        <span>More of the process, in the code.</span>
        <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
          Find me on GitHub <Icon />
        </a>
      </Reveal>
    </section>
  )
}
