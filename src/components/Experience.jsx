import { SectionHeading } from './About'

const experience = [
  {
    role: 'Server',
    company: 'Georgia Blue',
    location: 'Madison, MS',
    date: 'Summer 2023, 2024 & 2025',
    bullets: [
      'Managed multiple tables simultaneously in a fast-paced, high-volume environment',
      'Built rapport with regulars and delivered consistent, personalized service',
      'Resolved guest concerns quickly and professionally under pressure',
    ],
    skills: ['Customer Service', 'Multitasking', 'Time Management'],
  },
  {
    role: 'Event Staff',
    company: 'Bridlewood of Madison',
    location: 'Madison, MS',
    date: '2022 – 2023',
    bullets: [
      'Coordinated setup and breakdown for weddings and private events with attention to detail',
      'Collaborated with a team to execute seamless events under strict time constraints',
      'Adapted to last-minute changes while maintaining a professional, guest-focused atmosphere',
    ],
    skills: ['Team Collaboration', 'Event Coordination', 'Attention to Detail'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-10 md:px-16 pt-32 pb-20">
      <SectionHeading top="EXPERIENCE" ghost="Work history" align="right" />

      <div className="relative mt-12 max-w-5xl mx-auto">
        {/* Vertical line — runs through the dots */}
        <div className="absolute left-[5px] md:left-[7px] top-3 bottom-3 w-px bg-border" aria-hidden="true" />

        <div className="flex flex-col gap-14">
          {experience.map(exp => (
            <div key={exp.role} className="relative pl-9 md:pl-12 group">
              {/* Small dot marker — bg-ring around it visually breaks the line */}
              <div
                className="absolute left-0 top-3 w-[11px] h-[11px] md:w-[15px] md:h-[15px] rounded-full bg-foreground ring-4 ring-bg z-10 transition-colors duration-200 group-hover:bg-foreground/60"
                aria-hidden="true"
              />

              {/* Card */}
              <div className="rounded-lg border border-border bg-surface p-7 md:p-8 transition-colors duration-200 group-hover:border-ring">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-2xl md:text-[28px] font-bold text-foreground tracking-tight leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm md:text-base text-muted mt-1.5">
                      <span className="text-foreground/90 font-medium">{exp.company}</span>
                      <span className="mx-2 opacity-40">·</span>
                      {exp.location}
                    </p>
                  </div>
                  <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted pt-1.5 shrink-0">
                    {exp.date}
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 mt-5">
                  {exp.bullets.map(b => (
                    <li key={b} className="text-[14px] md:text-[15px] text-foreground/75 leading-relaxed pl-5 relative">
                      <span className="absolute left-0 top-0 text-muted/60">—</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {exp.skills && (
                  <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border">
                    {exp.skills.map(s => (
                      <span key={s} className="text-[11px] font-semibold uppercase tracking-[1px] px-3 py-1 rounded-full bg-bg border border-border text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
