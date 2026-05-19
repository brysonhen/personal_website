export default function Footer() {
  return (
    <footer className="px-10 md:px-16 py-8 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold tracking-[1.5px] uppercase text-muted">
      <span>© 2026 Bryson Henderson</span>
      <a
        href="mailto:bryshenders@gmail.com"
        className="text-muted hover:text-foreground transition-colors duration-200 no-underline"
      >
        bryshenders@gmail.com
      </a>
    </footer>
  )
}
