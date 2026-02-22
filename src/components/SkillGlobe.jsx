import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const BADGE_SIZE = 0.22;

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/** Skill label -> devicon folder name (icon path) */
const SKILL_ICONS = {
  'C/C++': 'cplusplus',
  'Python': 'python',
  'Java': 'java',
  'TypeScript': 'typescript',
  'Dart': 'dart',
  'SQL': 'mysql',
  'R': 'r',
  'React.js': 'react',
  'Next.js': 'nextjs',
  'Vite': 'vite',
  'Three.js': 'threejs',
  'React Three Fiber': 'threejs',
  'Framer Motion': null,
  'HTML5': 'html5',
  'CSS3': 'css3',
  'Node.js': 'nodejs',
  'Express.js': 'express',
  'MongoDB': 'mongodb',
  'MySQL': 'mysql',
  'Firebase': 'firebase',
  'Android Studio': 'android',
  'Flutter': 'flutter',
  'Git': 'git',
  'GitHub': 'github',
  'Vercel': 'vercel',
  'Figma': 'figma',
  'WordPress': 'wordpress',
  'Docker': 'docker',
};

/** Hover glow color per skill (brand color) – bright glow in that color */
const SKILL_GLOW_COLORS = {
  'C/C++': '#00599c',
  'Python': '#3776ab',
  'Java': '#ed8b00',
  'TypeScript': '#3178c6',
  'Dart': '#0175c2',
  'React.js': '#61dafb',
  'Next.js': '#ffffff',
  'Vite': '#646cff',
  'Three.js': '#ffffff',
  'React Three Fiber': '#ffffff',
  'HTML5': '#e34f26',
  'CSS3': '#1572b6',
  'Node.js': '#339933',
  'Express.js': '#000000',
  'MongoDB': '#47a248',
  'MySQL': '#4479a1',
  'Firebase': '#ffca28',
  'Android Studio': '#3ddc84',
  'Flutter': '#02569b',
  'Git': '#f05032',
  'GitHub': '#ffffff',
  'Vercel': '#ffffff',
  'Figma': '#f24e1e',
  'WordPress': '#21759b',
  'Docker': '#2496ed',
  'R': '#276dc3',
  'SQL': '#4479a1',
};
const DEFAULT_GLOW = '#a78bfa';

/** Icons that are mostly black/dark grey – render on a light circular backdrop so they’re visible */
const DARK_ICON_LABELS = new Set(['WordPress', 'GitHub', 'Next.js', 'Express.js', 'Git', 'Vercel']);

/** Shared soft circular light texture for dark-icon backdrop (no white rectangle) */
let lightCircleTextureSingleton = null;
function getLightCircleTexture() {
  if (lightCircleTextureSingleton) return lightCircleTextureSingleton;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const r = size / 2 - 2;
  const cx = size / 2, cy = size / 2;
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  gradient.addColorStop(0.8, 'rgba(248, 250, 252, 0.95)');
  gradient.addColorStop(1, 'rgba(248, 250, 252, 0)');
  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  lightCircleTextureSingleton = new THREE.CanvasTexture(canvas);
  lightCircleTextureSingleton.needsUpdate = true;
  lightCircleTextureSingleton.minFilter = THREE.LinearFilter;
  lightCircleTextureSingleton.magFilter = THREE.LinearFilter;
  return lightCircleTextureSingleton;
}

function glowColor(label) {
  return SKILL_GLOW_COLORS[label] || DEFAULT_GLOW;
}

function iconUrl(label) {
  const path = SKILL_ICONS[label];
  if (!path || path === null) return null;
  return `${DEVICON_BASE}/${path}/${path}-original.svg`;
}

/** Build nodes for the globe: use skills.globe if present, else flatten categories. */
function buildNodes(skillsData) {
  const shortMap = {
    'C/C++': 'C++',
    'Python': 'Py',
    'Java': 'Java',
    'TypeScript': 'TS',
    'Dart': 'Dart',
    'SQL': 'SQL',
    'R': 'R',
    'React.js': 'React',
    'Next.js': 'Nxt',
    'Vite': 'Vite',
    'Three.js': 'Three',
    'React Three Fiber': 'R3F',
    'Framer Motion': 'FM',
    'HTML5': 'HTML5',
    'CSS3': 'CSS3',
    'Responsive UI Design': 'RUI',
    'Node.js': 'Node',
    'Express.js': 'Express',
    'REST API Development': 'REST',
    'JWT Authentication': 'JWT',
    'MongoDB': 'Mongo',
    'MySQL': 'MySQL',
    'Firebase': 'Fire',
    'Android Studio': 'And',
    'Flutter': 'Flut',
    'XML Layouts': 'XML',
    'Git': 'Git',
    'GitHub': 'GitHub',
    'Vercel': 'Vercel',
    'Figma': 'Figma',
    'WordPress': 'WP',
    'Cursor AI': 'AI',
    'Docker': 'Docker',
  };
  const list = skillsData.globe && skillsData.globe.length > 0
    ? skillsData.globe
    : [
        ...(skillsData.languages || []),
        ...(skillsData.webAndDatabases || []),
        ...(skillsData.coursework || []),
        ...(skillsData.interests || []),
        ...(skillsData.soft || []),
      ];
  return list.map((label) => ({
    label,
    short: shortMap[label] || label.slice(0, 4),
    icon: iconUrl(label),
  }));
}

