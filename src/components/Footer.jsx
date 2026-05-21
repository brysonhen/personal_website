import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons'

const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#projects',   label: 'Projects' },
  { href: '#education',  label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills',     label: 'Skills' },
  { href: '#contact',    label: 'Contact' },
]

const socials = [
  { icon: GithubIcon,    href: 'https://github.com/brysonhen',             label: 'GitHub'    },
  { icon: LinkedinIcon,  href: 'https://linkedin.com/in/brysonhenderson/', label: 'LinkedIn'  },
  { icon: InstagramIcon, href: 'https://www.instagram.com/brysonhende/',   label: 'Instagram' },
  { icon: Mail,          href: 'mailto:bryshenders@gmail.com',             label: 'Email'     },
]

export default function Footer() {
  return (
    <footer className="px-10 md:px-16 pt-16 pb-10 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto">
        {/* Top row: identity + nav + back-to-top */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-10 mb-12">
          {/* Identity */}
          <div>
            <div className="text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em] leading-none text-foreground mb-2">
              Bryson Henderson
            </div>
          </div>

          {/* Quick nav */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-4">Navigate</div>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors no-underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:justify-self-end">
            <a
              href="#home"
              className="group inline-flex flex-col items-end gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-muted hover:text-foreground transition-colors no-underline"
              aria-label="Back to top"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border group-hover:border-foreground transition-colors">
                <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
              Back to top
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" aria-hidden="true" />

        {/* Bottom row: copyright + socials + built-with */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-muted">
          <span>© {new Date().getFullYear()} Bryson Henderson</span>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}
