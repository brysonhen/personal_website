import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { GithubIcon } from './Icons'
import headshot from '../assets/headshot.png'
import Contributions from './ui/contributions'

const GRAD_DATE = new Date('2027-05-15')

export function SectionHeading({ top, ghost, align = 'left' }) {
  const isRight = align === 'right'
  return (
    <header className={`mb-12 md:mb-16 ${isRight ? 'text-right' : ''}`}>
      {/* Small uppercase label + horizontal accent line */}
      <div className={`flex items-center gap-4 mb-5 ${isRight ? 'flex-row-reverse' : ''}`}>
        {ghost && (
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted shrink-0">
            {ghost}
          </span>
        )}
        <span className="flex-1 h-px bg-border" aria-hidden="true" />
      </div>
      {/* Big bold title */}
      <h2 className="font-sans font-bold tracking-[-0.04em] leading-[0.95] text-foreground text-[clamp(48px,9vw,120px)]">
        {top}
      </h2>
    </header>
  )
}

// Shared card shell — border + surface + rounded
function Card({ children, area }) {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden h-full" style={{ gridArea: area }}>
      {children}
    </div>
  )
}

export default function About() {
  const [daysLeft, setDaysLeft] = useState(null)
  const [showWeeks, setShowWeeks] = useState(false)

  useEffect(() => {
    setDaysLeft(Math.ceil((GRAD_DATE - Date.now()) / 86400000))
  }, [])

  const display = showWeeks ? Math.ceil(daysLeft / 7) : daysLeft
  const unit    = showWeeks ? 'weeks' : 'days'

  return (
    <section id="about" className="px-10 md:px-16 pt-32 pb-20">
      <SectionHeading top="ABOUT" ghost="Who I am" />

      <div className="grid gap-4 about-bento">
        {/* Photo */}
        <Card area="profile">
          <div className="aspect-[4/5] md:aspect-auto h-full">
            <img src={headshot} alt="Bryson Henderson" className="w-full h-full object-cover object-top" />
          </div>
        </Card>

        {/* Intro */}
        <Card area="intro">
          <div className="p-7 flex flex-col gap-6 h-full">
            <p className="text-[17px] leading-[1.8] text-foreground/80">
              Junior at Ole Miss studying Computer Science with a Data Science emphasis. Currently looking for software engineering and data science internships for summer 2026.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-4 mt-auto">
              <div className="flex items-center gap-3.5">
                <MapPin size={18} className="text-muted shrink-0" />
                <div>
                  <span className="block text-[10px] font-bold tracking-[1.5px] uppercase text-muted">Location</span>
                  <span className="text-[15px] font-medium text-foreground">Madison &amp; Oxford, MS</span>
                </div>
              </div>
              <button onClick={() => setShowWeeks(v => !v)} className="flex items-center gap-3.5 cursor-pointer group/grad" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                <div className="text-left">
                  <span className="block text-[10px] font-bold tracking-[1.5px] uppercase text-muted group-hover/grad:text-foreground transition-colors">Until Graduation ↻</span>
                  <span className="text-[15px] font-medium text-foreground">{display ?? '---'} <span className="text-xs font-normal text-muted">{unit}</span></span>
                </div>
              </button>
            </div>
          </div>
        </Card>

        {/* Know me */}
        <Card area="know">
          <div className="p-7 flex flex-col gap-4 h-full">
            <span className="text-[22px] font-bold tracking-tight text-foreground">Get To Know Me</span>
            <p className="text-[14px] leading-[1.75] text-muted">
              Outside of school and work, you'll usually find me at the gym, on the soccer field, or playing a video game. Video games are actually what got me into CS. On campus I'm involved with Delta Psi and the Coding Club.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {['Gym', 'Soccer', 'Gaming', 'Delta Psi', 'Coding Club'].map(tag => (
                <span key={tag} className="text-[12px] px-3 py-1 rounded-full bg-bg border border-border text-muted font-semibold">{tag}</span>
              ))}
            </div>
          </div>
        </Card>

        {/* GitHub */}
        <Card area="github">
          <div className="p-7 flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GithubIcon size={16} className="text-muted" />
                <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted">Contributions</span>
              </div>
              <a
                href="https://github.com/brysonhen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold text-muted hover:text-foreground transition-colors"
              >
                View Profile →
              </a>
            </div>
            <Contributions />
          </div>
        </Card>
      </div>

      <style>{`
        .about-bento {
          grid-template-columns: 1fr;
          grid-template-areas: "profile" "intro" "know" "github";
        }
        @media (min-width: 768px) {
          .about-bento {
            grid-template-columns: 280px 1fr 1fr;
            grid-template-areas: "profile intro intro" "profile know github";
          }
        }
      `}</style>
    </section>
  )
}
