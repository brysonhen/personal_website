import { useRef, useState } from 'react'
import { Mail, Send, Download } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { GithubIcon, LinkedinIcon } from './Icons'
import { SectionHeading } from './About'
import { RevealButton } from './ui/reveal-button'
import { Input, Textarea } from './ui/textarea'

const contactLinks = [
  { icon: Mail,        label: 'Email',    value: 'bryshenders@gmail.com', copy: true },
  { icon: LinkedinIcon,label: 'LinkedIn', value: 'brysonhenderson',       href: 'https://linkedin.com/in/brysonhenderson/' },
  { icon: GithubIcon,  label: 'GitHub',   value: 'brysonhen',             href: 'https://github.com/brysonhen' },
]

// Contact card with the same GSAP circular clip-path reveal as the other reveal elements.
// Base state: dark card. Hover: white overlay slides out from the top-left corner.
function ContactCard({ icon: Icon, label, value, copy, href, download, onCopy, isCopied }) {
  const holderRef = useRef(null)
  const overlayRef = useRef(null)

  const startClip = 'circle(0px at 0px 0px)'
  const expandClip = 'circle(160% at 0px 0px)'

  useGSAP(() => {
    gsap.set(overlayRef.current, { clipPath: startClip })
  }, { scope: holderRef })

  const reveal = () => gsap.to(overlayRef.current, { clipPath: expandClip, duration: 0.7, ease: 'expo.inOut' })
  const conceal = () => gsap.to(overlayRef.current, { clipPath: startClip, duration: 0.9, ease: 'expo.out' })

  const Tag = href ? 'a' : 'button'
  const extra = href
    ? { href, target: download ? '_self' : '_blank', rel: 'noopener noreferrer', download: download || undefined }
    : { onClick: () => onCopy(value), type: 'button' }

  return (
    <Tag
      ref={holderRef}
      onMouseEnter={reveal}
      onMouseLeave={conceal}
      {...extra}
      className="relative block overflow-hidden rounded-2xl border border-border bg-surface text-left no-underline text-inherit cursor-pointer group"
    >
      {/* Base */}
      <div className="relative flex items-center gap-4 px-5 py-4">
        <Icon size={20} className="text-muted shrink-0" />
        <div className="min-w-0">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-0.5">{label}</div>
          <div className="text-[14px] font-medium text-foreground truncate">{isCopied ? 'Copied!' : value}</div>
        </div>
      </div>

      {/* Overlay — white inversion, revealed on hover */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center gap-4 px-5 py-4 bg-primary text-primary-foreground pointer-events-none"
      >
        <Icon size={20} className="shrink-0" />
        <div className="min-w-0">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase opacity-70 mb-0.5">{label}</div>
          <div className="text-[14px] font-medium truncate">{isCopied ? 'Copied!' : value}</div>
        </div>
      </div>
    </Tag>
  )
}

// One half of the resume button — a clickable area with its own GSAP reveal overlay.
function ResumeHalf({ href, download, target, rel, ariaLabel, className = '', baseContent, overlayContent }) {
  const holderRef = useRef(null)
  const overlayRef = useRef(null)

  const startClip = 'circle(0px at 0px 0px)'
  const expandClip = 'circle(160% at 0px 0px)'

  useGSAP(() => {
    gsap.set(overlayRef.current, { clipPath: startClip })
  }, { scope: holderRef })

  const reveal = () => gsap.to(overlayRef.current, { clipPath: expandClip, duration: 0.7, ease: 'expo.inOut' })
  const conceal = () => gsap.to(overlayRef.current, { clipPath: startClip, duration: 0.9, ease: 'expo.out' })

  return (
    <a
      ref={holderRef}
      onMouseEnter={reveal}
      onMouseLeave={conceal}
      href={href}
      target={target}
      rel={rel}
      download={download}
      aria-label={ariaLabel}
      className={`relative overflow-hidden no-underline text-inherit cursor-pointer ${className}`}
    >
      {/* Base */}
      <div className="relative flex items-center h-full px-5 py-4">
        {baseContent}
      </div>
      {/* White-inversion overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center px-5 py-4 bg-primary text-primary-foreground pointer-events-none"
      >
        {overlayContent}
      </div>
    </a>
  )
}

// Resume button — split into two real clickable halves (Preview | Download)
// with a vertical divider line between them. Each half has its own hover reveal.
function ResumeButton() {
  return (
    <div className="flex rounded-2xl border border-border bg-surface overflow-hidden">
      {/* Preview — opens the PDF in a new tab */}
      <ResumeHalf
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1"
        baseContent={
          <div className="min-w-0">
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-0.5">Resume</div>
            <div className="text-[14px] font-medium text-foreground">Preview</div>
          </div>
        }
        overlayContent={
          <div className="min-w-0">
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase opacity-70 mb-0.5">Resume</div>
            <div className="text-[14px] font-medium">Preview</div>
          </div>
        }
      />

      {/* Divider line */}
      <div className="w-px bg-border self-stretch" aria-hidden="true" />

      {/* Download — triggers a PDF download */}
      <ResumeHalf
        href="/resume.pdf"
        download="bryson-henderson-resume.pdf"
        ariaLabel="Download resume"
        className="flex items-center justify-center"
        baseContent={<Download size={20} className="text-foreground" />}
        overlayContent={<Download size={20} />}
      />
    </div>
  )
}

export default function Contact() {
  const [copied, setCopied]   = useState(false)
  const [status, setStatus]   = useState('')
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus('')
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="px-10 md:px-16 pt-32 pb-20">
      <SectionHeading top="CONTACT" ghost="Get in touch" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-10">

        {/* Left — links */}
        <div>
          <p className="text-[17px] leading-[1.8] text-muted mb-6">
            I'm always open to new opportunities, collaborations, or just a conversation. Feel free to reach out.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactLinks.map(item => (
              <ContactCard
                key={item.label}
                {...item}
                onCopy={handleCopy}
                isCopied={item.copy && copied}
              />
            ))}
            <ResumeButton />
          </div>
        </div>

        {/* Right — form */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name"  id="cf-name"  name="from_name" placeholder="Your name"        required />
            <Field label="Email" id="cf-email" name="reply_to"  type="email" placeholder="your@email.com" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cf-message" className="text-[11px] font-bold uppercase tracking-[1.5px] text-muted">Message</label>
            <Textarea id="cf-message" name="message" rows={5} placeholder="What's on your mind?" required className="min-h-[140px]" />
          </div>
          <RevealButton type="submit" disabled={sending} className="self-start px-6 disabled:opacity-50 disabled:cursor-not-allowed">
            <Send size={14} />
            {sending ? 'Sending…' : 'Send Message'}
          </RevealButton>
          {status === 'success' && <p className="text-sm text-cta">Message sent!</p>}
          {status === 'error'   && <p className="text-sm text-red-500">Something went wrong. Try emailing directly.</p>}
        </form>
      </div>
    </section>
  )
}

function Field({ label, id, type = 'text', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[1.5px] text-muted">{label}</label>
      <Input id={id} type={type} {...props} />
    </div>
  )
}
