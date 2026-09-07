import Reveal from './Reveal'
import Icon from './Icon'
export default function HeroOverlay() {
  return (
    <section id="home" className="hero container" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <Reveal className="hero-topline">
        <p className="eyebrow">COMPUTER SCIENCE @ CSULB</p>
        <a className="availability" href="#contact">
          <span /> Seeking internships
        </a>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 id="hero-title" className="hero-name">
          Kiran <span>Shahi.</span>
        </h1>
      </Reveal>
      <div className="hero-content">
        <Reveal delay={0.16} className="hero-intro">
          <h2>
            Building software.
            <br />
            <span>Keeping people in mind.</span>
          </h2>
          <p>
            I’m a full-stack developer and CS student in California. I turn problems I’ve
            experienced into practical web applications, with a growing interest in AI and data
            science.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#projects">
              Explore my work <Icon name="down" size={18} />
            </a>
            <a className="button button-text" href="#contact">
              Let’s connect <Icon size={18} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.24} className="hero-aside">
          <div className="aside-heading">
            <span className="eyebrow">CURRENTLY BUILDING</span>
            <Icon name="code" />
          </div>
          <a href="#f1-tax-helper" className="now-project">
            <span>
              <strong>F1 Tax Helper</strong>
              <small>Making student tax preparation clearer.</small>
            </span>
            <Icon />
          </a>
          <a href="#parkos" className="now-project">
            <span>
              <strong>ParkOS</strong>
              <small>A multi-tenant SaaS project in progress.</small>
            </span>
            <Icon />
          </a>
          <p className="aside-note">
            From Kathmandu to California.
            <br />
            Curiosity has been the constant.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="hero-bottom">
        <span>REACT / JAVASCRIPT / PYTHON / SQL</span>
        <a href="#projects">
          Selected work <Icon name="down" size={16} />
        </a>
      </Reveal>
    </section>
  )
}
