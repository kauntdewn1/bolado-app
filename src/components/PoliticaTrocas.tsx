import React from 'react';

const PoliticaTrocas: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          Política de Trocas e Reembolsos
        </h1>
        
        <div className="max-w-4xl mx-auto prose prose-invert">
          <div className="bg-white/5 p-6 rounded-lg mb-8">
            <p className="text-lg">
              O Toy Art Micoleão Bolado é um item artesanal e de edição limitada.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <p className="text-lg">
                Não realizamos reembolsos após o envio do produto.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <p className="text-lg">
                Caso o item chegue com defeito ou avaria, o comprador deve entrar em contato em até 7 dias úteis após o recebimento.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-2xl font-semibold mb-4">Contato</h2>
            <p className="text-lg">
              Para qualquer problema ou solicitação, envie um e-mail para:
            </p>
            <a 
              href="mailto:artsbyhomero@gmail.com" 
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mt-2 text-lg"
            >
              <span>📩</span> artsbyhomero@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaTrocas; 