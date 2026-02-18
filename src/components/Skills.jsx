import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';

const categories = [
  { key: 'languages', label: 'Languages' },
  { key: 'webAndDatabases', label: 'Web & Databases' },
  { key: 'coursework', label: 'Relevant Coursework' },
  { key: 'interests', label: 'Areas of Interest' },
  { key: 'soft', label: 'Soft Skills' },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section skills" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Technical Skills
      </motion.h2>
      <div className="skills-grid">
        {categories.map(({ key, label }, i) => (
          <motion.div
            key={key}
            className="skills-category"
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <h3 className="skills-label">{label}</h3>
            <div className="skills-tags">
              {skills[key].map((skill, j) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.06 + j * 0.03 }}
                  whileHover={{ scale: 1.05, borderColor: 'var(--border-bright)' }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        .skills-category {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 1.75rem;
          border-radius: 4px;
          transition: border-color 0.2s;
        }
        .skills-category:hover {
          border-color: var(--border-bright);
        }
        .skills-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 1rem;
        }
        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skill-tag {
          font-size: 0.9rem;
          color: var(--text-muted);
          padding: 0.4rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 2px;
          transition: border-color 0.2s;
        }
      `}</style>
    </section>
  );
}
