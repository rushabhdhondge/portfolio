import React from 'react'
import Navbar from './components/Navbar'
import HomeSection from './components/Home'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Project'
import Contact from './components/Contact'
import Footer from './components/footer'
const App = () => {
  return (
    <div>
      <Navbar />
      <HomeSection />
      <About />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
