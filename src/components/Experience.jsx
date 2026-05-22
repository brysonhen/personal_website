import { SectionHeading } from './About'

const experience = [
  {
    role: 'Server',
    company: 'Georgia Blue',
    location: 'Madison, MS',
    date: 'Summer 2023, 2024 & 2025',
    bullets: [
      'Kept up with a fast-paced environment by staying organized and managing time across multiple tables.',
      'Worked closely with the kitchen and front-of-house teams to keep everyone on the same page and serve customers smoothly.',
      'Solved problems quickly on the floor and handled customer complaints calmly when things got stressful.',
    ],
    skills: ['Customer Service', 'Multitasking', 'Time Management'],
  },
  {
    role: 'Event Staff',
    company: 'Bridlewood of Madison',
    location: 'Madison, MS',
    date: '2022 – 2023',
    bullets: [
      'Paid close attention to the details of event setups to make sure everything looked exactly how the client wanted it.',
      'Teamed up with the rest of the staff to get large-scale venue setups and teardowns done on time.',
      'Figured out quick fixes for unexpected layout or timing issues during live events.',
    ],
    skills: ['Team Collaboration', 'Event Coordination', 'Attention to Detail'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-10 md:px-16 pt-32 pb-20">
      <SectionHeading top="EXPERIENCE" ghost="Work history" align="right" />

      {/* Open résumé-style list — entries separated by full-width hairline rules,
          matching the dividers used in Education and the section headings. */}
      <div className="max-w-4xl mx-auto flex flex-col">
        {experience.map((exp, i) => (
          <div key={exp.role} className={i > 0 ? 'mt-16 pt-16 border-t border-border' : ''}>
            {/* Date — prominent marker */}
            <div className="text-[12px] font-bold tracking-[0.2em] uppercase text-foreground/90 mb-3">
              {exp.date}
            </div>

            {/* Role — the hero element */}
            <h3 className="text-[clamp(32px,5vw,52px)] font-bold tracking-[-0.03em] text-foreground leading-[1.0]">
              {exp.role}
            </h3>
            <p className="text-[15px] md:text-base text-muted mt-3">
              <span className="text-foreground/90 font-medium">{exp.company}</span>
              <span className="mx-2 opacity-40">·</span>
              {exp.location}
            </p>

            {/* Bullets */}
            <ul className="flex flex-col gap-3 mt-8 max-w-2xl">
              {exp.bullets.map(b => (
                <li key={b} className="text-[15px] text-foreground/75 leading-relaxed pl-5 relative">
                  <span className="absolute left-0 top-0 text-muted/50">—</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Skills — inline text */}
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted mt-8">
              {exp.skills.join('  ·  ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
