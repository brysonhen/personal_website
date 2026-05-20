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
            / {ghost}
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

// Intro card body — keeps the same layout for both base and inverted overlay
function IntroBody({ inverted, daysLeft, unit, display, onToggle }) {
  const textBase   = inverted ? 'text-primary-foreground' : 'text-foreground'
  const textMuted  = inverted ? 'text-primary-foreground/60' : 'text-muted'
  const textValue  = inverted ? 'text-primary-foreground' : 'text-foreground'
  const dotShadow  = inverted ? '0 0 8px #16a34a' : '0 0 8px #22c55e'
  return (
    <div className={`p-7 flex flex-col gap-6 h-full ${inverted ? 'bg-primary' : 'bg-surface'}`}>
      <p className={`text-[17px] leading-[1.8] ${inverted ? 'text-primary-foreground/85' : 'text-foreground/80'}`}>
        I'm a junior at Ole Miss studying Computer Science with a Data Science emphasis. I love building things and solving problems, and I'm working toward a career in data science. Right now I'm looking for internships and opportunities where I can learn and actually make a difference.
      </p>
      <div className="flex flex-wrap gap-x-7 gap-y-4 mt-auto">
        <div className="flex items-center gap-3.5">
          <MapPin size={18} className={`${textMuted} shrink-0`} />
          <div>
            <span className={`block text-[10px] font-bold tracking-[1.5px] uppercase ${textMuted}`}>Location</span>
            <span className={`text-[15px] font-medium ${textValue}`}>Madison &amp; Oxford, MS</span>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cta shrink-0 animate-[pulse-dot_2s_ease_infinite]" style={{ boxShadow: dotShadow }} />
          <div>
            <span className={`block text-[10px] font-bold tracking-[1.5px] uppercase ${textMuted}`}>Status</span>
            <span className={`text-[15px] font-medium ${textValue}`}>Open to opportunities</span>
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
        <div className="rounded-[22px] overflow-hidden border border-border bg-surface group cursor-pointer aspect-[4/5] md:aspect-auto h-full" style={{ gridArea: 'profile' }}>
          <img src={headshot} alt="Bryson Henderson" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        </div>

        {/* Intro — now with reveal */}
        <div style={{ gridArea: 'intro' }} className="h-full">
          <RevealCardContainer
            accent="#262626"
            origin="0px 0px"
            className="w-full h-full rounded-[22px]"
            base={<IntroBody inverted={false} daysLeft={daysLeft} unit={unit} display={display} onToggle={() => setShowWeeks(v => !v)} />}
            overlay={<IntroBody inverted={true}  daysLeft={daysLeft} unit={unit} display={display} onToggle={() => setShowWeeks(v => !v)} />}
          />
        </div>

        {/* Know me */}
        <div style={{ gridArea: 'know' }} className="h-full">
          <RevealCardContainer
            accent="#262626"
            origin="0px 0px"
            className="w-full h-full rounded-[22px]"
            base={
              <div className="bg-surface p-7 flex flex-col gap-4 h-full">
                <span className="text-[22px] font-bold tracking-tight text-foreground">Get To Know Me</span>
                <p className="text-[14px] leading-[1.75] text-muted">Outside of school and work, you'll usually find me at the gym, on the soccer field, or playing a video game. Video games are actually what got me into CS. On campus I'm involved with Delta Psi and the Coding Club.</p>
              </div>
            }
            overlay={
              <div className="bg-primary p-7 flex flex-col gap-4 h-full">
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
            className="w-full h-full rounded-[22px]"
            base={
              <div className="bg-surface p-7 flex flex-col gap-4 h-full">
                <div className="flex items-center gap-2">
                  <GithubIcon size={16} className="text-muted" />
                  <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted">Contributions</span>
                </div>
                {/* flex-grow container so the chart fills the bottom of the card.
                    Subtle bg tint gives empty (no-contribution) cells contrast to read against. */}
                <div className="flex-grow rounded-xl bg-foreground/[0.05] p-3 flex overflow-hidden">
                  <img
                    src="https://ghchart.rshah.org/fafafa/brysonhen"
                    alt="GitHub contribution graph"
                    className="w-full h-full"
                    style={{ objectFit: 'fill' }}
                  />
                </div>
              </div>
            }
            overlay={
              <div className="bg-primary p-7 flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GithubIcon size={16} className="text-primary-foreground" />
                    <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-primary-foreground/70">Contributions</span>
                  </div>
                  <a href="https://github.com/brysonhen" target="_blank" rel="noopener noreferrer"
                    className="text-[12px] font-semibold text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    View Profile →
                  </a>
                </div>
                {/* Slightly tinted bg so empty squares (which ghchart renders at very low alpha)
                    don't disappear into the white card on hover. */}
                <div className="flex-grow rounded-xl bg-primary-foreground/[0.08] p-3 flex overflow-hidden">
                  <img
                    src="https://ghchart.rshah.org/0a0a0a/brysonhen"
                    alt="GitHub contribution graph"
                    className="w-full h-full"
                    style={{ objectFit: 'fill' }}
                  />
                </div>
              </div>
            }
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
