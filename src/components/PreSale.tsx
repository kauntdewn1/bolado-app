import React, { useState, useEffect } from 'react';
import { Flame, Eye, EyeOff, Copy, Check } from 'lucide-react';

interface PreSaleCardProps {
  title: string;
  icon: JSX.Element;
  price: string;
  benefits: string[];
  note: string;
  limited?: string;
  highlight?: boolean;
}

const PreSaleCard = ({
  title,
  icon,
  price,
  benefits,
  note,
  limited,
  highlight
}: PreSaleCardProps) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-[32px] backdrop-blur-sm transition-all duration-500 hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.1)] ${
        highlight 
          ? 'bg-white/90' 
          : 'bg-white/70'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10"></div>
      <div className="relative p-6 md:p-8 lg:p-12 h-full flex flex-col">
        <div className="mb-4 md:mb-6 lg:mb-8">
          {icon}
        </div>
        
        <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">{title}</h3>
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8">{price}</p>
        
        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 lg:mb-8 flex-grow">
          {benefits.map((benefit, index) => (
            <p key={index} className="text-sm md:text-base flex items-start md:items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 md:mt-0 flex-shrink-0"></span>
              <span className="leading-relaxed">{benefit}</span>
            </p>
          ))}
        </div>
        
        {limited && (
          <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">{limited}</p>
        )}
        
        <p className="mt-auto text-sm md:text-base font-medium text-gray-800 italic">{note}</p>
      </div>
    </div>
  );
};

const PreSale: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  const pixCode = "00020126580014BR.GOV.BCB.PIX0136222fde02-5b49-4f5f-885e-898a8a7fe3b752040000530398654071497.005802BR5925Homero Mauricio de Araujo6009SAO PAULO62140510vZ0QqXmCwr6304EE67";

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Código Pix copiado!');
    }
  };

  const togglePaymentVisibility = () => {
    setShowPayment(!showPayment);
  };

  useEffect(() => {
    document.body.classList.toggle('modal-open', showModal);
  }, [showModal]);

  return (
    <section id="prelaunch" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 has-cool-to-warm-spectrum-gradient-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-black mb-2">PRÉ LAUNCH</h2>
          <div className="w-16 md:w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-6 lg:gap-8 max-w-6xl mx-auto">
          <div className="w-full lg:flex-1">
            <PreSaleCard 
              title="Mico Leão Bolado™"
              icon={<Flame size={48} className="text-red-500" />}
              price="R$ 1.497"
              benefits={[
                "Cada escultura tem 30cm de atitude e vem numerada, com certificado de autenticidade."
              ]}
              note="🔥 Apenas 200 peças."
              limited="Todas únicas."
              highlight={true}
            />
          </div>
          <div className="w-full lg:w-auto lg:ml-0 p-4 md:p-6 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg border border-white/30">
            <p className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800">Detalhes:</p>
            <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base">
              <li>🛠️ Produção artesanal</li>
              <li>🎟️ Inclui 2 ingressos para o evento secreto de lançamento</li>
              <li>🚞️ Envio para todo o Brasil</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 text-center">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Pagamento via Pix</h3>
          
          {/* Botão para mostrar/ocultar QR Code */}
          <button
            onClick={togglePaymentVisibility}
            className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold transition-all duration-300 mb-4 md:mb-6 text-sm md:text-base ${
              showPayment 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {showPayment ? (
              <>
                <EyeOff size={16} md:size={20} />
                <span className="hidden sm:inline">Ocultar QR Code</span>
                <span className="sm:hidden">Ocultar</span>
              </>
            ) : (
              <>
                <Eye size={16} md:size={20} />
                <span className="hidden sm:inline">Mostrar QR Code e Finalizar Compra</span>
                <span className="sm:hidden">Finalizar Compra</span>
              </>
            )}
          </button>

          {/* Área do pagamento - aparece/desaparece com animação */}
          <div className={`transition-all duration-500 overflow-hidden ${
            showPayment ? 'max-h-[900px] md:max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/50 max-w-sm md:max-w-md mx-auto">
              <p className="mb-4 md:mb-6 text-gray-700 text-sm md:text-base">Escaneie o QR Code abaixo ou copie o código Pix para finalizar sua compra:</p>
              
              {/* QR Code */}
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-inner">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020126580014BR.GOV.BCB.PIX0136222fde02-5b49-4f5f-885e-898a8a7fe3b752040000530398654071497.005802BR5925Homero Mauricio de Araujo6009SAO PAULO62140510vZ0QqXmCwr6304EE67"
                  alt="QR Code Pix"
                  className="mx-auto rounded-md md:rounded-lg w-full max-w-[240px] md:max-w-[280px]"
                />
              </div>

              {/* Código Pix */}
              <div className="mb-3 md:mb-4">
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                  Código PIX (Copia e Cola):
                </label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={pixCode}
                    className="w-full p-2 md:p-3 border-2 border-gray-200 rounded-md md:rounded-lg text-xs bg-gray-50 resize-none focus:outline-none focus:border-blue-300 transition-colors"
                    rows={3}
                    onFocus={e => e.target.select()}
                  />
                  <button
                    onClick={handleCopyPix}
                    className={`absolute top-1 md:top-2 right-1 md:right-2 p-1.5 md:p-2 rounded-sm md:rounded-md transition-all duration-200 ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                    }`}
                  >
                    {copied ? <Check size={12} md:size={16} /> : <Copy size={12} md:size={16} />}
                  </button>
                </div>
              </div>

              {/* Botão de copiar */}
              <button
                onClick={handleCopyPix}
                className={`w-full py-2.5 md:py-3 px-3 md:px-4 rounded-md md:rounded-lg font-bold transition-all duration-200 text-sm md:text-base ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-800'
                }`}
              >
                {copied ? '✓ Código Copiado!' : 'Copiar código Pix'}
              </button>

              <p className="text-xs text-gray-500 mt-3 md:mt-4">
                Após o pagamento, você receberá a confirmação por email
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreSale;