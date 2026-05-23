import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import inspectaiPreview from "../../assets/inspectai-preview.png"
import soccerPreview from "../../assets/soccer-predictor-preview.png"
import githubPreview from "../../assets/github-preview.png"

const projects = [
  {
    title: "Inspect AI",
    description: "Inspection management web app creating transparency throughout the dorm inspection process.",
    year: "2026",
    link: "https://www.inspectai.info/",
    github: "https://github.com/JulienrBourgeois/Dorm-AI",
    stack: ["Next.js", "Firebase", "Node.js", "Vercel"],
    image: inspectaiPreview,
  },
  {
    title: "Soccer Matchup Predictor",
    description: "Web app that returns pre-match home, draw, and away probabilities for Premier League fixtures from each team's rolling form, with accuracy charts and a team map.",
    year: "2026",
    link: "https://footballpredictorweb.vercel.app",
    github: "https://github.com/brysonhen/football_predictor_web",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    image: soccerPreview,
  },
  {
    title: "More on GitHub",
    description: "The rest of my projects, experiments, and work in progress live on my GitHub.",
    year: "",
    link: "https://github.com/brysonhen",
    github: "https://github.com/brysonhen",
    stack: [],
    image: githubPreview,
  },
]

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex]   = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible]         = useState(false)
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      setSmoothPosition(prev => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [mousePosition])

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full"
    >
      {/* Floating image preview */}
      <div
        className="pointer-events-none absolute z-50 overflow-hidden rounded-md shadow-lg"
        style={{
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 110}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.85,
          transition: "opacity 0.3s cubic-bezier(0.4,0,0.2,1), scale 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="relative w-[280px] h-[180px] bg-surface rounded-md overflow-hidden">
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale:   hoveredIndex === index ? 1 : 1.1,
                filter:  hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
        </div>
      </div>

      {/* List */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            onMouseEnter={() => { setHoveredIndex(index); setIsVisible(true) }}
            onMouseLeave={() => { setHoveredIndex(null); setIsVisible(false) }}
          >
            <div className="relative py-10 border-t border-border transition-all duration-300">
              {/* Hover background */}
              <div className={`absolute inset-0 -mx-6 px-6 bg-surface/60 rounded-lg transition-all duration-300 ease-out ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} />

              <div className="relative flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-3">
                    <h3 className="text-foreground font-semibold text-3xl md:text-4xl tracking-tight">
                      <span className="relative">
                        {project.title}
                        <span className={`absolute left-0 -bottom-1 h-px bg-primary transition-all duration-300 ease-out ${hoveredIndex === index ? "w-full" : "w-0"}`} />
                      </span>
                    </h3>
                    <ArrowUpRight className={`w-6 h-6 transition-all duration-300 ease-out ${hoveredIndex === index ? "opacity-100 translate-x-0 translate-y-0 text-primary" : "opacity-0 -translate-x-2 translate-y-2 text-muted"}`} />
                  </div>

                  <p className={`text-base md:text-lg mt-3 leading-relaxed transition-colors duration-300 max-w-2xl ${hoveredIndex === index ? "text-foreground/80" : "text-muted"}`}>
                    {project.description}
                  </p>

                  {/* Stack tags */}
                  {project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.stack.map(s => (
                        <span key={s} className="text-xs font-semibold px-3 py-1 rounded-full bg-bg border border-border text-muted transition-colors duration-150 hover:border-primary hover:text-primary">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {project.year && (
                  <span className={`text-sm font-sans tabular-nums transition-colors duration-300 shrink-0 pt-2 ${hoveredIndex === index ? "text-primary" : "text-muted"}`}>
                    {project.year}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
