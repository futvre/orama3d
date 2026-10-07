'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float, AdaptiveDpr } from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} scale={1.4} position={[0, -0.2, 0]} />;
}

export default function Home() {
  const projects = [
    { title: 'Βιομηχανικά Πρωτότυπα', category: '3D Print & Engineering', desc: 'Εκτύπωση λειτουργικών εξαρτημάτων υψηλής αντοχής με FDM & Resin.' },
    { title: 'Αρχιτεκτονικές Μακέτες', category: '3D Scale Modeling', desc: 'Λεπτομερείς μακέτες κτιρίων και εσωτερικών χώρων με απόλυτη ακρίβεια.' },
    { title: 'Custom Props & Figures', category: 'Art & Custom Print', desc: 'Εξειδικευμένες δημιουργίες, φιγούρες και props με χειροποίητο φινίρισμα.' },
  ];

  const services = [
    { 
      num: '01', 
      title: '3D Εκτυπώσεις Υψηλής Ακρίβειας', 
      desc: 'Παραγωγή αντικειμένων σε FDM & SLA/Resin με κορυφαία ανάλυση λεπτομέρειας και ποικιλία υλικών (PLA, PETG, ABS, Resin).' 
    },
    { 
      num: '02', 
      title: '3D Σχεδιασμός & CAD Modeling', 
      desc: 'Μετατροπή των ιδεών, σχεδίων ή χαλασμένων εξαρτημάτων σου σε έτοιμα, ψηφιακά τρισδιάστατα μοντέλα προς εκτύπωση.' 
    },
    { 
      num: '03', 
      title: 'Μετα-επεξεργασία & Φινίρισμα', 
      desc: 'Λείανση, αστάρωμα, βαφή και τελικό μοντάρισμα για αποτελέσματα που μοιάζουν με βιομηχανικό τελικό προϊόν.' 
    },
  ];

  return (
    <div className="bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 to-purple-600/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[2200px] left-0 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
            3DORAMA
          </a>
          <nav className="flex gap-6 md:gap-8 text-sm font-semibold text-slate-300">
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Υπηρεσίες</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Επικοινωνία</a>
          </nav>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section id="hero" className="relative w-full h-screen flex flex-col justify-start items-center pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }}>
            <AdaptiveDpr />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Environment preset="city" />
            
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
                <Model />
              </Float>
            </Suspense>

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.8} />
          </Canvas>
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 text-center px-4 pointer-events-none mt-2 md:mt-4 max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-3 text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 rounded-full backdrop-blur-md">
            PREMIUM 3D PRINTING SERVICES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            ΑΠΟ ΤΗΝ ΙΔΕΑ ΣΤΗΝ <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">ΠΡΑΓΜΑΤΙΚΟΤΗΤΑ</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-6 font-normal drop-shadow-md">
            Επαγγελματικές υπηρεσίες 3D εκτύπωσης, μοντελοποίησης & πρωτοτυποποίησης υψηλής ακρίβειας.
          </p>
          <div className="pointer-events-auto">
            <a 
              href="#contact" 
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              Ζητήστε Προσφορά
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: PORTFOLIO */}
      <section id="portfolio" className="relative z-10 max-w-7xl mx-auto px-6 py-28 border-t border-slate-800/60">
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">Δειγματα Εργασιων</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1 mb-4">
            PORTFOLIO ΕΚΤΥΠΩΣΕΩΝ
          </h2>
          <p className="text-slate-400 max-w-xl text-base">
            Εξερευνήστε μερικά από τα πρόσφατα projects 3D εκτύπωσης και κατασκευών μας.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <div key={idx} className="group bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all duration-300">
              <div className="w-full h-52 bg-slate-950/90 rounded-2xl mb-6 flex items-center justify-center text-slate-500 font-mono text-xs border border-slate-800/80 group-hover:border-cyan-500/30 transition-colors">
                [ 3D Print Photo Preview ]
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">{p.category}</span>
              <h3 className="text-2xl font-bold mt-2 mb-2 text-white group-hover:text-cyan-300 transition-colors">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-28 border-t border-slate-800/60">
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">Τι Προσφερουμε</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1 mb-4">
            ΥΠΗΡΕΣΙΕΣ 3D ΕΚΤΥΠΩΣΗΣ
          </h2>
          <p className="text-slate-400 max-w-xl text-base">
            Ολοκληρωμένες λύσεις από τη σχεδίαση έως την τελική εκτύπωση και φινίρισμα.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 hover:bg-slate-900/90 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)] transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-2xl flex items-center justify-center font-black text-xl mb-6 border border-cyan-500/30">
                {s.num}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto px-6 py-28 border-t border-slate-800/60">
        <div className="bg-slate-900/80 border border-slate-800/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
              ΖΗΤΗΣΤΕ <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">ΠΡΟΣΦΟΡΑ</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Στείλτε μας το 3D αρχείο σας ή περιγράψτε μας την ιδέα σας για άμεση εκτίμηση κόστους.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">Όνομα</label>
                <input type="text" placeholder="Το όνομά σας" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">Email</label>
                <input type="email" placeholder="name@domain.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 transition-all text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">Περιγραφή / Απαιτήσεις Project</label>
              <textarea rows={4} placeholder="Περιγράψτε διαστάσεις, υλικό (αν γνωρίζετε) ή λεπτομέρειες..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 transition-all resize-none text-sm" />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold rounded-xl hover:opacity-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300">
              Αποστολή Αιτήματος
            </button>
          </form>
        </div>
      </section>

      {/* RICH FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <a href="#hero" className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              3DORAMA
            </a>
            <p className="text-slate-400 text-sm mt-4 max-w-sm leading-relaxed">
              Επαγγελματικές υπηρεσίες 3D εκτύπωσης & πρωτοτυποποίησης. Δίνουμε φυσική υπόσταση στις ψηφιακές σας δημιουργίες με ακρίβεια και ποιότητα.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Πλοηγηση</h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Αρχική</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Υπηρεσίες Εκτύπωσης</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Επικοινωνία</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Επικοινωνια</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">📍 Θεσσαλονίκη, Ελλάδα</li>
              <li className="flex items-center gap-2">📧 info@3dorama.gr</li>
              <li className="flex items-center gap-2">📞 +30 2310 000000</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} 3DORAMA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-slate-300 transition-colors">Επιστροφή στην κορυφή ↑</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

useGLTF.preload('/model.glb');
