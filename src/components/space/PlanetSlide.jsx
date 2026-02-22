import { motion } from 'framer-motion';

export default function PlanetSlide({ section, onClick }) {
  const { label, description, color } = section;

  return (
    <motion.div
      className="planet-slide"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      role="button"
      tabIndex={0}
    >
      <div className="planet-orb" style={{ '--planet-color': color }}>
        <div className="planet-ring" />
      </div>
      <h2 className="planet-title">{label}</h2>
      <p className="planet-desc">{description}</p>
      <span className="planet-cta">View details →</span>
      <style>{`
        .planet-slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          cursor: pointer;
          scroll-snap-align: start;
          position: relative;
        }
        .planet-slide:focus-visible {
          outline: 2px solid var(--accent-cyan);
          outline-offset: 4px;
        }
        .planet-orb {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), var(--planet-color));
          box-shadow: 0 0 60px color-mix(in srgb, var(--planet-color) 50%, transparent),
                      inset -20px -20px 40px rgba(0,0,0,0.3);
          margin-bottom: 2rem;
          position: relative;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .planet-slide:hover .planet-orb {
          transform: scale(1.08);
          box-shadow: 0 0 80px color-mix(in srgb, var(--planet-color) 60%, transparent),
                      inset -20px -20px 40px rgba(0,0,0,0.3);
        }
        .planet-ring {
          position: absolute;
          inset: -12px;
          border: 1px solid color-mix(in srgb, var(--planet-color) 60%, transparent);
          border-radius: 50%;
          opacity: 0.7;
        }
        .planet-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }
        .planet-desc {
          font-size: 1rem;
          color: var(--text-muted);
          max-width: 320px;
          text-align: center;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .planet-cta {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-cyan);
          opacity: 0.9;
        }
        .planet-slide:hover .planet-cta {
          opacity: 1;
          text-shadow: 0 0 20px var(--accent-cyan);
        }
      `}</style>
    </motion.div>
  );
}
