import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section experience" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>
      <div className="timeline">
        {experience.map((item, i) => (
          <motion.div
            key={item.company + item.role}
            className="timeline-item"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{item.role}</h3>
                <span className="timeline-period">{item.period}</span>
              </div>
              <p className="timeline-company">{item.company}</p>
              <ul>
                {item.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .timeline {
          position: relative;
          padding-left: 2rem;
          border-left: 1px solid var(--border);
          margin-left: 0.5rem;
        }
        .timeline-item {
          position: relative;
          padding-bottom: 2.5rem;
        }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-dot {
          position: absolute;
          left: -2rem;
          top: 0.4rem;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          border: 2px solid var(--accent);
          border-radius: 50%;
          background: var(--bg-deep);
          box-shadow: 0 0 20px var(--accent-glow);
        }
        .timeline-content {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 1.5rem 2rem;
          border-radius: 4px;
          margin-left: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .timeline-content:hover {
          border-color: var(--border-bright);
          box-shadow: var(--glow);
        }
        .timeline-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .timeline-header h3 {
          font-size: 1.1rem;
          color: var(--accent);
          font-weight: 600;
        }
        .timeline-period {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }
        .timeline-company {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }
        .timeline-content ul {
          list-style: none;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
        }
        .timeline-content li {
          position: relative;
          padding-left: 1rem;
        }
        .timeline-content li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--text-dim);
        }
      `}</style>
    </section>
  );
}
