import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Chatbot from './components/Chatbot';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  // Always open at top on load/reload (override hash scroll and scroll restoration)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const t = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="app">
      <ParticleBackground />
      <Nav />
      <main>
        <Hero />
        <Chatbot />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
