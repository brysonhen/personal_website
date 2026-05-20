/** @type {import('tailwindcss').Config} */
// Theme tokens resolve from CSS variables in index.css.
// Light values live in :root, dark overrides live in `.dark`.
// `<alpha-value>` makes Tailwind opacity modifiers like `bg-foreground/80` work.
const cssVar = name => `rgb(var(${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:                   cssVar('--bg'),
        background:           cssVar('--bg'),
        card:                 cssVar('--surface'),
        surface:              cssVar('--surface'),
        border:               cssVar('--border'),
        input:                cssVar('--border'),
        muted:                cssVar('--muted'),
        foreground:           cssVar('--foreground'),
        primary:              cssVar('--primary'),
        'primary-foreground': cssVar('--primary-foreground'),
        secondary:            cssVar('--secondary'),
        accent:               cssVar('--accent'),
        ring:                 cssVar('--ring'),
        cta:                  cssVar('--cta'),
        destructive:          cssVar('--destructive'),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
