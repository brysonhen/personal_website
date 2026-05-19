import { SectionHeading } from '../About'

const left = [
  { name: 'Python',      icon: 'logos:python' },
  { name: 'JavaScript',  icon: 'logos:javascript' },
  { name: 'React',       icon: 'logos:react' },
  { name: 'Node.js',     icon: 'logos:nodejs-icon' },
  { name: 'Next.js',     icon: 'logos:nextjs-icon', invert: true },
  { name: 'HTML / CSS',  icon: 'logos:html-5' },
  { name: 'Tailwind',    icon: 'logos:tailwindcss-icon' },
  { name: 'Git',         icon: 'logos:git-icon' },
]

const center = [
  { name: 'SQL / MySQL', icon: 'logos:mysql' },
  { name: 'Firebase',    icon: 'logos:firebase' },
  { name: 'Vercel',      icon: 'logos:vercel-icon', invert: true },
  { name: 'GitHub',      icon: 'logos:github-icon', invert: true },
]

const right = [
  { name: 'NumPy',       icon: 'logos:numpy' },
  { name: 'Pandas',      icon: 'logos:pandas-icon' },
  { name: 'Jupyter',     icon: 'logos:jupyter' },
  { name: 'Java',        icon: 'logos:java' },
  { name: 'C / C++',     icon: 'logos:c-plusplus' },
  { name: 'Bash',        icon: 'logos:bash-icon' },
  { name: 'Scikit-learn',icon: 'logos:scikit-learn' },
  { name: 'TypeScript',  icon: 'logos:typescript-icon' },
]

function SkillCard({ name, icon, invert = false }) {
  return (
    <div className="flex items-center gap-4 bg-surface border border-border rounded-2xl px-5 h-[72px] hover:border-primary transition-colors duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <img
        src={`https://api.iconify.design/${icon}.svg`}
        alt={name}
        width={32}
        height={32}
        className={`shrink-0 ${invert ? 'invert' : ''}`}
      />
      <span className="text-[15px] font-semibold text-foreground">{name}</span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="w-full px-10 md:px-16 py-20">
      <SectionHeading top="SKILLS" ghost="STACK" />

      {/* Desktop: 3-column grid with sticky center.
          Mobile: single column, all skills stacked, no stickiness. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
        <div className="flex flex-col gap-3">
          {left.map(s => <SkillCard key={s.name} {...s} />)}
        </div>
        <div className="flex flex-col gap-3 md:sticky md:top-24">
          {center.map(s => <SkillCard key={s.name} {...s} />)}
        </div>
        <div className="flex flex-col gap-3">
          {right.map(s => <SkillCard key={s.name} {...s} />)}
        </div>
      </div>
    </section>
  )
}
