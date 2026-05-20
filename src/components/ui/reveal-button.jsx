import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '../../lib/utils'

// Button (or anchor) that runs a circular blue reveal from the top-left corner
// on hover, matching the card reveal effect. Text fades to white as the reveal
// expands so it stays readable against the blue background.
//
//   <RevealButton as="a" href="#projects">View Projects</RevealButton>
export function RevealButton({
  as: Tag = 'button',
  children,
  className,
  origin = '0px 0px',
  accent = '#fafafa',
  ...rest
}) {
  const holderRef = useRef(null)
  const overlayRef = useRef(null)

  const startClip = `circle(0px at ${origin})`
  const expandClip = `circle(160% at ${origin})`

  useGSAP(() => {
    gsap.set(overlayRef.current, { clipPath: startClip })
  }, { scope: holderRef })

  const reveal = () => gsap.to(overlayRef.current, { clipPath: expandClip, duration: 0.7, ease: 'expo.inOut' })
  const conceal = () => gsap.to(overlayRef.current, { clipPath: startClip, duration: 0.9, ease: 'expo.out' })

  return (
    <Tag
      ref={holderRef}
      onMouseEnter={reveal}
      onMouseLeave={conceal}
      className={cn(
        'group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-5 py-2.5 text-sm font-semibold cursor-pointer select-none',
        'bg-card text-foreground border border-border transition-colors duration-300',
        'hover:text-primary-foreground hover:border-primary',
        className
      )}
      {...rest}
    >
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: accent }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Tag>
  )
}
