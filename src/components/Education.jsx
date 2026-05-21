import { SectionHeading } from './About'

const coursework = [
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
]
const honors = ["Dean's Honor Roll", "Chancellor's Honor Roll", 'Academic Scholarships']
const involvement = ['Delta Psi Fraternity', 'Coding Club', 'Intramural Soccer']

function StatBadge({ label, value }) {
  return (
    <div className="flex-1 min-w-[110px] px-5 py-4 rounded-2xl bg-bg border border-border">
      <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-1.5">{label}</div>
      <div className="text-2xl font-bold text-foreground tracking-tight">{value}</div>
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="px-10 md:px-16 pt-32 pb-20">
      <SectionHeading top="EDUCATION" ghost="Academic background" />

      {/* Featured: Ole Miss */}
      <div className="rounded-2xl border border-border bg-surface p-8 md:p-10 mb-4">
        <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-3">
              University of Mississippi · Oxford, MS
            </div>
            <h3 className="text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-foreground leading-[1.05]">
              B.S. Computer Science
            </h3>
            <p className="text-[15px] md:text-base text-muted mt-2">
              Data Science Emphasis · Minor in Mathematics
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <StatBadge label="GPA" value="3.54" />
            <StatBadge label="Class" value="'27" />
            <StatBadge label="Started" value="2023" />
          </div>
        </div>


        {/* Knowledge grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-8">
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-4">Relevant Coursework</div>
            <div className="flex flex-wrap gap-2">
              {coursework.map(c => (
                <div key={c.label} className="relative group/chip">
                  <span className="inline-block text-[12px] text-muted px-3 py-1.5 rounded-full bg-bg border border-border cursor-default hover:border-primary hover:text-foreground transition-colors duration-150">
                    {c.label}
                  </span>
                  <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-0 group-hover/chip:opacity-100 transition-opacity duration-150">
                    <div className="bg-bg border border-border rounded-md px-3 py-1.5 text-xs text-foreground whitespace-nowrap shadow-lg">{c.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-4">Honors</div>
            <ul className="flex flex-col gap-2.5">
              {honors.map(h => (
                <li key={h} className="text-sm text-foreground/85 leading-relaxed flex gap-2.5">
                  <span className="text-muted/60 shrink-0">—</span>{h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-4">Involvement</div>
            <ul className="flex flex-col gap-2.5">
              {involvement.map(i => (
                <li key={i} className="text-sm text-foreground/85 leading-relaxed flex gap-2.5">
                  <span className="text-muted/60 shrink-0">—</span>{i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* High School — secondary line */}
      <div className="rounded-2xl border border-border bg-surface px-8 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-1">Madison Central High School · Madison, MS</div>
          <div className="text-xl font-bold text-foreground">High School Diploma</div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-muted">
          <span>2019 – 2023</span>
          <span className="opacity-40">·</span>
          <span>GPA 3.64</span>
          <span className="opacity-40">·</span>
          <span>ACT 28</span>
        </div>
      </div>
    </section>
  )
}
