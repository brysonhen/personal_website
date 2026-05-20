import { useEffect, useState } from 'react'

// Returns true when <html class="dark"> is set. Updates whenever the class flips
// (e.g. when the theme toggle runs). Components that paint to canvas or pick
// image URLs based on theme can subscribe to this.
export function useIsDark() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return true
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    const root = document.documentElement
    const update = () => setIsDark(root.classList.contains('dark'))
    const obs = new MutationObserver(update)
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    update()
    return () => obs.disconnect()
  }, [])

  return isDark
}
