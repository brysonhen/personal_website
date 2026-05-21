import { Utensils, CalendarDays } from 'lucide-react'
import { SectionHeading } from './About'

const experience = [
  {
    icon: Utensils,
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
    icon: CalendarDays,
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
        {/* Vertical connecting line */}
        <div className="absolute left-[19px] md:left-[27px] top-3 bottom-3 w-px bg-gradient-to-b from-border via-border to-transparent" aria-hidden="true" />

        <div className="flex flex-col gap-14">
          {experience.map((exp, i) => {
            const Icon = exp.icon
            return (
              <div key={exp.role} className="relative pl-14 md:pl-20 group">
                {/* Timeline node */}
                <div className="absolute left-0 top-0 w-[40px] h-[40px] md:w-[56px] md:h-[56px] rounded-full bg-bg border border-border flex items-center justify-center z-10 transition-colors duration-200 group-hover:border-primary">
                  <Icon size={18} className="text-muted transition-colors duration-200 group-hover:text-foreground" />
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-border bg-surface p-7 md:p-8 transition-colors duration-200 group-hover:border-ring">
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
