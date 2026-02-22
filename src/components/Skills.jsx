import { motion } from 'framer-motion';
import { skills } from '../data/skills';

const CATEGORIES = [
  { key: 'languages', label: 'LANGUAGES', items: skills.languages },
  { key: 'webAndDatabases', label: 'WEB & DATABASES', items: skills.webAndDatabases },
  { key: 'coursework', label: 'RELEVANT COURSEWORK', items: skills.coursework || [] },
  { key: 'interests', label: 'AREAS OF INTEREST', items: skills.interests || [] },
  { key: 'soft', label: 'SOFT SKILLS', items: skills.soft || [] },
];

export default function Skills() {
  return (
    <section id="skills" className="section skills skills-categories" data-reactor-section="skills">
      <div className="skills-globe-bg" aria-hidden="true" />

      <motion.h2
        className="skills-technical-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        TECHNICAL SKILLS
      </motion.h2>

      <motion.div
        className="skills-categories-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {CATEGORIES.map(({ key, label, items }) => (
          <div key={key} className="skills-category-box">
            <h3 className="skills-category-title">{label}</h3>
            <div className="skills-category-pills">
              {items.map((name) => (
                <span key={name} className="skill-pill">
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
