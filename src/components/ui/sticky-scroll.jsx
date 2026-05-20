import { useRef, useState, useCallback } from 'react'
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
    <div className="group relative aspect-square flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-border bg-surface cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-foreground/30 will-change-transform">
      <img
        src={`https://api.iconify.design/${icon}.svg`}
        alt={name}
        width={40}
        height={40}
        className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${invert ? 'invert' : ''}`}
      />
      <span className="text-[12px] font-semibold text-foreground/90 text-center tracking-tight">
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [spot, setSpot] = useState({ x: -1000, y: -1000 })

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    const nx = px / rect.width - 0.5   // -0.5 .. 0.5
    const ny = py / rect.height - 0.5

    // very subtle parallax tilt — Apple-style
    setTilt({ x: ny * -3.5, y: nx * 3.5 })
    setSpot({ x: px, y: py })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setSpot({ x: -1000, y: -1000 })
  }, [])

  return (
    <section id="skills" className="w-full px-10 md:px-16 pt-32 pb-20">
      <SectionHeading top="SKILLS" ghost="Tech stack" />

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mt-10 max-w-6xl mx-auto"
        style={{ perspective: '2000px' }}
      >
        {/* Cursor-following spotlight — sits above cards, just lifts the highlighted area */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(420px circle at ${spot.x}px ${spot.y}px, rgba(255,255,255,0.06), transparent 70%)`,
          }}
        />

        {/* The 3D-tilted grid */}
        <div
          className="relative flex flex-col gap-10 transition-transform duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {categories.map(cat => (
            <div key={cat.title}>
              {/* Category header — small label, full-width rule, count badge */}
              <div className="flex items-baseline gap-4 mb-5">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted shrink-0">
                  {cat.title}
                </span>
                <span className="flex-1 h-px bg-border" aria-hidden="true" />
                <span className="text-[10px] font-semibold tabular-nums text-muted/60 shrink-0">
                  {String(cat.skills.length).padStart(2, '0')}
                </span>
              </div>
              {/* Skill grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {cat.skills.map(skill => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
