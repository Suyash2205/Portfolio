import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section about" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        About
      </motion.h2>
      <motion.div
        className="about-card"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a <strong>third-year undergraduate</strong> at KJ Somaiya College of Engineering, 
              studying <strong>Artificial Intelligence and Data Science</strong>. I actively explore 
              technological applications and am committed to continuously learning new programming 
              languages.
            </p>
            <p>
              My strengths include building <strong>professional relationships</strong> and a strong 
              interest in <strong>networking</strong>. I'm dedicated to leveraging my skills to 
              address real-world challenges and contribute to innovative solutions.
            </p>
          </div>
          <motion.div
            className="about-stats"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="stat">
              <span className="stat-value">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-value">9.5</span>
              <span className="stat-label">SGPA</span>
            </div>
            <div className="stat">
              <span className="stat-value">KJSCE</span>
              <span className="stat-label">B.Tech AI & DS</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <style>{`
        .about-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 2.5rem;
          box-shadow: var(--glow);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: start;
        }
        .about-text {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.8;
        }
        .about-text p + p { margin-top: 1rem; }
        .about-text strong { color: var(--text); }
        .about-stats {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-left: 2rem;
          border-left: 1px solid var(--border);
        }
        .stat {
          display: flex;
          flex-direction: column;
        }
        .stat-value {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.05em;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-top: 0.25rem;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-stats {
            flex-direction: row;
            flex-wrap: wrap;
            padding-left: 0;
            border-left: none;
            border-top: 1px solid var(--border);
            padding-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
