import React from 'react';

const PoliticaPrivacidade: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          Política de Privacidade
        </h1>
        
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-2xl font-semibold mb-6">Coletamos as seguintes informações:</h2>
          
          <ul className="list-none space-y-3 mb-8">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Nome
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              E-mail
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Data da compra
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Plano escolhido
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Status de pagamento
            </li>
          </ul>

          <div className="bg-white/5 p-6 rounded-lg mb-8">
            <p className="text-lg">
              Esses dados são utilizados exclusivamente para gerenciar a pré-venda e liberar o acesso à comunidade Jardim Secreto.
              As informações são armazenadas com segurança via banco de dados SQL e não serão compartilhadas com terceiros.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-2xl font-semibold mb-4">Exclusão de Dados</h2>
            <p className="text-lg">
              Você pode solicitar a exclusão dos seus dados a qualquer momento através do e-mail:
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

export default PoliticaPrivacidade; 