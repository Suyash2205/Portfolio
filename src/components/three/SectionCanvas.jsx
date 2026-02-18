import { Canvas } from '@react-three/fiber';
import SectionShape from './SectionShape';

export default function SectionCanvas() {
  return (
    <div className="section-shape-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <SectionShape />
      </Canvas>
    </div>
  );
}
