import Reveal from './Reveal'
import WordReveal from './WordReveal'
import { skillGroups } from '../data/profile'
export default function AboutSection() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        <WordReveal text="Good software starts with understanding the person on the other side of the screen." />
        <div className="about-layout">
          <Reveal className="about-story">
            <p className="eyebrow">03 / BEHIND THE CODE</p>
            <h2 id="about-title">
              Curious by nature.
              <br />
              <span>Builder by practice.</span>
            </h2>
            <p>
              I’m Kiran, a Computer Science student at California State University, Long Beach,
              originally from Kathmandu, Nepal.
            </p>
            <p>
              Moving to the United States taught me to ask questions, work through unfamiliar
              systems, and keep learning. That perspective carries into my projects: I’m interested
              in software that makes a difficult process easier to understand.
            </p>
            <p>
              At Cypress College’s International Student Program, I’ve helped new students settle in
              and worked with student records and program data. Those experiences keep the people
              using a system at the center of how I think about it.
            </p>
            <div className="about-focus">
              <span className="eyebrow">WHAT I’M LOOKING FOR</span>
              <p>
                A software engineering internship where I can contribute to a team, strengthen my
                fundamentals, and build useful products.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="skills-panel">
            <div className="skills-header">
              <h3>My toolkit</h3>
              <span>ALWAYS LEARNING</span>
            </div>
            <dl className="skill-groups">
              {skillGroups.map(({ label, skills }) => (
                <div className="skill-group" key={label}>
                  <dt>{label}</dt>
                  <dd>
                    <ul>
                      {skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="learning-note">
              <span className="eyebrow">EXPLORING NEXT</span>
              <p>AI, machine learning, and data science.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
