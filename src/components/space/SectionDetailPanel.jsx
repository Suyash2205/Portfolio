import { motion, AnimatePresence } from 'framer-motion';
import { useSpaceLayout } from '../../context/SpaceLayoutContext';
import About from '../About';
import Experience from '../Experience';
import Education from '../Education';
import Projects from '../Projects';
import Skills from '../Skills';
import Contact from '../Contact';

const SECTION_COMPONENTS = {
  about: About,
  experience: Experience,
  education: Education,
  projects: Projects,
  skills: Skills,
  contact: Contact,
};

export default function SectionDetailPanel() {
  const { activeDetailId, closeDetail, sections } = useSpaceLayout();
  const section = sections.find((s) => s.id === activeDetailId);
  const Component = activeDetailId ? SECTION_COMPONENTS[activeDetailId] : null;

  return (
    <AnimatePresence>
      {activeDetailId && Component && (
        <motion.div
          className="detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeDetail}
        >
          <motion.div
            className="detail-panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-panel-header">
              <h2 className="detail-panel-title">{section?.label}</h2>
              <button
                type="button"
                className="detail-panel-close"
                onClick={closeDetail}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="detail-panel-body">
              <Component />
            </div>
          </motion.div>
          <style>{`
            .detail-overlay {
              position: fixed;
              inset: 0;
              z-index: 1000;
              background: rgba(0, 0, 0, 0.75);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2rem;
              overflow: auto;
            }
            .detail-panel {
              background: var(--bg-card);
              border: 1px solid var(--border);
              border-radius: 8px;
              max-width: 900px;
              width: 100%;
              max-height: 90vh;
              display: flex;
              flex-direction: column;
              box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
            }
            .detail-panel-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 1.25rem 1.5rem;
              border-bottom: 1px solid var(--border);
              flex-shrink: 0;
            }
            .detail-panel-title {
              font-family: var(--font-display);
              font-size: 1.25rem;
              letter-spacing: 0.15em;
              text-transform: uppercase;
              color: var(--accent);
              margin: 0;
            }
            .detail-panel-close {
              width: 40px;
              height: 40px;
              border: none;
              background: transparent;
              color: var(--text-muted);
              font-size: 1.75rem;
              line-height: 1;
              cursor: pointer;
              border-radius: 4px;
              transition: color 0.2s, background 0.2s;
            }
            .detail-panel-close:hover {
              color: var(--accent);
              background: rgba(255, 255, 255, 0.06);
            }
            .detail-panel-body {
              overflow-y: auto;
              padding: 0;
            }
            .detail-panel-body section {
              min-height: auto;
              padding: 2rem 2.5rem 3rem;
              margin: 0;
              max-width: none;
            }
            .detail-panel-body .section {
              border: none;
            }
            .detail-panel-body .section > h2 {
              display: none;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
