import { useRef, useState } from 'react'
import { Mail, FileDown, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { SectionHeading } from './About'
import { RevealButton } from './ui/reveal-button'
import { Input, Textarea } from './ui/textarea'

const contactLinks = [
  { icon: Mail,        label: 'Email',    value: 'bryshenders@gmail.com', copy: true },
  { icon: LinkedinIcon,label: 'LinkedIn', value: 'brysonhenderson',       href: 'https://linkedin.com/in/brysonhenderson/' },
  { icon: GithubIcon,  label: 'GitHub',   value: 'brysonhen',             href: 'https://github.com/brysonhen' },
  { icon: FileDown,    label: 'Resume',   value: 'Download PDF',          href: '/resume.pdf', download: true },
]

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
    <section id="contact" className="px-10 md:px-16 py-20 ">
      <SectionHeading top="GET IN" ghost="TOUCH" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-10">

        {/* Left — links */}
        <div>
          <p className="text-[17px] leading-[1.8] text-muted mb-6">
            I'm always open to new opportunities, collaborations, or just a conversation. Feel free to reach out.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {contactLinks.map(({ icon: Icon, label, value, copy, href, download }) => {
              const isCopied = copy && copied
              const Tag = href ? 'a' : 'button'
              const extra = href
                ? { href, target: download ? '_self' : '_blank', rel: 'noopener noreferrer', download: download || undefined }
                : { onClick: () => handleCopy(value) }
              return (
                <Tag key={label} {...extra}
                  className={`relative flex items-center gap-4 px-5 py-4 bg-surface border rounded-[14px] text-left no-underline text-inherit cursor-pointer transition-colors duration-200 group
                    ${isCopied ? 'border-ring' : 'border-border hover:border-ring'}`}
                >
                  <Icon size={20} className="text-muted group-hover:text-foreground transition-colors duration-200 shrink-0" />
                  <div>
                    <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-0.5">{label}</div>
                    <div className="text-[14px] font-medium text-foreground">{value}</div>
                  </div>
                  {copy && (
                    <div className={`absolute inset-0 flex items-center justify-center rounded-[14px] bg-surface text-[13px] font-bold text-foreground transition-opacity duration-200 ${isCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      Copied!
                    </div>
                  )}
                </Tag>
              )
            })}
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
          <RevealButton type="submit" disabled={sending} className="self-start rounded-[8px] px-6 disabled:opacity-50 disabled:cursor-not-allowed">
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
