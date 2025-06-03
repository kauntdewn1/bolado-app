import React from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white text-black py-6 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#sobre" className="hover:text-gray-600 transition-colors">SOBRE</a>
            <a href="#prelaunch" className="hover:text-gray-600 transition-colors">PRÉ-LAUNCH</a>
            <a href="#evento" className="hover:text-gray-600 transition-colors">EVENTO</a>
            <a href="#membros" className="hover:text-gray-600 transition-colors">MEMBROS</a>
          </nav>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/logo_hrz.png" alt="Mico Leão Bolado" className="h-8" />
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#clube" className="hover:text-gray-600 transition-colors">CLUBE</a>
            <a href="#carrinho" className="hover:text-gray-600 transition-colors">CARRINHO</a>
          </div>
          
          <div className="md:hidden">
            {/* Spacer for mobile layout */}
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white absolute left-0 right-0 top-full z-50 p-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#sobre" className="hover:text-gray-600 transition-colors">SOBRE</a>
              <a href="#prelaunch" className="hover:text-gray-600 transition-colors">PRÉ-LAUNCH</a>
              <a href="#evento" className="hover:text-gray-600 transition-colors">EVENTO</a>
              <a href="#membros" className="hover:text-gray-600 transition-colors">MEMBROS</a>
              <a href="#clube" className="hover:text-gray-600 transition-colors">CLUBE</a>
              <a href="#carrinho" className="hover:text-gray-600 transition-colors">CARRINHO</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;