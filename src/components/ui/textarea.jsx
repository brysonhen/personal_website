import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

// shadcn-style textarea + input, themed to the dark site:
//   border-border on bg-surface, text-foreground,
//   focus-visible ring in primary (white) with a 2px bg-color offset.

const SHARED =
  'w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground ' +
  'placeholder:text-muted/50 ' +
  'transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

export const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(SHARED, 'flex min-h-[80px] py-2 resize-none', className)}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(SHARED, 'flex h-10 py-2', className)}
    {...props}
  />
))
Input.displayName = 'Input'
