import React from 'react';

interface FooterProps {
  className?: string;
  [key: string]: any;
}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="py-16 px-6 bg-white text-black" {...props}>
      <div className="container mx-auto">
        <div className="text-center">
          <img 
            src="/logo_hrz.png" 
            alt="Mico Leão Bolado Logo" 
            className="mx-auto mb-6 h-12" 
          />
          <div className="inline-block border-t-4 border-black w-12 mb-8"></div>
          <p className="uppercase text-xl font-bold mb-2">Mico Leão Bolado™</p>
          <p className="text-gray-600 mb-12">
            Quer saber o que vem depois? Só quem tiver o Mico vai descobrir.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-sm uppercase tracking-widest">
            <div className="text-center md:text-left">
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#termos" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Termos
                  </a>
                </li>
                <li>
                  <a 
                    href="#privacidade" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a 
                    href="#cookies" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-bold mb-4">Social</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.instagram.com/micobolado/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:micoleaobolado25@gmail.com" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a 
                    href="#suporte" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Suporte
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+5562999212799" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Imprensa
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © 2025 Mico Leão Bolado™. Todos os direitos reservados.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              desenvolvido por{' '}
              <a 
                href="https://www.instagram.com/mello_.dev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-black transition-colors"
              >
                MELLØ
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;