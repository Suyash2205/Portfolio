import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function PlanetOrb({ section, angle, onClick }) {
  const [hover, setHover] = useState(false);
  const { label, color } = section;

  return (
    <motion.div
      className="planet-orb-wrap"
      style={{ '--angle': `${angle}deg`, '--planet-color': color }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="button"
      tabIndex={0}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="planet-orb" />
      <AnimatePresence>
        {hover && (
          <motion.span
            className="planet-orb-label"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <style>{`
        .planet-orb-wrap {
          cursor: pointer;
          z-index: 2;
        }
        .planet-orb-wrap:focus-visible {
          outline: 2px solid var(--accent-cyan);
          outline-offset: 4px;
          border-radius: 50%;
        }
        .planet-orb {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 44px;
          height: 44px;
          margin-left: -22px;
          margin-top: -22px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), var(--planet-color));
          box-shadow: 0 0 24px color-mix(in srgb, var(--planet-color) 55%, transparent),
                      inset -6px -6px 12px rgba(0,0,0,0.35);
          transition: box-shadow 0.3s ease;
        }
        .planet-orb-wrap:hover .planet-orb {
          box-shadow: 0 0 36px color-mix(in srgb, var(--planet-color) 70%, transparent),
                      inset -6px -6px 12px rgba(0,0,0,0.35);
        }
        .planet-orb-label {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          margin-top: -36px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          text-shadow: 0 0 12px rgba(0,0,0,0.8);
          pointer-events: none;
        }
      `}</style>
    </motion.div>
  );
}
