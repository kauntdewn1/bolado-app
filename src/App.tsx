import React from 'react';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PreSale from './components/PreSale';
import Gallery from './components/Gallery';
import CallToAction from './components/CallToAction';
import Termos from './components/Termos';
import PoliticaPrivacidade from './components/PoliticaPrivacidade';
import PoliticaTrocas from './components/PoliticaTrocas';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-body antialiased">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <PreSale />
              <Gallery />
              <CallToAction />
            </>
          } />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/trocas" element={<PoliticaTrocas />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;