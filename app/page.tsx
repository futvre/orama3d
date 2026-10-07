'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// 3D Αντικείμενο που περιστρέφεται & αντιδρά στο ποντίκι
function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Συνεχής περιστροφή
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;

      // Ελαφριά αλληλεπίδραση με την κίνηση του ποντικιού
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        state.pointer.x * 1.2,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        state.pointer.y * 1.2,
        0.05
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.15 : 1}
    >
      {/* 3D Γεωμετρία (Torus Knot) */}
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial
        color={hovered ? '#6366f1' : '#3b82f6'}
        roughness={0.15}
        metalness={0.85}
      />
    </mesh>
  );
}

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-neutral-950 text-white overflow-hidden font-sans">
      {/* 1. Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full z-10 flex justify-between items-center p-8 border-b border-white/10 backdrop-blur-sm">
        <div className="text-xl font-bold tracking-widest">3DORAMA</div>
        <div className="flex gap-6 text-sm text-neutral-400 font-medium">
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#services" className="hover:text-white transition-colors">Υπηρεσίες</a>
          <a href="#contact" className="hover:text-white transition-colors">Επικοινωνία</a>
        </div>
      </nav>

      {/* 2. 3D Canvas Background/Hero */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#818cf8" />
          <FloatingShape />
        </Canvas>
      </div>

      {/* 3. Hero Text Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 mb-4">
          IMMERSIVE 3D EXPERIENCES
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-xl mb-8">
          Ψηφιακές δημιουργίες, 3D περιηγήσεις & interactive web experiences.
        </p>
        <div className="pointer-events-auto">
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-lg">
            Δείτε τα έργα μας
          </button>
        </div>
      </div>
    </main>
  );
}
