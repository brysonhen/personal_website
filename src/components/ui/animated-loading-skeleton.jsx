import { motion } from 'framer-motion'

// Shimmer bar that pulses to suggest content is loading
function Bar({ w, h = 'h-3', delay = 0, rounded = 'rounded-full', className = '' }) {
  return (
    <motion.div
      className={`${h} ${w} ${rounded} bg-surface ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

// Generic section skeleton — mirrors the universal layout every section shares
// (small label + hairline rule + big title + content blocks), so it looks right
// no matter where the page is reloaded.
export default function AnimatedLoadingSkeleton() {
  return (
    <div className="fixed inset-0 z-[100] bg-bg overflow-hidden">

      {/* Navbar — centered row of link-sized bars */}
      <div className="fixed top-0 inset-x-0 flex justify-center py-5">
        <div className="flex items-center gap-4">
          {['w-11', 'w-14', 'w-16', 'w-16', 'w-20', 'w-12', 'w-14'].map((w, i) => (
            <Bar key={i} w={w} h="h-3" delay={i * 0.06} />
          ))}
        </div>
      </div>

      {/* Section body — matches px-10 md:px-16 pt-32 layout */}
      <div className="pt-32 px-10 md:px-16">

        {/* Section heading — label + hairline rule */}
        <div className="flex items-center gap-4 mb-5">
          <Bar w="w-28" h="h-2.5" delay={0} />
          <span className="flex-1 h-px bg-border" aria-hidden="true" />
        </div>

        {/* Big title */}
        <Bar
          w="w-[clamp(280px,55vw,620px)]"
          h="h-[clamp(48px,9vw,110px)]"
          rounded="rounded-lg"
          delay={0.1}
          className="mb-12 md:mb-16"
        />

        {/* Content blocks */}
        <div className="flex flex-col gap-4 max-w-4xl">
          <Bar w="w-full"  h="h-24" rounded="rounded-lg" delay={0.2} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Bar w="w-full" h="h-40" rounded="rounded-lg" delay={0.3} />
            <Bar w="w-full" h="h-40" rounded="rounded-lg" delay={0.4} />
          </div>
        </div>
      </div>
    </div>
  )
}
