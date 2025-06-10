import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'bg-black backdrop-blur-md text-white' 
        : 'bg-white text-black'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center relative h-24">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img 
              src={isScrolled ? "/logo_hrz_white.png" : "/logo_hrz.png"} 
              alt="Mico Leão Bolado" 
              className="h-16 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;