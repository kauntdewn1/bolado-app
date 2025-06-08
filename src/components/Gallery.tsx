import React from 'react';

const Gallery: React.FC = () => {


  return (
    <section id="membros" className="py-24 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">Feito para os inconformados.</h2>
        <div className="max-w-2xl mx-auto text-center mt-6 mb-12 text-gray-300 text-lg leading-relaxed">
          <p className="mt-4 text-black">O Mico não sorri.</p>
          <p className="mt-0 text-black">Ele observa. Ele questiona.</p>
          <p className="mt-0 text-black">Ele representa todos nós que não aceitamos o mundo como está.</p>
          <p className="mt-4 text-black">Se você sente que está fora do lugar comum,</p>
          <p className="mt-0 text-black">ele é seu totem. Seu espelho. Seu manifesto.</p>
        </div>

        <div className="mt-12 text-center">
          <button className="inline-block px-8 py-4 text-lg font-bold text-white bg-black hover:bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300">
            [ GARANTIR O MEU MICO LEÃO BOLADO™ AGORA ]
          </button>
          <p className="mt-4 text-gray-400 text-sm">Antes que ele desapareça.</p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;