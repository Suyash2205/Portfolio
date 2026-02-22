import { useSpaceLayout } from '../../context/SpaceLayoutContext';
import CenterSlide from './CenterSlide';
import PlanetSlide from './PlanetSlide';

export default function HorizontalSpace() {
  const { scrollRef, sections, openDetail } = useSpaceLayout();

  return (
    <div
      ref={scrollRef}
      className="horizontal-space"
      role="region"
      aria-label="Space research center — scroll horizontally to explore"
    >
      <CenterSlide />
      {sections.map((section) => (
        <PlanetSlide
          key={section.id}
          section={section}
          onClick={() => openDetail(section.id)}
        />
      ))}
      <style>{`
        .horizontal-space {
          display: flex;
          flex-direction: row;
          width: 100%;
          min-height: 100vh;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .horizontal-space::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
