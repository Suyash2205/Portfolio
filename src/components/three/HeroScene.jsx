import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function TorusKnotMesh() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function RingMesh() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.PI / 2 + state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusGeometry args={[2.5, 0.08, 16, 100]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.2} wireframe />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <TorusKnotMesh />
      <RingMesh />
    </>
  );
}
