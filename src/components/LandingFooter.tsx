import React from 'react';
import { Instagram } from 'lucide-react'; // Assuming lucide-react is used for icons

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-black py-16 px-6 text-gray-400 text-xs">
      <div className="max-w-4xl mx-auto text-center space-y-6">

        {/* Subtle Separator */}
        <div className="h-px bg-gray-700 opacity-30 max-w-sm mx-auto"></div>

        {/* Instagram Link */}
        <a
          href="https://www.instagram.com/micobolado/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block opacity-70 hover:opacity-100 transition-opacity duration-300"
          aria-label="Instagram"
        >
          <Instagram size={24} className="text-gray-400 mx-auto" />
        </a>

        {/* Copyright Text */}
        <p className="text-xs hover:underline">
          © 2025 Mico Leão Bolado™. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
};

export default LandingFooter;