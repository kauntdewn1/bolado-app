import { useRef, useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';

const Manifesto = () => {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [imgInView, setImgInView] = useState(false);
  const [textInView, setTextInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
          setImgInView(true);
        }
      }
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setTextInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* 
      <Helmet>
        <title>Mico Leão Bolado™ – Manifesto</title>
        <meta 
          name="description" 
          content="O manifesto do Mico Leão Bolado™: autenticidade, rebeldia inteligente e um novo tempo." 
        />
        <link 
          rel="canonical" 
          href="https://www.seusite.com.br/manifesto" 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Mico Leão Bolado™ – Manifesto",
            "description": "O manifesto do Mico Leão Bolado™: autenticidade, rebeldia inteligente e um novo tempo.",
            "url": "https://www.seusite.com.br/manifesto"
          })}
        </script>
      </Helmet>
      */}
      
      <section className="bg-white text-black py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          
          {/* Texto */}
          <div
            ref={textRef}
            className={`max-w-xl space-y-10 text-left transition-all duration-700 ${
              textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-tight">
              NÃO É UM BRINQUEDO.
            </h2>

            <ul className="space-y-3 text-xl md:text-2xl font-light text-gray-700 leading-snug list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">•</span> 
                <span><strong>É um símbolo.</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">•</span> 
                <span>De <strong>autenticidade</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">•</span> 
                <span>De <strong>rebeldia inteligente</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">•</span> 
                <span>De <strong>um novo tempo</strong>.</span>
              </li>
            </ul>

            <div className="pt-4 text-base md:text-lg text-gray-500">
              <p>
                Criado pelo artista <strong className="text-black font-semibold">Homero</strong>, 
                o <strong>Mico Leão Bolado™</strong> é um toy art colecionável que representa uma nova espécie:
              </p>
              <p className="italic text-gray-700 pt-2">
                a de quem <strong>pensa</strong>, <strong>sente</strong> e <strong>age diferente</strong>.
              </p>
            </div>
          </div>

          {/* Imagem */}
          <div className="flex-shrink-0">
            <div
              ref={imgRef}
              className={`w-60 h-60 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg transition-all duration-700 ${
                imgInView ? 'opacity-100 blur-0 translate-y-0' : 'opacity-40 blur-md -translate-y-16'
              }`}
              style={{ willChange: 'transform, filter, opacity' }}
            >
              <img
                src="/Homero-Mauricio-461x1024.jpg"
                alt="Foto do artista Homero"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) contrast(120%)' }}
              />
            </div>
            
            <div className="flex flex-col items-center mt-4 space-y-2">
              <a 
                href="https://www.instagram.com/homero.arte/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black font-semibold transition-colors"
              >
                <svg 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/>
                </svg>
                @homero.arte
              </a>
              
              <a 
                href="https://www.instagram.com/artspace.goiania/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black font-semibold transition-colors"
              >
                <svg 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/>
                </svg>
                @artspace.goiania
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manifesto;