/** Even spread on unit sphere (Fibonacci lattice); returns unit-length [x,y,z] */
function spherePoints(n) {
  if (n <= 0) return [];
  if (n === 1) return [[0, 1, 0]];
  const points = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const twoPi = 2 * Math.PI;
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = (twoPi * i) / goldenRatio;
    const thetaWrapped = theta % twoPi;
    const x = Math.cos(thetaWrapped) * rAtY;
    const z = Math.sin(thetaWrapped) * rAtY;
    const len = Math.sqrt(x * x + y * y + z * z) || 1;
    points.push([x / len, y / len, z / len]);
  }
  return points;
}

const GLOBE_SURFACE_RADIUS = 1.2;

function GlobeWireframe({ opacity = 0.15 }) {
  return (
    <mesh raycast={() => null}>
      <sphereGeometry args={[1, 32, 24]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

const ICON_TEX_SIZE = 256;
/** White color-key threshold: pixels brighter than this become transparent */
const WHITE_KEY_THRESHOLD = 248;

/** Create a texture from an image URL; draws to transparent canvas and color-keys white so no white background glitches */
function useImageTexture(url) {
  const [texture, setTexture] = useState(null);
  const texRef = useRef(null);
  useEffect(() => {
    if (!url) return undefined;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (texRef.current) texRef.current.dispose();
      const size = ICON_TEX_SIZE;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        const fallback = new THREE.Texture(img);
        fallback.needsUpdate = true;
        fallback.minFilter = THREE.LinearFilter;
        fallback.magFilter = THREE.LinearFilter;
        texRef.current = fallback;
        setTexture(fallback);
        return;
      }
      ctx.clearRect(0, 0, size, size);
      const scale = Math.min(size / img.width, size / img.height) * 0.9;
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      const id = ctx.getImageData(0, 0, size, size);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        if (r >= WHITE_KEY_THRESHOLD && g >= WHITE_KEY_THRESHOLD && b >= WHITE_KEY_THRESHOLD) d[i + 3] = 0;
      }
      ctx.putImageData(id, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      texRef.current = tex;
      setTexture(tex);
    };
    img.onerror = () => {
      setTexture(null);
      texRef.current = null;
    };
    img.src = url;
    return () => {
      if (texRef.current) {
        texRef.current.dispose();
        texRef.current = null;
      }
      setTexture(null);
    };
  }, [url]);
  return texture;
}

/** Create a canvas texture with text (fallback when no icon) */
function useTextTexture(short) {
  const tex = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = 'rgba(17, 17, 19, 0.92)';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#e8e8ec';
    ctx.font = 'bold 36px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(short, size / 2, size / 2);
    const t = new THREE.CanvasTexture(canvas);
    t.needsUpdate = true;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    return t;
  }, [short]);
  useEffect(() => () => tex?.dispose(), [tex]);
  return tex;
}

/** Hex to r,g,b (0-255) */
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Radial glow texture: strong center → transparent edge (256x256). Disposes on cleanup. */
function useGlowTexture(colorHex) {
  const texRef = useRef(null);
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const [r, g, b] = hexToRgb(colorHex || '#a78bfa');
    const cx = size / 2;
    const cy = size / 2;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
    gradient.addColorStop(0, `rgba(${r},${g},${b},0.95)`);
    gradient.addColorStop(0.4, `rgba(${r},${g},${b},0.4)`);
    gradient.addColorStop(0.7, `rgba(${r},${g},${b},0.08)`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [colorHex]);
  useEffect(() => {
    return () => texture?.dispose();
  }, [texture]);
  return texture;
}

