'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float, AdaptiveDpr } from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} scale={1.6} position={[0, -0.6, 0]} />;
}

export default function Home() {
  const projects = [
    { title: 'Interactive 3D Web', category: 'WebGL', desc: 'Real-time 3D configurator & interactive web apps.' },
    { title: 'Architectural Renders', category: 'ArchViz', desc: 'Φωτορεαλιστικές 3D απεικονίσεις χώρων & κτιρίων.' },
    { title: 'Digital Brand Assets', category: '3D Motion', desc: 'High-end 3D visuals για digital marketing.' },
  ];

  const services = [
    { num: '01', title: '3D Web Development', desc: 'Ιστοσελίδες επόμενης γενιάς με Three.js & React Three Fiber.' },
    { num: '02', title: '3D Modeling & Rendering', desc: 'Υψηλής ανάλυσης 3D μοντελοποίηση προϊόντων & concept art.' },
    { num: '03', title: 'Interactive Configurators', desc: 'Εργαλεία προβολής προϊόντων 360° με αλλαγή υλικών σε πραγματικό χρόνο.' },
  ];

  return (
    <div className="bg-neutral-950 text-white font-sans selection:bg-indigo-500 selection:text-white">
      {/* Fixed Sticky Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-neutral-950/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="text-xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-indigo-400">
            3DORAMA
          </a>
          <nav className="flex gap-6 md:gap-8 text-sm font-medium text-neutral-300">
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-white transition-colors">Υπηρεσίες</a>
            <a href="#contact" className="hover:text-white transition-colors">Επικοινωνία</a>
          </nav>
        </div>
      </header>

      {/* SECTION 1: HERO (3D Interactive Canvas) */}
      <section id="hero" className="relative w-full h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }}>
            <AdaptiveDpr />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Environment preset="city" />
            
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Model />
              </Float>
            </Suspense>

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          </Canvas>
        </div>

        {/* Hero Overlay Text */}
        <div className="relative z-10 text-center px-4 pointer-events-none mt-40 md:mt-60">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 mb-4 drop-shadow-lg">
            IMMERSIVE 3D EXPERIENCES
          </h1>
          <p className="text-neutral-400 text-sm md:text-lg max-w-xl mx-auto mb-8">
            Ψηφιακές δημιουργίες, 3D περιηγήσεις & interactive web experiences.
          </p>
          <div className="pointer-events-auto">
            <a 
              href="#portfolio" 
              className="inline-block px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
            >
              Δείτε τα Έργα μας
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: PORTFOLIO */}
      <section id="portfolio" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500 mb-4">
            PORTFOLIO
          </h2>
          <p className="text-neutral-400 max-w-xl">
            Επιλεγμένα διαδραστικά 3D projects & high-end web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <div key={idx} className="group bg-neutral-900/40 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300">
              <div className="w-full h-48 bg-neutral-950/80 rounded-2xl mb-6 flex items-center justify-center text-neutral-600 font-mono text-xs border border-white/5">
                [ 3D Render Preview ]
              </div>
              <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">{p.category}</span>
              <h3 className="text-2xl font-bold mt-2 mb-2 text-white group-hover:text-indigo-300 transition-colors">{p.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400 mb-4">
            ΥΠΗΡΕΣΙΕΣ
          </h2>
          <p className="text-neutral-400 max-w-xl">
            High-end 3D τεχνολογίες που απογειώνουν την ψηφιακή παρουσία της επιχείρησής σου.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-neutral-900/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-neutral-900/70 hover:border-indigo-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center font-extrabold text-lg mb-6 border border-indigo-500/30">
                {s.num}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="bg-neutral-900/50 border border-white/15 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-indigo-400 mb-3">
              ΕΠΙΚΟΙΝΩΝΙΑ
            </h2>
            <p className="text-neutral-400 text-sm md:text-base">
              Έχεις κάποιο project στο μυαλό σου; Ας δημιουργήσουμε κάτι εξαιρετικό μαζί.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-neutral-400 mb-2">Όνομα</label>
                <input type="text" placeholder="Το όνομά σας" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-neutral-400 mb-2">Email</label>
                <input type="email" placeholder="name@domain.com" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-neutral-400 mb-2">Μήνυμα</label>
              <textarea rows={4} placeholder="Πείτε μας λίγα λόγια για το project..." className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-all resize-none text-sm" />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300">
              Αποστολή Μηνύματος
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} 3DORAMA. All rights reserved. Built with Next.js & Three.js
      </footer>
    </div>
  );
}

useGLTF.preload('/model.glb');
