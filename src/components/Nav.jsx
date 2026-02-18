import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className="nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          background: scrolled ? 'rgba(10, 10, 11, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="nav-inner">
          <motion.button
            className="nav-logo"
            onClick={() => scrollTo('hero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SH
          </motion.button>
          <ul className="nav-links">
            {links.map(({ id, label }) => (
              <li key={id}>
                <motion.button
                  className="nav-link"
                  onClick={() => scrollTo(id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {label}
                </motion.button>
              </li>
            ))}
          </ul>
          <motion.button
            className="nav-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
            />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.ul
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ staggerChildren: 0.05 }}
            >
              {links.map(({ id, label }) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: background 0.3s, border-color 0.3s;
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.2em;
          color: var(--accent);
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        .nav-link {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--accent);
        }
        .nav-burger {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .nav-burger span {
          width: 24px;
          height: 2px;
          background: var(--accent);
          display: block;
        }
        .nav-mobile {
          position: fixed;
          inset: 0;
          top: 60px;
          background: rgba(10, 10, 11, 0.98);
          backdrop-filter: blur(12px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-mobile ul {
          list-style: none;
          text-align: center;
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.1em;
        }
        .nav-mobile li {
          padding: 1rem;
          cursor: pointer;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .nav-mobile li:hover {
          color: var(--accent);
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>
    </>
  );
}
