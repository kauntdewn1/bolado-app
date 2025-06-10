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
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {
  const preSaleSectionRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const [showUrgencyContainer, setShowUrgencyContainer] = useState(false);
  const [mainBlur, setMainBlur] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Blur gradual ao se aproximar do footer
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Quando o topo do footer entra na viewport, começa o blur
        const distance = Math.max(0, windowHeight - footerRect.top);
        // Blur máximo de 12px, começa a partir de 0px
        const blurValue = Math.min(distance / 40, 12); // ajuste divisor para suavidade
        setMainBlur(blurValue);
      }
      if (preSaleSectionRef.current) {
        const preSaleElement = preSaleSectionRef.current as HTMLElement;
        const preSaleOffsetTop = preSaleElement.offsetTop;
        const scrollPosition = window.scrollY;
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
    <HelmetProvider>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-body antialiased">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <main className="pt-24" style={{ filter: `blur(${mainBlur}px)`, transition: 'filter 0.3s' }}>
                      <PreSale />
                      <Gallery />
                      <CallToAction />
                      <ManifestoSection />
                      <Hero />
                    </main>
                    <Footer ref={footerRef} />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/termos"
              element={
                <>
                  <Header />
                  <main className="pt-24">
                    <Termos />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route path="/privacidade" element={
              <>
                <Header />
                <main className="pt-24">
                  <PoliticaPrivacidade />
                </main>
                <Footer />
              </>
            } />
            <Route path="/trocas" element={
              <>
                <Header />
                <main className="pt-24">
                  <PoliticaTrocas />
                </main>
                <Footer />
              </>
            } />
            <Route path="/Manifesto" element={
              <>
                <Header />
                <main className="pt-24">
                  <ManifestoSection />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </Router>
        {showUrgencyContainer && (
          <div className="fixed bottom-4 right-4 bg-yellow-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-start">
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
    </HelmetProvider>
  );
};

export default App;