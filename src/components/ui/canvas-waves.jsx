import { useEffect, useRef } from 'react'
import { useIsDark } from '../../lib/use-is-dark'

// Layered glow waves. Line + bg colors flip with the theme.
const WAVE_LAYERS = [
  { offset: 0,             amplitude: 70, frequency: 0.0030, lineAlpha: 1.00, opacity: 0.70 },
  { offset: Math.PI / 2,   amplitude: 90, frequency: 0.0026, lineAlpha: 0.85, opacity: 0.55 },
  { offset: Math.PI,       amplitude: 60, frequency: 0.0034, lineAlpha: 0.65, opacity: 0.45 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, lineAlpha: 0.45, opacity: 0.35 },
  { offset: Math.PI * 2,   amplitude: 55, frequency: 0.0040, lineAlpha: 0.90, opacity: 0.50 },
]

export default function CanvasWaves() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })
  const runningRef = useRef(true)
  const isDark = useIsDark()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Theme-aware colors. White waves on near-black page (dark), near-black
    // waves on white page (light).
    const lineRGB = isDark ? '250,250,250' : '17,17,17'
    const bgColor = isDark ? '#0a0a0a' : '#ffffff'
    const waves = WAVE_LAYERS.map(w => ({
      ...w,
      color: `rgba(${lineRGB},${w.lineAlpha})`,
    }))

    let animationId
    let time = 0

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouseInfluence  = prefersReducedMotion ? 10  : 70
    const influenceRadius = prefersReducedMotion ? 160 : 320
    const smoothing       = prefersReducedMotion ? 0.04 : 0.10

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width))
      canvas.height = Math.max(1, Math.floor(rect.height))
    }
    const recenter = () => {
      const c = { x: canvas.width / 2, y: canvas.height / 2 }
      mouseRef.current = c
      targetMouseRef.current = c
    }
    const onResize = () => { resize(); recenter() }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => recenter()

    const io = new IntersectionObserver(([entry]) => {
      runningRef.current = entry.isIntersecting
      if (entry.isIntersecting && !animationId) animationId = requestAnimationFrame(animate)
    }, { threshold: 0 })
    io.observe(canvas)

    resize()
    recenter()

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const drawWave = (wave) => {
      ctx.save()
      ctx.beginPath()
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x
        const dy = canvas.height / 2 - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / influenceRadius)
        const mouseEffect = influence * mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset)

        const y = canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.lineWidth = 3
      ctx.strokeStyle = wave.color
      ctx.globalAlpha = wave.opacity
      ctx.shadowBlur = 50
      ctx.shadowColor = wave.color
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      if (!runningRef.current) { animationId = null; return }
      time += 1
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      waves.forEach(drawWave)

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      if (animationId) cancelAnimationFrame(animationId)
      io.disconnect()
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full block"
    />
  )
}
