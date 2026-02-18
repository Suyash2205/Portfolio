import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { education } from '../data/education';

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="section education" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Education
      </motion.h2>
      <div className="edu-grid">
        {education.map((item, i) => (
          <motion.div
            key={item.school}
            className="edu-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="edu-header">
              <h3>{item.degree}</h3>
              <span className="edu-period">{item.period}</span>
            </div>
            <p className="edu-school">{item.school}</p>
            {item.extra && <p className="edu-extra">{item.extra}</p>}
            {item.score && (
              <p className="edu-score">
                <span>{item.score}</span>
              </p>
            )}
          </motion.div>
        ))}
      </div>
      <style>{`
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .edu-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 2rem;
          border-radius: 4px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .edu-card:hover {
          border-color: var(--border-bright);
          box-shadow: var(--glow);
        }
        .edu-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .edu-header h3 {
          font-size: 1.1rem;
          color: var(--accent);
          font-weight: 600;
        }
        .edu-period {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }
        .edu-school {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .edu-extra, .edu-score {
          font-size: 0.9rem;
          color: var(--text-dim);
        }
        .edu-score span {
          color: var(--accent);
          font-family: var(--font-mono);
        }
      `}</style>
    </section>
  );
}
