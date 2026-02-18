import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section projects" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="project-number">0{i + 1}</div>
            <h3>{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-desc">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 2rem;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .project-card:hover {
          border-color: var(--border-bright);
          box-shadow: var(--glow);
        }
        .project-card:hover::before {
          opacity: 1;
        }
        .project-number {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: var(--text-dim);
          margin-bottom: 0.75rem;
        }
        .project-card h3 {
          font-size: 1.2rem;
          color: var(--accent);
          margin-bottom: 0.25rem;
        }
        .project-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .project-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .project-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          padding: 0.35rem 0.65rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-dim);
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}
