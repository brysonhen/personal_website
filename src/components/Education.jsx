import { GraduationCap, School } from 'lucide-react'
import { SectionHeading } from './About'

const education = [
  {
    icon: GraduationCap,
    school: 'University of Mississippi (Ole Miss)',
    degree: 'B.S. Computer Science — Data Science Emphasis',
    meta: ['Oxford, MS', '2023 – 2027', 'GPA 3.54', 'Minor: Mathematics'],
    progress: 75,
    coursework: [
      { label: 'Algorithm & Data Structure Analysis', tip: 'Sorting, trees, graphs, dynamic programming, complexity' },
      { label: 'Data Science', tip: 'Exploratory analysis, visualization, ML fundamentals with Python' },
      { label: 'Advanced Data Science', tip: 'ML models, statistical learning, real-world datasets' },
      { label: 'Database Systems', tip: 'SQL, schema design, indexing, query optimization' },
      { label: 'Software Design & Development', tip: 'OOP patterns, architecture, team-based development' },
      { label: 'Operating Systems', tip: 'Processes, memory management, threading, scheduling' },
      { label: 'Computer Organization & Assembly', tip: 'Hardware abstraction, memory hierarchy, x86 assembly' },
      { label: 'Formal & Programming Languages', tip: 'Grammars, parsing, compilers, language theory' },
      { label: 'Discrete Mathematics', tip: 'Logic, proofs, graph theory, combinatorics' },
      { label: 'Engineering Statistics', tip: 'Probability, distributions, hypothesis testing' },
    ],
    involvement: ["Dean's Honor Roll", "Chancellor's Honor Roll", 'Academic Scholarships', 'Delta Psi Fraternity', 'Coding Club', 'Intramural Soccer'],
  },
  {
    icon: School,
    school: 'Madison Central High School',
    degree: 'High School Diploma',
    meta: ['Madison, MS', '2019 – 2023', 'GPA 3.64', 'ACT 28'],
  },
]

export default function Education() {
  return (
    <section id="education" className="px-10 md:px-16 py-20 bg-bg">
      <SectionHeading top="EDUCATION" ghost="" />
      <div className="flex flex-col">
        {education.map((edu, i) => {
          const Icon = edu.icon
          return (
            <div key={edu.school} className={`py-10 ${i > 0 ? 'border-t border-border' : ''} group`}>
              <div className="flex items-start gap-5 mb-5">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 group-hover:border-primary group-hover:bg-primary/10">
                  <Icon size={16} className="text-muted group-hover:text-primary transition-colors duration-200" />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-2">{edu.school}</div>
                  <div className="text-[22px] font-bold text-foreground leading-snug">{edu.degree}</div>
                </div>
              </div>

              <div className="flex flex-wrap text-[13px] text-muted mb-8">
                {edu.meta.map((m, j) => (
                  <span key={m}>{m}{j < edu.meta.length - 1 && <span className="mx-2.5 opacity-40">·</span>}</span>
                ))}
              </div>

              {edu.progress && (
                <div className="h-[2px] bg-border rounded-full mb-6 overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${edu.progress}%`, transition: 'width 1s ease' }} />
                </div>
              )}

              {edu.coursework && (
                <>
                  <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-3">Relevant Coursework</div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {edu.coursework.map(c => (
                      <div key={c.label} className="relative group/chip">
                        <span className="text-[13px] text-muted px-3 py-1 rounded-lg bg-surface border border-border cursor-default hover:border-primary hover:text-foreground transition-colors duration-150">{c.label}</span>
                        <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-0 group-hover/chip:opacity-100 transition-opacity duration-150">
                          <div className="bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-foreground whitespace-nowrap shadow-lg">{c.tip}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-3 mt-6">Involvement</div>
                  <div className="flex flex-wrap gap-2">
                    {edu.involvement.map(item => (
                      <span key={item} className="text-[13px] text-muted px-3 py-1 rounded-lg bg-surface border border-border hover:border-primary hover:text-foreground transition-colors duration-150 cursor-default">{item}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
