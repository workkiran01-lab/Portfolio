import Reveal from './Reveal'
import { journey } from '../data/profile'
export default function TimelineSection() {
  return (
    <section
      id="journey"
      className="section container experience-layout"
      aria-labelledby="experience-title"
    >
      <Reveal className="experience-heading">
        <p className="eyebrow">03 / EXPERIENCE & EDUCATION</p>
        <h2 id="experience-title">
          Learning.
          <br />
          Building.
          <br />
          <span>Moving forward.</span>
        </h2>
        <p>From supporting students to developing software, each step informs the next.</p>
      </Reveal>
      <ol className="timeline">
        {journey.map((entry, index) => (
          <li key={entry.title + entry.date}>
            <Reveal delay={index * 0.05}>
              <span
                className={`timeline-marker ${index === 0 ? 'is-current' : ''}`}
                aria-hidden="true"
              />
              <p className="eyebrow timeline-date">{entry.date}</p>
              <h3>{entry.title}</h3>
              <p className="timeline-organization">{entry.organization}</p>
              <p>{entry.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
