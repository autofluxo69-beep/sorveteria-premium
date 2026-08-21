import { MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="quem-somos" className="bg-primary-dark py-20 md:py-28">
      <div className="container-app flex flex-col md:flex-row items-center gap-12">
        {/* Texto */}
        <div className="w-full md:w-1/2">
          <span className="text-white/40 font-display font-semibold text-4xl block mb-3">
            01<span className="text-xl">/03</span>
          </span>
          <p className="section-eyebrow mb-3">Quem Somos</p>
          <h2 className="text-white font-display font-bold text-3xl md:text-4xl leading-tight mb-5">
            BEM-VINDO À SORVETERIA
          </h2>
          <p className="text-text-gray text-base md:text-lg leading-relaxed mb-4 max-w-lg">
            Nascemos da paixão por criar gelados artesanais com ingredientes
            selecionados. Cada sabor é preparado em pequenos lotes, todos os
            dias, para garantir a cremosidade e o frescor que um verdadeiro
            sorvete premium merece.
          </p>
          <p className="text-text-gray text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            VENHA NOS VISITAR e sinta a diferença de um espaço pensado para
            momentos especiais — sozinho, em família ou entre amigos.
          </p>
          <a
            href="https://maps.google.com/?q=Sorveteria+Premium+Luanda"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid"
          >
            <MapPin size={18} />
            ACESSE O MAPA
          </a>
        </div>

        {/* Imagem */}
        <div className="w-full md:w-1/2">
          <div className="relative rounded-3xl overflow-hidden shadow-soft aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1560008581-09826d1de69e?w=900&q=80"
              alt="Interior acolhedor da Sorveteria Premium"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
