import React from 'react';
import { Flame } from 'lucide-react';

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
      <div className="relative p-12 h-full flex flex-col">
        <div className="mb-8">
          {icon}
        </div>
        
        <h3 className="text-2xl font-medium mb-4">{title}</h3>
        <p className="text-5xl font-bold mb-8">{price}</p>
        
        <div className="space-y-4 mb-8 flex-grow">
          {benefits.map((benefit, index) => (
            <p key={index} className="text-base flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              {benefit}
            </p>
          ))}
        </div>
        
        {limited && (
          <p className="text-sm text-gray-500 mb-4">{limited}</p>
        )}
        
        <p className="mt-auto text-base font-medium text-gray-800 italic">{note}</p>
      </div>
    </div>
  );
};

const PreSale: React.FC = () => {
  const handlePurchaseClick = async () => {
    try {
      // You might want to get email and name from user authentication state or a form
      // For now, using dummy data or potentially getting user from auth context if available
      const dummyUserData = {
        email: 'test@example.com', // Replace with actual user email
        nome: 'Test User', // Replace with actual user name
        // value: 149700 // This is already defaulted in the API, but you can pass explicitly if needed
      };

      const response = await fetch('http://localhost:3001/api/OpenPix/create-charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dummyUserData),
      });

      const data = await response.json();

      if (response.ok && data.paymentLinkUrl) {
        window.location.href = data.paymentLinkUrl; // Redirect to OpenPix payment page
      } else {
        console.error('Failed to create charge:', data);
        alert('Não foi possível gerar a cobrança. Tente novamente.'); // Basic error handling
      }
    } catch (error) {
      console.error('Error during purchase process:', error);
      alert('Ocorreu um erro. Tente novamente.'); // Basic error handling
    }
  };

  return (
    <section id="prelaunch" className="py-32 px-6 has-cool-to-warm-spectrum-gradient-background">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-thin text-black mb-2">PRÉ LAUNCH</h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex justify-center items-center max-w-6xl mx-auto">
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
          <div className="ml-8 p-6 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg border border-white/30">
            <p className="text-lg font-semibold mb-4 text-gray-800">Detalhes:</p>
            <ul className="space-y-3 text-gray-700">
              <li>🛠️ Produção artesanal</li>
              <li>🎟️ Inclui 2 ingressos para o evento secreto de lançamento</li>
              <li>🎁 Embalagem de colecionador</li>
              <li>📦 Envio para todo o Brasil</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
 <button 
            className="inline-block px-8 py-4 text-lg font-bold text-black bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300"
            onClick={handlePurchaseClick}
          >
            [ GARANTIR O MEU MICO LEÃO BOLADO AGORA ]
 </button>
        </div>

      </div>
    </section>
  );
};

export default PreSale;