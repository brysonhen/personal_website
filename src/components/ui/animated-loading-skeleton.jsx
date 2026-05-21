import { motion } from 'framer-motion'

// Shimmer bar that pulses like the real shimmer effect
function Bar({ w, h = 'h-3', delay = 0, rounded = 'rounded-full', className = '' }) {
  return (
    <motion.div
      className={`${h} ${w} ${rounded} bg-surface ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

function Pill({ w, h = 'h-10', delay = 0 }) {
  return (
    <motion.div
      className={`${h} ${w} rounded-full bg-surface`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

export default function AnimatedLoadingSkeleton() {
  return (
    <div className="fixed inset-0 z-[100] bg-bg overflow-hidden">

      {/* Navbar pill — matches fixed top-5 centered pill */}
      <div className="fixed top-5 inset-x-0 flex justify-center">
        <motion.div
          className="h-10 w-[420px] rounded-full bg-surface border border-border"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Hero — matches pt-[18vh] px-10 md:px-16 layout */}
      <div className="pt-[18vh] px-10 md:px-16">

        {/* BRYSON / HENDERSON name blocks */}
        <div className="leading-none mb-6">
          <Bar
            w="w-[clamp(260px,50vw,560px)]"
            h="h-[clamp(52px,10vw,110px)]"
            rounded="rounded-lg"
            delay={0}
          />
          <div className="mt-3">
            <Bar
              w="w-[clamp(320px,62vw,680px)]"
              h="h-[clamp(52px,10vw,110px)]"
              rounded="rounded-lg"
              delay={0.1}
              className="bg-primary/20"
            />
          </div>
        </div>

        {/* Typing text line */}
        <Bar w="w-64" h="h-5" delay={0.2} className="mb-9" />

        {/* Stats row — "Ole Miss '27 · GPA 3.54 · Data Science · badge" */}
        <div className="flex items-center gap-3 mb-10">
          <Bar w="w-20" h="h-2.5" delay={0.25} />
          <span className="text-border">·</span>
          <Bar w="w-16" h="h-2.5" delay={0.3} />
          <span className="text-border">·</span>
          <Bar w="w-24" h="h-2.5" delay={0.35} />
          <span className="text-border">·</span>
          <motion.div
            className="h-6 w-24 rounded-full bg-cta/10 border border-cta/30"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3">
          <motion.div
            className="h-10 w-32 rounded-full bg-primary/25"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          />
          <Pill w="w-28" delay={0.5} />
        </div>
      </div>

      {/* Subtle dot grid — same as real Hero */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 85% 30%, black 20%, transparent 65%)',
        maskImage: 'radial-gradient(ellipse 70% 80% at 85% 30%, black 20%, transparent 65%)',
      }} />
    </div>
  )
}
