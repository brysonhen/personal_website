import { SectionHeading } from '../About'

const categories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python',      icon: 'logos:python' },
      { name: 'JavaScript',  icon: 'logos:javascript' },
      { name: 'TypeScript',  icon: 'logos:typescript-icon' },
      { name: 'Java',        icon: 'logos:java' },
      { name: 'C / C++',     icon: 'logos:c-plusplus' },
      { name: 'SQL',         icon: 'logos:mysql' },
      { name: 'Bash',        icon: 'logos:bash-icon' },
      { name: 'HTML / CSS',  icon: 'logos:html-5' },
    ],
  },
  {
    title: 'Frameworks & Runtime',
    skills: [
      { name: 'React',       icon: 'logos:react' },
      { name: 'Next.js',     icon: 'logos:nextjs-icon', invert: true },
      { name: 'Node.js',     icon: 'logos:nodejs-icon' },
      { name: 'Tailwind',    icon: 'logos:tailwindcss-icon' },
    ],
  },
  {
    title: 'Data & ML',
    skills: [
      { name: 'NumPy',       icon: 'logos:numpy' },
      { name: 'Pandas',      icon: 'logos:pandas-icon' },
      { name: 'Jupyter',     icon: 'logos:jupyter' },
      { name: 'Scikit-learn',icon: 'simple-icons:scikitlearn', invert: true },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git',         icon: 'logos:git-icon' },
      { name: 'GitHub',      icon: 'logos:github-icon', invert: true },
      { name: 'Firebase',    icon: 'logos:firebase' },
      { name: 'Vercel',      icon: 'logos:vercel-icon', invert: true },
    ],
  },
]

function SkillCard({ name, icon, invert = false }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3 rounded-lg border border-border bg-surface transition-colors duration-200 hover:border-ring">
      <img
        src={`https://api.iconify.design/${icon}.svg`}
        alt={name}
        width={24}
        height={24}
        className={`shrink-0 ${invert ? 'dark:invert' : ''}`}
      />
      <span className="text-[13px] font-semibold text-foreground/90 truncate">
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="w-full px-10 md:px-16 pt-32 pb-20">
      <SectionHeading top="SKILLS" ghost="Tech stack" />

      <div className="mt-8 max-w-6xl mx-auto flex flex-col gap-7">
        {categories.map(cat => (
          <div key={cat.title}>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted shrink-0">
                {cat.title}
              </span>
              <span className="flex-1 h-px bg-border" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {cat.skills.map(skill => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
