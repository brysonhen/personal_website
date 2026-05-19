import { Utensils, CalendarDays } from 'lucide-react'
import { SectionHeading } from './About'

const experience = [
  {
    icon: Utensils,
    role: 'Server',
    company: 'Georgia Blue · Madison, MS',
    date: 'Summer 2023, 2024 & 2025',
    bullets: [
      'Managed multiple tables simultaneously in a fast-paced, high-volume environment',
      'Built rapport with regulars and delivered consistent, personalized service',
      'Resolved guest concerns quickly and professionally under pressure',
    ],
  },
  {
    icon: CalendarDays,
    role: 'Event Staff',
    company: 'Bridlewood of Madison · Madison, MS',
    date: '2022 – 2023',
    bullets: [
      'Coordinated setup and breakdown for weddings and private events with attention to detail',
      'Collaborated with a team to execute seamless events under strict time constraints',
      'Adapted to last-minute changes while maintaining a professional, guest-focused atmosphere',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-10 md:px-16 py-20 bg-bg">
      <SectionHeading top="WORK" ghost="EXPERIENCE" align="right" />
      <div className="flex flex-col">
        {experience.map((exp, i) => {
          const Icon = exp.icon
          return (
            <div key={exp.role} className={`py-10 ${i > 0 ? 'border-t border-border' : ''} group`}>
              <div className="flex items-start gap-5 mb-5">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 group-hover:border-primary group-hover:bg-primary/10">
                  <Icon size={16} className="text-muted group-hover:text-primary transition-colors duration-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap justify-between gap-3 mb-1">
                    <div>
                      <div className="text-[20px] font-bold text-foreground">{exp.role}</div>
                      <div className="text-[14px] text-muted">{exp.company}</div>
                    </div>
                    <div className="text-[11px] font-bold tracking-[0.8px] uppercase text-muted pt-1 shrink-0">{exp.date}</div>
                  </div>
                </div>
              </div>
              <ul className="flex flex-col gap-2 pl-[58px]">
                {exp.bullets.map(b => (
                  <li key={b} className="relative text-[14px] text-muted leading-[1.65] pl-5">
                    <span className="absolute left-0 top-0.5 text-muted/50 text-xs">—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
