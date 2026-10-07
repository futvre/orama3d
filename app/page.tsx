'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float, AdaptiveDpr } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} scale={1.4} position={[0, -0.2, 0]} />;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">
      
      {/* SOFT LIGHT AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-200/50 via-blue-200/30 to-purple-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[900px] -left-20 w-[600px] h-[600px] bg-cyan-100/60 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[1800px] -right-20 w-[600px] h-[600px] bg-purple-100/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* FIXED DARK HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
            orama3D
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-200">
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Υπηρεσίες</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Επικοινωνία</a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-200 hover:text-cyan-400 focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-slate-950/95 border-b border-slate-800 text-white backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
            <a 
              href="#portfolio" 
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 font-bold text-lg py-2 border-b border-slate-800 transition-colors"
            >
              Portfolio
            </a>
            <a 
              href="#services" 
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 font-bold text-lg py-2 border-b border-slate-800 transition-colors"
            >
              Υπηρεσίες
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 font-bold text-lg py-2 transition-colors"
            >
              Επικοινωνία
            </a>
          </nav>
        )}
      </header>

      {/* SECTION 1: HERO (LIGHT BACKGROUND) */}
      <section id="hero" className="relative w-full h-screen flex flex-col justify-start items-center pt-28 pb-12 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100">
        <div className="absolute inset-0 z-0">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }}>
            <AdaptiveDpr />
            <ambientLight intensity={1.5} />
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
          <span className="inline-block px-4 py-1.5 mb-3 text-xs font-mono font-bold tracking-widest text-cyan-700 bg-cyan-100/80 border border-cyan-300 rounded-full backdrop-blur-md shadow-sm">
            PREMIUM 3D PRINTING SERVICES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-3 drop-shadow-sm">
            ΑΠΟ ΤΗΝ ΙΔΕΑ ΣΤΗΝ <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">ΠΡΑΓΜΑΤΙΚΟΤΗΤΑ</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto mb-6 font-medium">
            Επαγγελματικές υπηρεσίες 3D εκτύπωσης, μοντελοποίησης & πρωτοτυποποίησης υψηλής ακρίβειας.
          </p>
          <div className="pointer-events-auto">
            <a 
              href="#contact" 
              className="inline-block px-8 py-3.5 bg-slate-900 text-white font-bold rounded-full hover:bg-cyan-600 hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm md:text-base shadow-lg"
            >
              Ζητήστε Προσφορά
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: PORTFOLIO (LIGHT STUDIO) */}
      <section id="portfolio" className="relative z-10 max-w-7xl mx-auto px-6 py-28 border-t border-slate-200">
        <div className="mb-16 text-center md:text-left">
          <span className="inline-block px-3 py-1 text-xs font-mono font-bold text-purple-700 bg-purple-100 border border-purple-300 rounded-md tracking-widest uppercase mb-2">
            Δειγματα Εργασιων
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-1 mb-4">
            PORTFOLIO ΕΚΤΥΠΩΣΕΩΝ
          </h2>
          <p className="text-slate-600 max-w-xl text-base font-normal">
            Εξερευνήστε μερικά από τα πρόσφατα projects 3D εκτύπωσης και κατασκευών μας.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <div key={idx} className="group bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xl shadow-slate-200/60 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
              <div className="w-full h-52 bg-slate-100 rounded-2xl mb-6 flex items-center justify-center text-slate-400 font-mono text-xs border border-slate-200 group-hover:border-cyan-300 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent pointer-events-none" />
                [ 3D Print Photo Preview ]
              </div>
              <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-wider bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200">{p.category}</span>
              <h3 className="text-2xl font-bold mt-4 mb-2 text-slate-900 group-hover:text-cyan-600 transition-colors">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-28 border-t border-slate-200">
        <div className="mb-16 text-center md:text-left">
          <span className="inline-block px-3 py-1 text-xs font-mono font-bold text-cyan-700 bg-cyan-100 border border-cyan-300 rounded-md tracking-widest uppercase mb-2">
            Τι Προσφερουμε
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-1 mb-4">
            ΥΠΗΡΕΣΙΕΣ 3D ΕΚΤΥΠΩΣΗΣ
          </h2>
          <p className="text-slate-600 max-w-xl text-base font-normal">
            Ολοκληρωμένες λύσεις από τη σχεδίαση έως την τελική εκτύπωση και φινίρισμα.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/60 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-md">
                {s.num}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto px-6 py-28 border-t border-slate-200">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/80">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3">
              ΖΗΤΗΣΤΕ <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">ΠΡΟΣΦΟΡΑ</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Στείλτε μας το 3D αρχείο σας ή περιγράψτε μας την ιδέα σας για άμεση εκτίμηση κόστους.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Όνομα</label>
                <input type="text" placeholder="Το όνομά σας" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Email</label>
                <input type="email" placeholder="name@domain.com" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Περιγραφή / Απαιτήσεις Project</label>
              <textarea rows={4} placeholder="Περιγράψτε διαστάσεις, υλικό (αν γνωρίζετε) ή λεπτομέρειες..." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all resize-none text-sm" />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-base rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300">
              Αποστολή Αιτήματος
            </button>
          </form>
        </div>
      </section>

      {/* FIXED DARK FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 text-white pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <a href="#hero" className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              orama3D
            </a>
            <p className="text-slate-400 text-sm mt-4 max-w-sm leading-relaxed">
              Επαγγελματικές υπηρεσίες 3D εκτύπωσης & πρωτοτυποποίησης. Δίνουμε φυσική υπόσταση στις ψηφιακές σας δημιουργίες με ακρίβεια και ποιότητα.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-4">Πλοηγηση</h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Αρχική</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Υπηρεσίες Εκτύπωσης</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Επικοινωνία</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-4">Επικοινωνια</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">📍 Θεσσαλονίκη, Ελλάδα</li>
              <li className="flex items-center gap-2">📧 info@3dorama.gr</li>
              <li className="flex items-center gap-2">📞 +30 2310 000000</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} orama3D. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-slate-300 transition-colors">Επιστροφή στην κορυφή ↑</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

useGLTF.preload('/model.glb');
