// Smooth-scroll to an in-page section without leaving a #hash in the URL,
// so the address bar always stays on brysonhenderson.com.
export function handleAnchorClick(e) {
  const href = e.currentTarget.getAttribute('href')
  if (!href || !href.startsWith('#')) return
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  history.replaceState(null, '', window.location.pathname + window.location.search)
}
