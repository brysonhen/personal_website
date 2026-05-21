import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { GithubIcon } from './Icons'
import headshot from '../assets/headshot.png'
import { RevealCardContainer } from './ui/animated-profile-card'

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
      {/* Big bold title — clean, no gradient */}
      <h2 className="font-sans font-bold tracking-[-0.04em] leading-[0.95] text-foreground text-[clamp(48px,9vw,120px)]">
        {top}
      </h2>
    </header>
  )
}

// GitHub card body — identical structure between base and inverted so the
// chart panel sits at the same position in both states (no shift on hover).
function GithubBody({ inverted }) {
  const headerMuted = inverted ? 'text-primary-foreground/70' : 'text-muted'
  const headerIcon  = inverted ? 'text-primary-foreground'    : 'text-muted'
  const linkBase    = inverted ? 'text-primary-foreground/80' : 'text-muted'
  return (
    <div className={`p-7 flex flex-col gap-4 h-full ${inverted ? 'bg-foreground/80' : 'bg-surface'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GithubIcon size={16} className={headerIcon} />
          <span className={`text-[10px] font-bold tracking-[1.5px] uppercase ${headerMuted}`}>Contributions</span>
        </div>
        <a
          href="https://github.com/brysonhen"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[12px] font-semibold transition-colors hover:opacity-100 ${linkBase}`}
        >
          View Profile →
        </a>
      </div>
      <div className="flex-grow rounded-md bg-[#ebedf0] p-3 flex overflow-hidden">
        <img
          src="https://ghchart.rshah.org/0d0d0d/brysonhen"
          alt="GitHub contribution graph"
          className="w-full h-full"
          style={{ objectFit: 'fill' }}
        />
      </div>
    </div>
  )
}

// Intro card body — keeps the same layout for both base and inverted overlay
function IntroBody({ inverted, daysLeft, unit, display, onToggle }) {
  const textBase   = inverted ? 'text-primary-foreground' : 'text-foreground'
  const textMuted  = inverted ? 'text-primary-foreground/60' : 'text-muted'
  const textValue  = inverted ? 'text-primary-foreground' : 'text-foreground'
  const dotShadow  = inverted ? '0 0 8px #16a34a' : '0 0 8px #22c55e'
  return (
    <div className={`p-7 flex flex-col gap-6 h-full ${inverted ? 'bg-foreground/80' : 'bg-surface'}`}>
      <p className={`text-[17px] leading-[1.8] ${inverted ? 'text-primary-foreground/85' : 'text-foreground/80'}`}>
        Junior at Ole Miss studying Computer Science with a Data Science emphasis. Currently looking for software engineering and data science internships for summer 2026.
      </p>
      <div className="flex flex-wrap gap-x-7 gap-y-4 mt-auto">
        <div className="flex items-center gap-3.5">
          <MapPin size={18} className={`${textMuted} shrink-0`} />
          <div>
            <span className={`block text-[10px] font-bold tracking-[1.5px] uppercase ${textMuted}`}>Location</span>
            <span className={`text-[15px] font-medium ${textValue}`}>Madison &amp; Oxford, MS</span>
          </div>
        </div>
        <button onClick={onToggle} className="flex items-center gap-3.5 cursor-pointer group/grad" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${textMuted} shrink-0`}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
          <div className="text-left">
            <span className={`block text-[10px] font-bold tracking-[1.5px] uppercase ${textMuted} transition-colors`}>Until Graduation ↻</span>
            <span className={`text-[15px] font-medium ${textValue}`}>{display ?? '---'} <span className={`text-xs font-normal ${textMuted}`}>{unit}</span></span>
          </div>
        </button>
      </div>
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
        <div className="rounded-lg overflow-hidden border border-border bg-surface aspect-[4/5] md:aspect-auto h-full" style={{ gridArea: 'profile' }}>
          <img src={headshot} alt="Bryson Henderson" className="w-full h-full object-cover object-top" />
        </div>

        {/* Intro — now with reveal */}
        <div style={{ gridArea: 'intro' }} className="h-full">
          <RevealCardContainer
            accent="#262626"
            origin="0px 0px"
            className="w-full h-full rounded-lg"
            base={<IntroBody inverted={false} daysLeft={daysLeft} unit={unit} display={display} onToggle={() => setShowWeeks(v => !v)} />}
            overlay={<IntroBody inverted={true}  daysLeft={daysLeft} unit={unit} display={display} onToggle={() => setShowWeeks(v => !v)} />}
          />
        </div>

        {/* Know me */}
        <div style={{ gridArea: 'know' }} className="h-full">
          <RevealCardContainer
            accent="#262626"
            origin="0px 0px"
            className="w-full h-full rounded-lg"
            base={
              <div className="bg-surface p-7 flex flex-col gap-4 h-full">
                <span className="text-[22px] font-bold tracking-tight text-foreground">Get To Know Me</span>
                <p className="text-[14px] leading-[1.75] text-muted">Outside of school and work, you'll usually find me at the gym, on the soccer field, or playing a video game. Video games are actually what got me into CS. On campus I'm involved with Delta Psi and the Coding Club.</p>
              </div>
            }
            overlay={
              <div className="bg-foreground/80 p-7 flex flex-col gap-4 h-full">
                <span className="text-[22px] font-bold tracking-tight text-primary-foreground">Get To Know Me</span>
                <p className="text-[14px] leading-[1.75] text-primary-foreground/85">Outside of school and work, you'll usually find me at the gym, on the soccer field, or playing a video game. Video games are actually what got me into CS. On campus I'm involved with Delta Psi and the Coding Club.</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {['Gym', 'Soccer', 'Gaming', 'Delta Psi', 'Coding Club'].map(tag => (
                    <span key={tag} className="text-[12px] px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground font-semibold">{tag}</span>
                  ))}
                </div>
              </div>
            }
          />
        </div>

        {/* GitHub */}
        <div style={{ gridArea: 'github' }} className="h-full">
          <RevealCardContainer
            accent="#262626"
            origin="0px 0px"
            className="w-full h-full rounded-lg"
            base={<GithubBody inverted={false} />}
            overlay={<GithubBody inverted={true} />}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:.5} }
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
