import { Suspense, lazy } from 'react';
import { useSpaceLayout } from '../../context/SpaceLayoutContext';
import CenterSlide from './CenterSlide';
import PlanetOrb from './PlanetOrb';

const HeroCanvas = lazy(() => import('../three/HeroCanvas'));

// Inner orbit: about, experience, education. Outer: projects, skills, contact.
const INNER_SECTIONS = ['about', 'experience', 'education'];
const OUTER_SECTIONS = ['projects', 'skills', 'contact'];
const INNER_ANGLES = [0, 120, 240];
const OUTER_ANGLES = [60, 180, 300];

export default function OrbitalScene() {
  const { sections, openDetail } = useSpaceLayout();
  const byId = Object.fromEntries(sections.map((s) => [s.id, s]));

  return (
    <div className="orbital-scene" role="presentation">
      {/* 1. Wireframe at the very back — no pointer events */}
      <div className="orbital-layer wireframe-layer" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* 2. Orbits and planets — on top so they're clickable/hoverable */}
      <div className="orbit orbit-inner" aria-hidden="true">
        {INNER_SECTIONS.map((id, i) => (
          byId[id] && (
            <PlanetOrb
              key={id}
              section={byId[id]}
              angle={INNER_ANGLES[i]}
              onClick={() => openDetail(id)}
            />
          )
        ))}
      </div>
      <div className="orbit orbit-outer" aria-hidden="true">
        {OUTER_SECTIONS.map((id, i) => (
          byId[id] && (
            <PlanetOrb
              key={id}
              section={byId[id]}
              angle={OUTER_ANGLES[i]}
              onClick={() => openDetail(id)}
            />
          )
        ))}
      </div>

      {/* 3. Center content (text + buttons) — on top, only blocks its own area */}
      <div className="orbital-center">
        <CenterSlide />
      </div>

      <style>{`
        .orbital-scene {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          --orbit-r: 160px;
          width: calc(2 * var(--orbit-r));
          height: calc(2 * var(--orbit-r));
          margin-left: calc(-1 * var(--orbit-r));
          margin-top: calc(-1 * var(--orbit-r));
        }
        .orbital-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .wireframe-layer .hero-three-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .wireframe-layer canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
        .orbit-inner {
          --orbit-r: min(160px, 22vmin);
          animation: orbit-spin 26s linear infinite;
          z-index: 1;
        }
        .orbit-outer {
          --orbit-r: min(280px, 38vmin);
          margin-left: calc(-1 * var(--orbit-r));
          margin-top: calc(-1 * var(--orbit-r));
          animation: orbit-spin 38s linear infinite reverse;
          z-index: 1;
        }
        .planet-orb-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -22px;
          margin-top: -22px;
          transform: rotate(var(--angle)) translateY(calc(-1 * var(--orbit-r)));
        }
        .orbital-center {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
