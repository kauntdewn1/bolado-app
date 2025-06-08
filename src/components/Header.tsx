import React from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white text-black py-6 relative shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} />
          </button>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium" aria-label="Menu principal">
            <ul className="flex space-x-8">
              <li><a href="#sobre" className="hover:text-gray-600 transition-colors">SOBRE</a></li>
              <li><a href="#prelaunch" className="hover:text-gray-600 transition-colors">PRÉ-LAUNCH</a></li>
              <li><a href="#evento" className="hover:text-gray-600 transition-colors">EVENTO</a></li>
              <li><a href="#membros" className="hover:text-gray-600 transition-colors">MEMBROS</a></li>
            </ul>
          </nav>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/logo_hrz.png" alt="Mico Leão Bolado" className="h-8" />
          </div>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium" aria-label="Menu secundário">
            <ul className="flex space-x-8">
              <li><a href="#clube" className="hover:text-gray-600 transition-colors">CLUBE</a></li>
              <li><a href="#carrinho" className="hover:text-gray-600 transition-colors">CARRINHO</a></li>
            </ul>
          </nav>
          <div className="md:hidden" />
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden bg-white absolute left-0 right-0 top-full z-50 p-4 border-t border-gray-200"
            aria-label="Menu mobile"
          >
            <ul className="flex flex-col space-y-4">
              <li><a href="#sobre" className="hover:text-gray-600 transition-colors">SOBRE</a></li>
              <li><a href="#prelaunch" className="hover:text-gray-600 transition-colors">PRÉ-LAUNCH</a></li>
              <li><a href="#evento" className="hover:text-gray-600 transition-colors">EVENTO</a></li>
              <li><a href="#membros" className="hover:text-gray-600 transition-colors">MEMBROS</a></li>
              <li><a href="#clube" className="hover:text-gray-600 transition-colors">CLUBE</a></li>
              <li><a href="#carrinho" className="hover:text-gray-600 transition-colors">CARRINHO</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;