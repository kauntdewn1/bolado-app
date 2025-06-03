import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PreSale from './components/PreSale';
import Gallery from './components/Gallery';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <PreSale />
        <Gallery />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;