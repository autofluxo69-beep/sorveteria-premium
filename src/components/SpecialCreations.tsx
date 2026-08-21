import { ArrowRight } from 'lucide-react';
import { iceCreams } from '../data/icecreams';

export default function SpecialCreations() {
  const signature = iceCreams.filter((item) => item.isSignature);

  const scrollToMenu = () => {
    document.querySelector('#cardapio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-dark-gradient py-20 md:py-28">
      <div className="container-app">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">Assinatura da Casa</p>
          <h2 className="text-white font-display font-bold text-3xl md:text-4xl">
            CRIAÇÃO PRÓPRIA
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {signature.map((item, i) => (
            <div
              key={item.id}
              className="relative bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-6 hover:bg-white/[0.08] transition-colors duration-300"
            >
              <span className="absolute top-6 right-8 text-white/20 font-display font-semibold text-sm">
                J{i + 1}/{signature.length.toString().padStart(2, '0')}
              </span>
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 shadow-soft ring-4 ring-white/5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-xl mb-2">
                  {item.name}
                </h3>
                <p className="text-text-gray text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <button
                  onClick={scrollToMenu}
                  className="inline-flex items-center gap-1.5 text-accent-orange text-sm font-semibold hover:gap-2.5 transition-all duration-200"
                >
                  SAIBA MAIS <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
