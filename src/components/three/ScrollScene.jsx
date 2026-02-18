import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingOrbs({ sectionProgress }) {
  const groupRef = useRef(null);
  const count = 12;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2 + sectionProgress * 0.5;
      const r = 4 + Math.sin(i * 0.7) * 1.5;
      pos.push([
        Math.cos(theta) * r + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 4,
        Math.sin(theta) * r + (Math.random() - 0.5) * 2,
      ]);
    }
    return pos;
  }, [sectionProgress]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.12 + Math.sin(i) * 0.05}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ScrollScene({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <FloatingOrbs sectionProgress={scrollProgress} />
    </>
  );
}
