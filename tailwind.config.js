/** @type {import('tailwindcss').Config} */
// Dark-only neutral theme. Mapped from shadcn .dark CSS variables.
// Zero blues — primary is near-white, all surfaces are neutral grays.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // page (#0a0a0a per --background) + cards slightly elevated so the bento reads
        bg:            '#0a0a0a',
        background:    '#0a0a0a',
        card:          '#111111',   // 1-step elevation above page
        surface:       '#111111',   // legacy alias — same as card

        // text
        foreground:    '#fafafa',
        muted:         '#a1a1a1',   // muted-foreground — text color

        // surfaces / borders / fills (per --border, --input, --muted, --accent, --secondary all = #262626)
        border:        '#262626',
        input:         '#262626',
        accent:        '#262626',
        secondary:     '#262626',

        // focus ring + subtle outline
        ring:          '#525252',

        // active / primary — flipped from blue to near-white (per --primary = #fafafa in .dark)
        primary:       '#fafafa',
        'primary-foreground': '#0a0a0a',

        // semantic
        destructive:   '#e7000b',
        cta:           '#22C55E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
