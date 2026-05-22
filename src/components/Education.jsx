import { SectionHeading } from './About'

const coursework = [
  { name: 'Algorithm & Data Structure Analysis', note: 'Sorting, trees, graphs, dynamic programming, complexity' },
  { name: 'Data Science',                        note: 'Exploratory analysis, visualization, ML fundamentals' },
  { name: 'Advanced Data Science',               note: 'ML models, statistical learning, real-world datasets' },
  { name: 'Database Systems',                    note: 'SQL, schema design, indexing, query optimization' },
  { name: 'Software Design & Development',       note: 'OOP patterns, architecture, team-based development' },
  { name: 'Operating Systems',                   note: 'Processes, memory management, threading, scheduling' },
  { name: 'Computer Organization & Assembly',    note: 'Hardware abstraction, memory hierarchy, x86 assembly' },
  { name: 'Formal & Programming Languages',      note: 'Grammars, parsing, compilers, language theory' },
  { name: 'Discrete Mathematics',                note: 'Logic, proofs, graph theory, combinatorics' },
  { name: 'Engineering Statistics',              note: 'Probability, distributions, hypothesis testing' },
]
const honors = ["Dean's Honor Roll", "Chancellor's Honor Roll", 'Academic Scholarships']
const involvement = ['Delta Psi Fraternity', 'Coding Club', 'Intramural Soccer']

// Big inline stat — number large, label small underneath
function Stat({ value, label }) {
  return (
    <div className="flex-1 min-w-[90px]">
      <div className="text-[clamp(34px,5vw,54px)] font-bold tracking-[-0.02em] text-foreground leading-none">
        {value}
      </div>
      <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mt-2">
        {label}
      </div>
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="px-10 md:px-16 pt-32 pb-20">
      <SectionHeading top="EDUCATION" ghost="Academic background" />

      {/* Credential block — one contained, formal card with hairline-divided sections */}
      <div className="rounded-lg border border-border bg-surface p-8 md:p-12">
        {/* Degree statement */}
        <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted mb-4">
          University of Mississippi · Oxford, MS
        </div>
        <h3 className="text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.03em] text-foreground leading-[1.03]">
          B.S. Computer Science
        </h3>
        <p className="text-base md:text-lg text-muted mt-3">
          Data Science Emphasis
        </p>

        {/* Big stats band */}
        <div className="flex gap-6 md:gap-12 mt-10 pt-8 border-t border-border">
          <Stat value="3.54" label="GPA" />
          <Stat value="2027" label="Graduating" />
          <Stat value="2023" label="Enrolled" />
        </div>

        {/* Coursework — course-catalog list, name + description */}
        <div className="mt-10 pt-8 border-t border-border">
          <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted mb-6">
            Relevant Coursework
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {coursework.map(c => (
              <div key={c.name} className="flex flex-col border-l border-border pl-4">
                <span className="text-[15px] font-semibold text-foreground leading-snug">{c.name}</span>
                <span className="text-[13px] text-muted leading-snug mt-1">{c.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Honors + Involvement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 mt-10 pt-8 border-t border-border">
          <div>
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted mb-4">Honors</div>
            <ul className="flex flex-col gap-2">
              {honors.map(h => (
                <li key={h} className="text-[15px] text-foreground/85">{h}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted mb-4">Involvement</div>
            <ul className="flex flex-col gap-2">
              {involvement.map(i => (
                <li key={i} className="text-[15px] text-foreground/85">{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* High school — quiet footnote */}
      <div className="rounded-lg border border-border bg-surface px-8 md:px-12 py-6 mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted mb-1">
            Madison Central High School · Madison, MS
          </div>
          <div className="text-lg font-bold text-foreground">High School Diploma</div>
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
