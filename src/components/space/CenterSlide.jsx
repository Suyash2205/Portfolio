import { motion } from 'framer-motion';
import { useSpaceLayout } from '../../context/SpaceLayoutContext';

export default function CenterSlide() {
  const { openDetail } = useSpaceLayout();

  return (
    <section id="hero" className="center-slide" aria-label="Mission control — start here">
      <div className="hero-content">
        <motion.p
          className="hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-label-line" />
          AI & Data Science
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="hero-title-name glitch" data-text="SUYASH HUMNE">
            SUYASH HUMNE
          </span>
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Building the bridge between data & impact
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.button
            type="button"
            className="hero-btn"
            onClick={() => openDetail('about')}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            Explore
          </motion.button>
          <motion.button
            type="button"
            className="hero-btn outline"
            onClick={() => openDetail('contact')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in touch
          </motion.button>
        </motion.div>
        <p className="hero-hint">Click the orbiting stations to open details</p>
      </div>
      <style>{`
        .center-slide {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 6rem 2rem;
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          text-align: center;
          max-width: 800px;
          pointer-events: auto;
          isolation: isolate;
        }
        .hero-label {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          text-shadow: 0 0 24px rgba(0, 0, 0, 0.9);
          position: relative;
          z-index: 1;
        }
        .hero-label-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7));
        }
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .hero-title-name {
          display: inline-block;
          color: var(--accent);
          text-shadow: 0 0 60px var(--accent-glow),
                       0 2px 4px rgba(0,0,0,0.9),
                       0 0 1px rgba(0,0,0,0.95);
          position: relative;
          z-index: 1;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .glitch::before {
          animation: glitch-1 3s infinite linear alternate-reverse;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          color: rgba(255,255,255,0.8);
          transform: translate(-2px, 2px);
        }
        .glitch::after {
          animation: glitch-2 2.5s infinite linear alternate-reverse;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          color: rgba(255,255,255,0.6);
          transform: translate(2px, -2px);
        }
        @keyframes glitch-1 {
          0% { transform: translate(-2px, 2px); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(2px, -2px); }
        }
        @keyframes glitch-2 {
          0% { transform: translate(2px, -2px); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(-2px, 2px); }
        }
        .hero-sub {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.88);
          margin-bottom: 2.5rem;
          font-weight: 300;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
          position: relative;
          z-index: 1;
        }
        .hero-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-btn {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.9rem 2rem;
          border: 1px solid var(--accent);
          color: var(--accent);
          background: transparent;
          cursor: pointer;
          transition: box-shadow 0.3s;
        }
        .hero-btn.outline {
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .hero-btn.outline:hover {
          color: var(--accent);
          border-color: var(--accent);
        }
        .hero-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: var(--text-dim);
        }
      `}</style>
    </section>
  );
}
