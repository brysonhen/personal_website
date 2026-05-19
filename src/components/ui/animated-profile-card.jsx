import { forwardRef, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '../../lib/utils'

// Wrap any card content with a circular clip-path reveal animation on hover.
// Pass `base` (the resting card) and `overlay` (the hover state) as JSX nodes.
export const RevealCardContainer = forwardRef((
  {
    base,
    overlay,
    accent = '#fafafa',
    // origin: where the circular reveal starts, as "Xpx Ypx"
    origin = '0px 0px',
    className,
    ...rest
  },
  ref
) => {
  const holderRef = useRef(null)
  const overlayRef = useRef(null)

  const assignRef = useCallback(el => {
    holderRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }, [ref])

  const startClip = `circle(0px at ${origin})`
  const expandClip = `circle(160% at ${origin})`

  useGSAP(() => {
    gsap.set(overlayRef.current, { clipPath: startClip })
  }, { scope: holderRef })

  const reveal = () => {
    gsap.to(overlayRef.current, { clipPath: expandClip, duration: 0.8, ease: 'expo.inOut' })
  }
  const conceal = () => {
    gsap.to(overlayRef.current, { clipPath: startClip, duration: 1, ease: 'expo.out' })
  }

  return (
    <div
      ref={assignRef}
      onMouseEnter={reveal}
      onMouseLeave={conceal}
      style={{ '--accent-color': accent, borderColor: 'var(--accent-color)' }}
      className={cn('relative overflow-hidden rounded-3xl border-2', className)}
      {...rest}
    >
      <div>{base}</div>
      <div ref={overlayRef} className="absolute inset-0 h-full w-full">
        {overlay}
      </div>
    </div>
  )
})
RevealCardContainer.displayName = 'RevealCardContainer'
