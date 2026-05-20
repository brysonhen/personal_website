import { useState } from 'react'

const links = [
  { href: '#home',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#projects',   label: 'Projects' },
  { href: '#education',  label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills',     label: 'Skills' },
  { href: '#contact',    label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      style={{ transformOrigin: 'top center' }}
      className="fixed top-0 left-0 right-0 z-50 scale-95 -translate-y-1 opacity-90"
    >
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(v => !v)}
        className="md:hidden absolute top-5 right-5 z-20 p-2"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        <div className={`w-6 h-0.5 bg-foreground mb-1.5 transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`w-6 h-0.5 bg-foreground mb-1.5 transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
        <div className={`w-6 h-0.5 bg-foreground transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <div
        className={`
          flex items-center justify-center w-full py-6
          ${mobileOpen ? 'flex' : 'hidden md:flex'}
        `}
      >
        <ul className="flex flex-col items-center gap-4 md:flex-row md:gap-2 lg:gap-3">
          {links.map(({ href, label }) => (
            <li key={href} className="list-none">
              <a
                href={href}
                className="relative inline-block group select-none"
                onClick={() => setMobileOpen(false)}
              >
                {/* Link text — flips dark on hover when white fill arrives */}
                <span className="
                  relative z-10 block uppercase font-sans font-semibold
                  text-foreground transition-colors duration-300
                  group-hover:text-primary-foreground
                  text-base py-2 px-4
                  md:text-sm md:py-2 md:px-3
                  lg:text-base lg:py-2 lg:px-4
                ">
                  {label}
                </span>
                {/* Top + bottom border lines that scale-Y in */}
                <span className="
                  absolute inset-0 border-t-2 border-b-2 border-foreground
                  scale-y-[2] opacity-0
                  transition-all duration-300 origin-center
                  group-hover:scale-y-100 group-hover:opacity-100
                  pointer-events-none
                " />
                {/* Solid fill that scales-in from the top */}
                <span className="
                  absolute top-[2px] left-0 w-full h-full bg-foreground
                  scale-0 opacity-0
                  transition-all duration-300 origin-top
                  group-hover:scale-100 group-hover:opacity-100
                  pointer-events-none
                " />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
