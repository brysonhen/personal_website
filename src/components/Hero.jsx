import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { GithubIcon } from './Icons'
import { RevealButton } from './ui/reveal-button'
import CanvasWaves from './ui/canvas-waves'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-start pt-[18vh] px-10 md:px-16 overflow-hidden bg-bg">
      {/* Mouse-reactive glowing waves */}
      <CanvasWaves />

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-5xl">
        {/* Name styled exactly like SectionHeading — small label + horizontal rule + big bold title */}
        <motion.header variants={item} className="mb-10 md:mb-12">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted shrink-0">
              /
            </span>
            <span className="flex-1 h-px bg-border" aria-hidden="true" />
          </div>
          <h1 className="font-sans font-bold tracking-[-0.04em] leading-[0.95] text-foreground text-[clamp(48px,9vw,120px)]">
            <span className="block">BRYSON</span>
            <span className="block">HENDERSON</span>
          </h1>
        </motion.header>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <RevealButton as="a" href="#projects">View Projects</RevealButton>
          <RevealButton as="a" href="https://github.com/brysonhen" target="_blank" rel="noopener noreferrer">
            <GithubIcon size={14} /> GitHub
          </RevealButton>
        </motion.div>
      </motion.div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-14 right-10 md:right-16 flex flex-col items-center gap-2 text-muted hover:text-foreground transition-colors duration-200 group cursor-pointer">
        <span className="text-[10px] font-semibold tracking-[3px] uppercase opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">Scroll</span>
        <ArrowDown size={18} />
      </motion.a>
    </section>
  )
}
