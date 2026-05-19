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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
      >
        <div id="grain" aria-hidden="true" />
        <div id="progress-bar" />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Education />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default App
