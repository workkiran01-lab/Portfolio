import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionSettings } from './MotionSettings'
import Reveal from './Reveal'

const chapters = [
  {
    number: '01',
    date: 'THE START',
    place: 'Kathmandu, Nepal',
    title: 'A familiar place. An unfamiliar path.',
    text: 'I grew up in Kathmandu. Moving to the United States meant learning to find my way through new places, new systems, and new questions.',
    note: 'Kathmandu → Webster University → California'
  },
  {
    number: '02',
    date: 'FALL 2024',
    place: 'Cypress College',
    title: 'Learning how things work.',
    text: 'At Cypress, I built a foundation in programming, mathematics, and computer architecture. Learning the fundamentals gave me more ways to turn an idea into something I could build.',
    note: 'Computer Science · Programming · Mathematics'
  },
  {
    number: '03',
    date: '2025–2026',
    place: 'International Student Program',
    title: 'The people behind the problem.',
    text: 'As a Student Service Assistant, I helped international students find their footing. Working with student records and program data showed me how much thoughtful systems matter to the people using them.',
    note: 'Student support · Data management · Cypress College'
  },
  {
    number: '04',
    date: 'THE NEXT CHAPTER',
    place: 'CSULB · Long Beach, California',
    title: 'Now, I build my own answers.',
    text: 'Today I’m studying Computer Science at CSULB and building F1 Tax Helper and ParkOS. I’m looking for a software engineering internship where I can keep learning, contribute, and build with a team.',
    note: 'Full-stack development · AI curiosity · Open to internships'
  }
]
const routePoint = (p) => ({ x: 170 + Math.sin(p * Math.PI * 2) * 70, y: 45 + p * 340 })
const routePath = Array.from({ length: 101 }, (_, i) => {
  const p = routePoint(i / 100)
  return `${i ? 'L' : 'M'}${p.x},${p.y}`
}).join(' ')
function Chapter({ chapter, index }) {
  const ref = useRef(null)
  const { enabled } = useMotionSettings()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'end 10%'] })
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.75, 1], [0.25, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [45, 0, 0, -25])
  return (
    <article className="journey-chapter" ref={ref} id={`chapter-${index + 1}`}>
      <motion.div style={enabled ? { opacity, y } : undefined}>
        <div className="chapter-topline">
          <span className="chapter-number">{chapter.number}</span>
          <p className="eyebrow">{chapter.date}</p>
        </div>
        <p className="chapter-place">{chapter.place}</p>
        <h3>{chapter.title}</h3>
        <p className="chapter-copy">{chapter.text}</p>
        <p className="chapter-note">{chapter.note}</p>
      </motion.div>
    </article>
  )
}
export default function TimelineSection() {
  const ref = useRef(null)
  const { enabled } = useMotionSettings()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 85%'] })
  const cx = useTransform(scrollYProgress, (p) => routePoint(p).x)
  const cy = useTransform(scrollYProgress, (p) => routePoint(p).y)
  return (
    <section
      id="journey"
      ref={ref}
      className="journey-section container"
      aria-labelledby="journey-title"
    >
      <aside className="journey-visual">
        <Reveal>
          <p className="eyebrow section-kicker">01 / THE JOURNEY</p>
          <h2 id="journey-title">
            A little farther.
            <br />
            <span>Every chapter.</span>
          </h2>
          <p className="journey-caption">Different places. The same curiosity.</p>
        </Reveal>
        <svg
          className="journey-route"
          viewBox="0 0 340 430"
          role="img"
          aria-label="Journey from Kathmandu to Cypress College, the International Student Program, and CSULB"
        >
          <path
            d={routePath}
            fill="none"
            stroke="#7778ae"
            strokeOpacity=".22"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
          <motion.path
            d={routePath}
            fill="none"
            stroke="#8d9bff"
            strokeWidth="2"
            style={{ pathLength: enabled ? scrollYProgress : 1 }}
          />
          {chapters.map((chapter, i) => {
            const p = routePoint(i / 3)
            return (
              <g key={chapter.number}>
                <circle cx={p.x} cy={p.y} r="5" fill="#0a0920" stroke="#a4abff" strokeWidth="1.5" />
                <text
                  x={p.x + (i === 1 ? -14 : 14)}
                  y={p.y - 12}
                  textAnchor={i === 1 ? 'end' : 'start'}
                >
                  {['KATHMANDU', 'CYPRESS', 'COMMUNITY', 'CSULB'][i]}
                </text>
              </g>
            )
          })}
          {enabled && (
            <>
              <motion.circle cx={cx} cy={cy} r="15" fill="#82deff" opacity=".15" />
              <motion.circle cx={cx} cy={cy} r="5" fill="#b0f1ff" />
            </>
          )}
        </svg>
        <p className="journey-footnote">A path shaped by learning, people, and code.</p>
      </aside>
      <div className="journey-chapters">
        {chapters.map((chapter, i) => (
          <Chapter key={chapter.number} chapter={chapter} index={i} />
        ))}
      </div>
    </section>
  )
}
