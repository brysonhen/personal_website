import { SectionHeading } from './About'
import { ProjectShowcase } from './ui/project-showcase'

export default function Projects() {
  return (
    <section id="projects" className="px-10 md:px-16 py-20">
      <div className="max-w-2xl mx-auto px-2">
        <SectionHeading top="RECENT" ghost="PROJECTS" align="right" />
      </div>
      <ProjectShowcase />
    </section>
  )
}
