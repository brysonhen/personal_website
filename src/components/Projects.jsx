import { SectionHeading } from './About'
import { ProjectShowcase } from './ui/project-showcase'

export default function Projects() {
  return (
    <section id="projects" className="px-10 md:px-16 pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading top="PROJECTS" ghost="Recent work" align="left" />
        </div>
        <ProjectShowcase />
      </div>
    </section>
  )
}
