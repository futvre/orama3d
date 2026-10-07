'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  // Φορτώνει το αρχείο που ανέβασες στο public/model.glb
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-neutral-950 overflow-hidden">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Model />
          </Float>
        </Suspense>

        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10">
        <div className="text-xl font-bold tracking-widest text-white">3DORAMA</div>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-2">
            FRESH START
          </h1>
          <p className="text-neutral-400 text-sm md:text-base">
            Σύρε το ποντίκι για να περιστρέψεις το 3D μοντέλο
          </p>
        </div>
        <div className="text-xs text-neutral-500 text-center">
          Powered by Next.js & React Three Fiber
        </div>
      </div>
    </main>
  );
}

// Προ-φόρτωση του 3D μοντέλου για ταχύτητα
useGLTF.preload('/model.glb');
