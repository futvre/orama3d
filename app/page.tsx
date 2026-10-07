'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float, AdaptiveDpr } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} scale={1.4} position={[0, -0.2, 0]} />;
}

// Τύπος Προϊόντος & Καλαθιού
interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  desc: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // States για Αναζήτηση & Κατηγορίες
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Όλα');

  // Φόρτωση καλαθιού από το localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('orama3d_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Ενημέρωση localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('orama3d_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Λίστα Προϊόντων
  const products: Product[] = [
    { 
      id: '1',
      title: 'Βιομηχανικό Εξάρτημα PETG', 
      category: '3D Print & Engineering', 
      price: 24.90,
      desc: 'Λειτουργικό εξάρτημα υψηλής αντοχής σε θερμοκρασία και καταπονήσεις.',
      image: '/model.glb'
    },
    { 
      id: '2',
      title: 'Αρχιτεκτονικό Μοντέλο Κτιρίου', 
      category: '3D Scale Modeling', 
      price: 89.00,
      desc: 'Μακέτα υψηλής λεπτομέρειας με εκτύπωση SLA Resin.',
      image: '/model.glb'
    },
    { 
      id: '3',
      title: 'Custom Collector Figure', 
      category: 'Art & Custom Print', 
      price: 45.00,
      desc: 'Συλλεκτική φιγούρα 20cm με χειροποίητη προετοιμασία και φινίρισμα.',
      image: '/model.glb'
    },
  ];

  const categories = ['Όλα', ...Array.from(new Set(products.map((p) => p.category)))];

  // Φιλτράρισμα Προϊόντων με βάση την Αναζήτηση & την Κατηγορία
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Όλα' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  // Λειτουργίες Καλαθιού
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-200/50 via-blue-200/30 to-purple-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[900px] -left-20 w-[600px] h-[600px] bg-cyan-100/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* HEADER WITH CART BUTTON */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
            orama3D
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-200">
            <a href="#shop" className="hover:text-cyan-400 transition-colors">Προϊόντα & E-Shop</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Υπηρεσίες</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Επικοινωνία</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Cart Icon Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-slate-800 hover:bg-cyan-500 text-white rounded-full transition-all duration-300 flex items-center justify-center"
              aria-label="Open Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-400 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-200 hover:text-cyan-400 focus:outline-none p-2"
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
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <nav className="md:hidden bg-slate-950/95 border-b border-slate-800 text-white backdrop-blur-2xl px-6 py-6 flex flex-col gap-4">
            <a href="#shop" onClick={() => setIsMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 font-bold text-lg py-2 border-b border-slate-800">
              Προϊόντα & E-Shop
            </a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 font-bold text-lg py-2 border-b border-slate-800">
              Υπηρεσίες
            </a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 font-bold text-lg py-2">
              Επικοινωνία
            </a>
          </nav>
        )}
      </header>

      {/* SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">Το Καλάθι σου ({totalCartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-900 p-2 font-bold text-xl">✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <span className="text-4xl mb-3">🛒</span>
                <p className="text-slate-500 font-medium">Το καλάθι σου είναι άδειο.</p>
              </div>
            ) : (
              <div className="flex-1 py-4 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-cyan-600 font-extrabold">{item.price.toFixed(2)} €</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-xs font-bold hover:bg-slate-100">-</button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-xs font-bold hover:bg-slate-100">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-bold">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="flex justify-between items-center text-lg font-black text-slate-900">
                  <span>Σύνολο:</span>
                  <span className="text-cyan-600">{totalCartPrice.toFixed(2)} €</span>
                </div>
                <a 
                  href="#contact" 
                  onClick={() => setIsCartOpen(false)}
                  className="block text-center w-full py-4 bg-slate-900 hover:bg-cyan-600 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Ολοκλήρωση Παραγγελίας
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 1: HERO */}
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

        <div className="relative z-10 text-center px-4 pointer-events-none mt-2 md:mt-4 max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-3 text-xs font-mono font-bold tracking-widest text-cyan-700 bg-cyan-100/80 border border-cyan-300 rounded-full backdrop-blur-md shadow-sm">
            PREMIUM 3D PRINTING & PRODUCTS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-3">
            ΑΠΟ ΤΗΝ ΙΔΕΑ ΣΤΗΝ <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">ΠΡΑΓΜΑΤΙΚΟΤΗΤΑ</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto mb-6 font-medium">
            Αγοράστε 3D εκτυπωμένα προϊόντα ή ζητήστε εξατομικευμένη προσφορά.
          </p>
          <div className="pointer-events-auto flex gap-4 justify-center">
            <a href="#shop" className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-full hover:bg-cyan-600 shadow-lg transition-all text-sm md:text-base">
              Δείτε τα Προϊόντα
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: E-SHOP / PRODUCTS */}
      <section id="shop" className="relative z-10 max-w-7xl mx-auto px-6 py-28 border-t border-slate-200">
        <div className="mb-12 text-center md:text-left">
          <span className="inline-block px-3 py-1 text-xs font-mono font-bold text-purple-700 bg-purple-100 border border-purple-300 rounded-md tracking-widest uppercase mb-2">
            Store & E-Shop
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-1 mb-4">
            ΠΡΟΪΟΝΤΑ ΕΚΤΥΠΩΣΗΣ
          </h2>
          <p className="text-slate-600 max-w-xl text-base font-normal">
            Επιλέξτε έτοιμα 3D εκτυπωμένα αντικείμενα και προσθέστε τα άμεσα στο καλάθι σας.
          </p>
        </div>

        {/* SEARCH & CATEGORY FILTERS */}
        <div className="mb-12 space-y-6">
          {/* Search Input Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Αναζήτηση προϊόντος..."
              className="w-full bg-white border border-slate-300 rounded-2xl pl-11 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm shadow-sm"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs">
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-400 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <span className="text-4xl mb-3 block">🔍</span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Δεν βρέθηκαν προϊόντα</h3>
            <p className="text-sm text-slate-500">Δοκιμάστε διαφορετικούς όρους αναζήτησης ή επιλέξτε άλλη κατηγορία.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <div key={p.id} className="group bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xl shadow-slate-200/60 hover:border-cyan-500 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-full h-52 bg-slate-100 rounded-2xl mb-6 flex flex-col items-center justify-center text-slate-400 font-mono text-xs border border-slate-200 group-hover:border-cyan-300 transition-colors relative overflow-hidden">
                    <span className="text-3xl mb-2">📦</span>
                    <span>[ Φωτογραφία Προϊόντος ]</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono font-bold text-cyan-700 uppercase bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200">{p.category}</span>
                    <span className="text-xl font-black text-slate-900">{p.price.toFixed(2)} €</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{p.desc}</p>
                </div>

                <button 
                  onClick={() => addToCart(p)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-cyan-600 active:scale-95 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>🛒</span> Προσθήκη στο Καλάθι
                </button>
              </div>
            ))}
          </div>
        )}
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
            Custom παραγγελίες, σχεδίαση CAD & εξειδικευμένο φινίρισμα.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/60 hover:border-purple-500 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-md">
                {s.num}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTACT / CHECKOUT */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto px-6 py-28 border-t border-slate-200">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/80">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3">
              ΠΑΡΑΓΓΕΛΙΑ & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">ΠΡΟΣΦΟΡΑ</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Στείλτε μας το αίτημά σας για αγορά προϊόντων ή για custom 3D εκτύπωση.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Όνομα</label>
                <input type="text" placeholder="Το όνομά σας" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Email</label>
                <input type="email" placeholder="name@domain.com" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Λεπτομέρειες Παραγγελίας</label>
              <textarea 
                rows={4} 
                defaultValue={cart.length > 0 ? `Παραγγελία Καλαθιού:\n${cart.map(i => `- ${i.title} (x${i.quantity}) -${(i.price * i.quantity).toFixed(2)}€`).join('\n')}\n\nΣύνολο: ${totalCartPrice.toFixed(2)}€` : ''}
                placeholder="Περιγράψτε τα προϊόντα ή το custom 3D project σας..." 
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all resize-none text-sm" 
              />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-base rounded-xl hover:shadow-xl transition-all duration-300">
              Αποστολή Παραγγελίας
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 text-white pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="#hero" className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              orama3D
            </a>
            <p className="text-slate-400 text-sm mt-4 max-w-sm leading-relaxed">
              Επαγγελματικές υπηρεσίες 3D εκτύπωσης & e-shop προϊόντων.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-4">Πλοηγηση</h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Αρχική</a></li>
              <li><a href="#shop" className="hover:text-cyan-400 transition-colors">E-Shop Προϊόντων</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Υπηρεσίες</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Επικοινωνία</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-4">Επικοινωνια</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>📍 Θεσσαλονίκη, Ελλάδα</li>
              <li>📧 info@orama3d.gr</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 flex justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} orama3D. All rights reserved.</p>
          <a href="#hero" className="hover:text-slate-300">Επιστροφή στην κορυφή ↑</a>
        </div>
      </footer>

    </div>
  );
}

useGLTF.preload('/model.glb');
