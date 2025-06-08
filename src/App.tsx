import React, { useState, useEffect } from 'react';
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
  const [showUrgencyContainer, setShowUrgencyContainer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 200; // Adjust this value as needed

      setShowUrgencyContainer(scrollPosition > threshold);
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
      if (timer) clearTimeout(timer);
    };
  }, [showUrgencyContainer]); // Add showUrgencyContainer to the dependency array

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-body antialiased">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
 <><PreSale /><ManifestoSection /><Gallery /><CallToAction /><Hero /></>} />
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