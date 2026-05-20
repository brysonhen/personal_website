import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

// Wrap each "page" of the site in <FlowSection>...</FlowSection>.
// `from`: which corner the page rotates in from — 'bl' (bottom-left, default),
// 'br' (bottom-right), 'tl' (top-left), 'tr' (top-right).
export function FlowSection({ children, className, style, from = 'bl', 'aria-label': ariaLabel }) {
  return (
    <div
      data-flow-section
      data-flow-from={from}
      aria-label={ariaLabel}
      className={cn('relative min-h-screen w-full overflow-hidden bg-bg', className)}
      style={style}
    >
      <div className="flow-art-container relative w-full min-h-screen will-change-transform">
        {children}
      </div>
    </div>
  )
}

// Parent that drives the scroll timeline.
// Each [data-flow-section] pins at its bottom; the next section's inner
// container rotates in from 30deg → 0 as it enters the viewport.
export default function FlowArt({ children, className, 'aria-label': ariaLabel = 'Story scroll' }) {
  const containerRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useGSAP(() => {
    if (!containerRef.current || reducedMotion) return

    const sections = Array.from(containerRef.current.querySelectorAll('[data-flow-section]'))
    if (sections.length === 0) return

    const triggers = []

    sections.forEach((section, i) => {
      const inner = section.querySelector('.flow-art-container')
      if (!inner) return

      // No pin, no scroll-tied scrub. Each section plays its entry animation
      // ONCE when it enters the viewport (~80% from top), independent of scroll
      // speed. Result: scroll feels native, sections still get a distinctive
      // entrance, and the user can rest on any section by simply not scrolling.
      if (i > 0) {
        const from = section.getAttribute('data-flow-from') || 'bl'
        const cfg = {
          bl: { origin: 'bottom left',  rotation:  10 },
          br: { origin: 'bottom right', rotation: -10 },
          tl: { origin: 'top left',     rotation: -10 },
          tr: { origin: 'top right',    rotation:  10 },
        }[from]

        gsap.set(inner, {
          rotation: cfg.rotation,
          transformOrigin: cfg.origin,
          opacity: 0.15,
          scale: 0.96,
        })

        const tween = gsap.to(inner, {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            // Play forward on enter; reverse only when scrolling back above.
            toggleActions: 'play none none reverse',
          },
        })
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
      }
    })

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, { scope: containerRef, dependencies: [reducedMotion] })

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cn('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  )
}
