import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function SectionShape() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
    </mesh>
  );
}
