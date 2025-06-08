import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 bg-white text-black">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="inline-block border-t-4 border-black w-12 mb-8"></div>
          <p className="uppercase text-xl font-bold mb-2">Mico Leão Bolado™</p>
          <p className="text-gray-600 mb-12">Quer saber o que vem depois? Só quem tiver o Mico vai descobrir.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-sm uppercase tracking-widest">
            <div className="text-left">
              <h3 className="font-bold mb-4">Navegação</h3>
              <ul className="space-y-2">
                <li><a href="#sobre" className="hover:underline">Sobre</a></li>
                <li><a href="#prelaunch" className="hover:underline">Pré-Launch</a></li>
                <li><a href="#evento" className="hover:underline">Evento</a></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#termos" className="hover:underline">Termos</a></li>
                <li><a href="#privacidade" className="hover:underline">Privacidade</a></li>
                <li><a href="#cookies" className="hover:underline">Cookies</a></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h3 className="font-bold mb-4">Social</h3>
              <ul className="space-y-2">
                <li><a href="#instagram" className="hover:underline">Instagram</a></li>
                <li><a href="#twitter" className="hover:underline">Twitter</a></li>
                <li><a href="#discord" className="hover:underline">Discord</a></li>
              </ul>
            </div>
            
            <div className="text-left">
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li><a href="mailto:info@micoleaobolado.com" className="hover:underline">Email</a></li>
                <li><a href="#suporte" className="hover:underline">Suporte</a></li>
                <li><a href="#imprensa" className="hover:underline">Imprensa</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500">© 2025 Mico Leão Bolado™. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;