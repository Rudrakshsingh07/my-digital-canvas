import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

// Procedural floating orbs with luminous materials
const FloatingOrb = ({ 
  position, 
  scale = 1, 
  color, 
  speed = 1,
  floatIntensity = 1 
}: { 
  position: [number, number, number]; 
  scale?: number; 
  color: string;
  speed?: number;
  floatIntensity?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.3 * floatIntensity;
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
};

// Glass sphere with transmission
const GlassSphere = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.5}
        chromaticAberration={0.06}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.1}
        roughness={0.05}
        color="#f0e6d3"
      />
    </mesh>
  );
};

// Particle field - instanced for performance
const ParticleField = ({ count = 80 }: { count?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 8 - 2,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.5,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.3,
        p.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c17f59" transparent opacity={0.5} />
    </instancedMesh>
  );
};

// Wireframe ring structure
const OrbitalRing = ({ 
  radius = 3, 
  speed = 0.3,
  tilt = 0
}: { 
  radius?: number; 
  speed?: number;
  tilt?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 100]} />
      <meshBasicMaterial color="#c17f59" transparent opacity={0.3} />
    </mesh>
  );
};

// Responsive camera
const CameraController = () => {
  const { viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Subtle breathing camera movement
    state.camera.position.x = Math.sin(t * 0.1) * 0.3;
    state.camera.position.y = Math.cos(t * 0.08) * 0.15;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

const SceneContents = () => {
  return (
    <>
      <CameraController />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#f5e6d3" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#c17f59" />
      <pointLight position={[3, -1, 1]} intensity={0.3} color="#4a6fa5" />

      {/* Main glass sphere - hero focal point */}
      <GlassSphere position={[2.2, 0.3, -1]} scale={1.4} />

      {/* Floating orbs - asymmetric placement */}
      <FloatingOrb position={[-3.5, 1.5, -2]} scale={0.5} color="#c17f59" speed={0.6} floatIntensity={1.2} />
      <FloatingOrb position={[4, -1.2, -3]} scale={0.35} color="#4a6fa5" speed={0.8} />
      <FloatingOrb position={[-1.5, -2, -1.5]} scale={0.25} color="#8faa80" speed={1} floatIntensity={0.8} />
      <FloatingOrb position={[1, 2.5, -4]} scale={0.6} color="#d4a853" speed={0.4} floatIntensity={1.5} />
      <FloatingOrb position={[-4.5, -0.5, -3.5]} scale={0.4} color="#c97c5d" speed={0.5} />

      {/* Orbital rings */}
      <OrbitalRing radius={3.5} speed={0.15} tilt={Math.PI * 0.15} />
      <OrbitalRing radius={5} speed={-0.08} tilt={Math.PI * 0.35} />

      {/* Particle field */}
      <ParticleField count={60} />
    </>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <SceneContents />
      </Canvas>
    </div>
  );
};

export default HeroScene;
