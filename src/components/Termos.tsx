import React from 'react';

const Termos: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          Termos de Uso
        </h1>
        
        <div className="max-w-4xl mx-auto prose prose-invert">
          <p className="text-lg mb-6">
            Ao acessar o site Mico Leão Bolado™, você concorda com os termos aqui descritos.
            Todo o conteúdo deste site é protegido por direitos autorais e não pode ser reproduzido sem autorização prévia.
          </p>

          <div className="bg-white/5 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Produto e Acesso</h2>
            <p className="text-lg">
              A compra do produto físico Toy Art Mico Leão Bolado™ dá direito a um item numerado e acesso simbólico à comunidade Jardim Secreto.
              Esse acesso é liberado manualmente após a confirmação de pagamento via OpenPix.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-2xl font-semibold mb-4">Contato e Alterações</h2>
            <p className="text-lg">
              O site é mantido por Homero Mauricio (<a href="mailto:artsbyhomero@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors">artsbyhomero@gmail.com</a>) 
              e se reserva o direito de alterar conteúdos, políticas e regras a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Termos; 