function OrbitNode({ label, short, icon }) {
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  const glowRingRef = useRef(null);
  const glowAuraRef = useRef(null);
  const darkIconBgRef = useRef(null);
  const [hover, setHover] = useState(false);
  const depthRef = useRef(1);
  const hoverT = useRef(0);
  const imageTexture = useImageTexture(icon || null);
  const textTexture = useTextTexture(short);
  const texture = (icon && imageTexture) ? imageTexture : textTexture;
  const glow = glowColor(label);
  const glowTex = useGlowTexture(glow);
  const needsLightBackdrop = DARK_ICON_LABELS.has(label);

  /** Front = node on camera-facing hemisphere: dot (outward, camDir) < 0 => depth < 0.5 */
  const FRONT_DEPTH_MAX = 0.5;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    const camDir = state.camera.getWorldDirection(new THREE.Vector3());
    const dot = worldPos.clone().normalize().dot(camDir);
    const depth = (dot + 1) / 2;
    depthRef.current = depth;
    const isFront = depth < FRONT_DEPTH_MAX;
    if (!isFront && hover) setHover(false);
    if (meshRef.current) {
      meshRef.current.raycast = isFront ? THREE.Mesh.prototype.raycast : function () {};
    }
    hoverT.current = THREE.MathUtils.damp(hoverT.current, hover ? 1 : 0, 12, delta);
    const t = hoverT.current;
    const camPos = state.camera.position;
    const scale = 0.5 + depth * 0.5;
    const baseS = BADGE_SIZE * scale;
    const iconScale = baseS * (1 + t * 0.45);
    const auraScale = baseS * (1 + t * 0.6);
    const ringScale = baseS * (1 + t * 0.25);
    const iconOpacity = 0.5 + depth * 0.5;

    if (meshRef.current) {
      meshRef.current.lookAt(camPos);
      meshRef.current.scale.setScalar(iconScale);
      if (meshRef.current.material) {
        const opacity = needsLightBackdrop ? Math.min(1, iconOpacity * 1.15) : iconOpacity;
        meshRef.current.material.opacity = opacity;
      }
    }
    if (glowAuraRef.current) {
      glowAuraRef.current.lookAt(camPos);
      glowAuraRef.current.scale.set(auraScale, auraScale, 1);
      if (glowAuraRef.current.material) glowAuraRef.current.material.opacity = t * 0.85;
    }
    if (glowRingRef.current) {
      glowRingRef.current.lookAt(camPos);
      glowRingRef.current.scale.set(ringScale, ringScale, 1);
      if (glowRingRef.current.material) glowRingRef.current.material.opacity = t * 0.55;
    }
    if (darkIconBgRef.current) {
      darkIconBgRef.current.lookAt(camPos);
      darkIconBgRef.current.scale.setScalar(iconScale * 1.18);
    }
  });

  if (!texture) return null;

  const baseS = BADGE_SIZE * depthRef.current * 0.5 + BADGE_SIZE * 0.5;
  return (
    <group ref={groupRef}>
      <mesh ref={glowAuraRef} scale={[baseS, baseS, 1]} renderOrder={-2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glowTex}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
          side={THREE.FrontSide}
        />
      </mesh>
      <mesh ref={glowRingRef} scale={[baseS, baseS, 1]} renderOrder={-1}>
        <ringGeometry args={[0.42, 0.52, 48]} />
        <meshBasicMaterial
          color={glow}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
          side={THREE.FrontSide}
        />
      </mesh>
      {hover && (
        <Html
          position={[0, -0.48, 0]}
          center
          distanceFactor={2.2}
          className="skill-globe-tooltip"
        >
          {label}
        </Html>
      )}
      {needsLightBackdrop && (
        <mesh ref={darkIconBgRef} position={[0, 0, -0.02]} scale={[baseS * 1.18, baseS * 1.18, 1]} renderOrder={-3}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={getLightCircleTexture()}
            transparent
            opacity={1}
            alphaTest={0.02}
            side={THREE.FrontSide}
            depthWrite={false}
            depthTest={true}
          />
        </mesh>
      )}
      <mesh
        ref={meshRef}
        scale={[baseS, baseS, 1]}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.5}
          alphaTest={0.05}
          side={THREE.FrontSide}
          depthWrite={true}
          depthTest={true}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export default function SkillGlobe({ nodes: nodesProp, reduceMotion = false, scale: scaleProp = 1 }) {
  const groupRef = useRef(null);
  const autoRotate = useRef(0);

  const nodes = useMemo(() => (nodesProp && nodesProp.length > 0 ? nodesProp : buildNodes({ languages: ['JS'], webAndDatabases: [], coursework: [], interests: [], soft: [] })), [nodesProp]);
  const positions = useMemo(() => spherePoints(nodes.length), [nodes.length]);

  useFrame((state, delta) => {
    if (!groupRef.current || reduceMotion) return;
    autoRotate.current += delta * 0.08;
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x = Math.sin(autoRotate.current) * 0.04;
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={1}
        target={[0, 0, 0]}
      />
      <group ref={groupRef} scale={scaleProp}>
      <group scale={GLOBE_SURFACE_RADIUS}>
        <GlobeWireframe opacity={0.12} />
        <mesh scale={1.02} raycast={() => null}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.04} depthWrite={false} />
        </mesh>
      </group>
      {nodes.map((node, i) => {
        const [x, y, z] = positions[i];
        return (
          <group
            key={`${node.label}-${i}`}
            position={[x * GLOBE_SURFACE_RADIUS, y * GLOBE_SURFACE_RADIUS, z * GLOBE_SURFACE_RADIUS]}
          >
            <OrbitNode label={node.label} short={node.short} icon={node.icon} />
          </group>
        );
      })}
    </group>
    </>
  );
}

export { buildNodes };
