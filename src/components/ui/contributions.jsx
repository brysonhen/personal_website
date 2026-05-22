import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../Icons'

// GitHub's own contribution palette — level 0 = none → level 4 = most.
// Used in both themes so the chart always reads like GitHub's graph.
const LEVELS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']

// Group the flat day list into GitHub-style week columns (Sun→Sat).
function groupIntoWeeks(days) {
  const weeks = []
  let week = new Array(7).fill(null)
  days.forEach((day, idx) => {
    const dow = new Date(day.date + 'T00:00:00').getDay()
    week[dow] = day
    if (dow === 6 || idx === days.length - 1) {
      weeks.push(week)
      week = new Array(7).fill(null)
    }
  })
  return weeks
}

// Standalone contribution band — a compact, understated accent between sections.
// Self-rendered heatmap with GitHub's real palette; scrolls on narrow screens.
export default function Contributions() {
  const [weeks, setWeeks] = useState(null)
  const [total, setTotal] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('https://github-contributions-api.jogruber.de/v4/brysonhen?y=last')
      .then(r => { if (!r.ok) throw new Error('bad response'); return r.json() })
      .then(data => {
        if (cancelled) return
        setWeeks(groupIntoWeeks(data.contributions || []))
        setTotal(data.total?.lastYear ?? null)
      })
      .catch(() => { /* leave placeholder grid on failure */ })
    return () => { cancelled = true }
  }, [])

  const levels = LEVELS
  const panelBg = '#0d1117'
  const grid = weeks || Array.from({ length: 53 }, () => new Array(7).fill(null))

  return (
    <section id="contributions" className="px-10 md:px-16 py-16">
      {/* Whole block is one link — hovering anywhere (label OR chart) drives the
          growing underline + arrow popup, same as the project links. */}
      <a
        href="https://github.com/brysonhen"
        target="_blank"
        rel="noopener noreferrer"
        className="group block max-w-4xl mx-auto no-underline text-inherit"
      >
        {/* Understated label row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GithubIcon size={13} className="text-muted" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted">
              {total != null
                ? `${total} contributions this year`
                : 'GitHub contributions'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted group-hover:text-foreground transition-colors">
            <span className="relative">
              @brysonhen
              <span className="absolute left-0 -bottom-0.5 h-px bg-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1.5 translate-y-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out" />
          </span>
        </div>

        {/* Compact heatmap panel */}
        <div
          className="rounded-md border border-border p-3 overflow-x-auto"
          style={{ backgroundColor: panelBg }}
        >
          <div
            className="grid gap-[3px] w-full"
            style={{
              minWidth: '620px',
              gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
              gridTemplateRows: 'repeat(7, auto)',
              gridAutoFlow: 'column',
            }}
          >
            {grid.flatMap((week, wi) =>
              week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  className="rounded-[2px]"
                  title={day ? `${day.count} on ${day.date}` : undefined}
                  style={{
                    aspectRatio: '1 / 1',
                    backgroundColor: day
                      ? levels[day.level]
                      : (weeks ? 'transparent' : levels[0]),
                  }}
                />
              ))
            )}
          </div>
        </div>
      </a>
    </section>
  )
}
