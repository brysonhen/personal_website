import { useEffect, useState } from 'react'
import { useIsDark } from '../../lib/use-is-dark'

// 5-step gradient, level 0 = no contributions → level 4 = most.
// Tuned so every step is distinct AND level 0 is still visible against the panel.
const LEVELS_DARK  = ['#262626', '#525252', '#7a7a7a', '#a8a8a8', '#fafafa']
const LEVELS_LIGHT = ['#ebedf0', '#c0c0c0', '#8a8a8a', '#525252', '#0a0a0a']

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

// Self-rendered GitHub contribution heatmap. Fetches the last year of data and
// draws the grid ourselves so the colors are fully theme-controlled.
export default function Contributions() {
  const isDark = useIsDark()
  const [weeks, setWeeks] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('https://github-contributions-api.jogruber.de/v4/brysonhen?y=last')
      .then(r => { if (!r.ok) throw new Error('bad response'); return r.json() })
      .then(data => {
        if (!cancelled) setWeeks(groupIntoWeeks(data.contributions || []))
      })
      .catch(() => { /* leave placeholder grid on failure */ })
    return () => { cancelled = true }
  }, [])

  const levels = isDark ? LEVELS_DARK : LEVELS_LIGHT
  const panelBg = isDark ? '#0d0d0d' : '#ffffff'
  // 53 empty week-columns as the loading / fallback placeholder
  const grid = weeks || Array.from({ length: 53 }, () => new Array(7).fill(null))

  return (
    <div className="flex-grow rounded-md p-3" style={{ backgroundColor: panelBg }}>
      <div
        className="grid gap-[3px] w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
          gridTemplateRows: 'repeat(7, 1fr)',
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
                backgroundColor: day
                  ? levels[day.level]
                  : (weeks ? 'transparent' : levels[0]),
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
