import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { GithubIcon } from './Icons'
import { RevealButton } from './ui/reveal-button'
import CanvasWaves from './ui/canvas-waves'

const roles = [
  'CS & Data Science @ Ole Miss',
  'Building things with code',
  'Open to internships',
]

function TypingText() {
  const [displayed, setDisplayed] = useState('')
  const [roleIdx, setRoleIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    let timeout
    if (!deleting && charIdx < current.length)      timeout = setTimeout(() => setCharIdx(i => i + 1), 60)
    else if (!deleting && charIdx === current.length) timeout = setTimeout(() => setDeleting(true), 2200)
    else if (deleting && charIdx > 0)                timeout = setTimeout(() => setCharIdx(i => i - 1), 32)
    else { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length) }
    setDisplayed(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, roleIdx])

  return (
    <span className="text-primary">
      {displayed}
      <span className="animate-[blink_1s_step-end_infinite] text-primary">|</span>
    </span>
  )
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-start pt-[18vh] px-10 md:px-16 overflow-hidden bg-bg">
      {/* Mouse-reactive glowing waves (theme-locked colors) */}
      <CanvasWaves />

      {/* Subtle vignette so text stays legible over the waves */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 20% 35%, rgba(23,23,23,0.55) 0%, transparent 70%)',
      }} />

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-4xl">
        {/* Name */}
        <motion.div variants={item} className="leading-none mb-6">
          <span className="block font-sans text-[clamp(52px,10vw,110px)] font-bold tracking-tighter text-foreground">
            BRYSON
          </span>
          <span className="block font-sans text-[clamp(52px,10vw,110px)] font-bold tracking-tighter"
            style={{
              background: 'linear-gradient(180deg, #fafafa 0%, rgba(250,250,250,0.35) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
            HENDERSON
          </span>
        </motion.div>

        {/* Typing text */}
        <motion.p variants={item} className="text-lg font-medium min-h-[1.5em] mb-9">
          <TypingText />
        </motion.p>

        {/* Stats row — flex-wrap with gap means separators never dangle on wrap */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold tracking-[1.5px] uppercase text-muted mb-10">
          <span>Ole Miss '27</span>
          <span className="opacity-30" aria-hidden="true">·</span>
          <span>GPA 3.54</span>
          <span className="opacity-30" aria-hidden="true">·</span>
          <span>Data Science</span>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <RevealButton as="a" href="#projects">View Projects</RevealButton>
          <RevealButton as="a" href="https://github.com/brysonhen" target="_blank" rel="noopener noreferrer">
            <GithubIcon size={14} /> GitHub
          </RevealButton>
        </motion.div>
      </motion.div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-14 right-10 md:right-16 flex flex-col items-center gap-2 text-muted group cursor-pointer">
        <span className="text-[10px] font-semibold tracking-[3px] uppercase opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">SCROLL</span>
        <ArrowDown size={18} className="animate-bounce" />
      </motion.a>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </section>
  )
}
