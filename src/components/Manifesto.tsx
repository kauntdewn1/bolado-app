const Manifesto = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-3xl mx-auto space-y-10 text-left">

        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-tight">
          NÃO É UM BRINQUEDO.
        </h2>

        <div className="space-y-3 text-xl md:text-2xl font-light text-gray-200 leading-snug">
          <p>É um símbolo.</p>
          <p>De autenticidade.</p>
          <p>De rebeldia inteligente.</p>
          <p>De um novo tempo.</p>
        </div>

        <div className="pt-4 text-base md:text-lg text-gray-400">
          <p>
            Criado pelo artista <strong className="text-white font-semibold">Homero</strong>, o Mico Leão Bolado™ é um toy art colecionável que representa uma nova espécie:
          </p>
          <p className="italic text-gray-300 pt-2">
            a de quem pensa, sente e age diferente.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Manifesto;
