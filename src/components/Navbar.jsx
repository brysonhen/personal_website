import { useEffect, useState } from 'react'
import { Home, User, Laptop, GraduationCap, Briefcase, Code, Send } from 'lucide-react'
import { motion } from 'framer-motion'

const links = [
  { href: '#home',       icon: Home,          label: 'Home' },
  { href: '#about',      icon: User,          label: 'About' },
  { href: '#projects',   icon: Laptop,        label: 'Projects' },
  { href: '#education',  icon: GraduationCap, label: 'Education' },
  { href: '#experience', icon: Briefcase,     label: 'Experience' },
  { href: '#skills',     icon: Code,          label: 'Skills' },
  { href: '#contact',    icon: Send,          label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-5 inset-x-0 mx-auto w-fit z-50 flex items-center gap-1 px-2.5 py-2 rounded-full border border-border bg-bg/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] select-none"
    >
      {links.map(({ href, icon: Icon, label }) => {
        const isActive = active === href
        return (
          <a
            key={href}
            href={href}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors duration-200 cursor-pointer
              ${isActive ? 'text-primary-foreground' : 'text-muted hover:text-foreground'}`}
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              />
            )}
            <Icon size={14} className="relative z-10 shrink-0" />
            <span className="relative z-10 hidden sm:inline">{label}</span>
          </a>
        )
      })}
    </motion.nav>
  )
}
