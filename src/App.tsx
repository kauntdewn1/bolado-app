import React, { useState, useEffect, useRef } from 'react';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PreSale from './components/PreSale';
import ManifestoSection from './components/Manifesto';
import Gallery from './components/Gallery';
import CallToAction from './components/CallToAction';
import Termos from './components/Termos';
import PoliticaPrivacidade from './components/PoliticaPrivacidade';
import PoliticaTrocas from './components/PoliticaTrocas';


const App: React.FC = () => {
  const preSaleSectionRef = useRef<HTMLElement>(null);
  const [showUrgencyContainer, setShowUrgencyContainer] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (preSaleSectionRef.current) {
        const preSaleOffsetTop = preSaleSectionRef.current.offsetTop;
        const scrollPosition = window.scrollY;
        // You might want to add a small offset here if the section starts right at the top
        // const threshold = preSaleOffsetTop - 100;

        const isScrollingDown = scrollPosition > lastScrollY.current;

        setShowUrgencyContainer(isScrollingDown && scrollPosition >= preSaleOffsetTop);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    let timer: number | null = null;
    if (showUrgencyContainer) {
      timer = setTimeout(() => {
        setShowUrgencyContainer(false);
      }, 10000); // 10 seconds
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer !== null) clearTimeout(timer);
    };
  }, [showUrgencyContainer]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-body antialiased">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<section ref={preSaleSectionRef}><PreSale /><ManifestoSection /><Gallery /><CallToAction /><Hero /></section>} />
 <Route path="/termos" element={<Termos />} />
 <Route path="/privacidade" element={<PoliticaPrivacidade />} />
 <Route path="/trocas" element={<PoliticaTrocas />} />
 <Route path="/Manifesto" element={<ManifestoSection />} />
 </Routes>
 <Footer />
      </Router>
      {showUrgencyContainer && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-start">
 <div className="flex-grow">
 <p className="font-bold mb-2">🚨 Atenção:</p>
 <p className="text-sm">As primeiras 200 unidades não serão repetidas.</p>
 <p className="text-sm">Depois disso, o Mico some na floresta…</p>
 <p className="text-sm">e só volta quando quiser.</p>
 </div>
 <button
            className="ml-4 text-white font-bold text-lg leading-none hover:text-gray-200 transition-colors duration-200"
            onClick={() => setShowUrgencyContainer(false)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default App;