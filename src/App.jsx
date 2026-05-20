import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/ui/sticky-scroll'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AnimatedLoadingSkeleton from './components/ui/animated-loading-skeleton'
import FlowArt, { FlowSection } from './components/ui/story-scroll'

function App() {
  const [loading, setLoading] = useState(true)

  // Hide skeleton once all assets (fonts, images) are done loading
  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoading(false)
    } else {
      const onLoad = () => setLoading(false)
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      if (bar) bar.style.height = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Loading skeleton overlay — still uses framer-motion since it's a fixed overlay,
          unaffected by the pin/transform issue. */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <AnimatedLoadingSkeleton />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRITICAL: plain <div> + CSS opacity transition. A motion.div here would
          create a transform stacking context, which breaks the position:fixed
          that GSAP's pin: true relies on, blanking the page. */}
      <div
        className="transition-opacity duration-500 ease-in-out"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <div id="grain" aria-hidden="true" />
        <div id="progress-bar" />
        <Navbar />
        <FlowArt>
          <FlowSection aria-label="Home"><Hero /></FlowSection>
          <FlowSection aria-label="About"      from="bl"><About /></FlowSection>
          <FlowSection aria-label="Projects"   from="br"><Projects /></FlowSection>
          <FlowSection aria-label="Education"  from="tl"><Education /></FlowSection>
          <FlowSection aria-label="Experience" from="tr"><Experience /></FlowSection>
          <FlowSection aria-label="Skills"     from="bl"><Skills /></FlowSection>
          <FlowSection aria-label="Contact"    from="br"><Contact /></FlowSection>
        </FlowArt>
        <Footer />
      </div>
    </>
  )
}

export default App
