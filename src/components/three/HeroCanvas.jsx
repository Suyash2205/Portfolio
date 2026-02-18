import { Canvas } from '@react-three/fiber';
import HeroScene from './HeroScene';

export default function HeroCanvas() {
  return (
    <div className="hero-three-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <HeroScene />
      </Canvas>
    </div>
  );
}
