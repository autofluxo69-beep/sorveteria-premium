import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { iceCreams } from '../data/icecreams';
import { formatKz } from '../utils/currency';
import { useCart } from '../context/CartContext';
import type { IceCreamCategory, IceCreamSize } from '../types/IceCream';

const CATEGORIES: IceCreamCategory[] = [
  'Clássicos',
  'Premium',
  'Frutas Tropicais',
  'Criações Especiais',
];

export default function MenuCarousel() {
  const [activeCategory, setActiveCategory] = useState<IceCreamCategory>('Clássicos');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, IceCreamSize>>({});
  const { addToCart } = useCart();

  const filteredItems = useMemo(
    () => iceCreams.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const getSelectedSize = (iceCreamId: string, defaultSize: IceCreamSize) =>
    selectedSizes[iceCreamId] ?? defaultSize;

  return (
    <section id="cardapio" className="bg-primary-dark py-20 md:py-28">
      <div className="container-app">
        <div className="text-center mb-10">
          <p className="section-eyebrow mb-3">O Nosso Cardápio</p>
          <h2 className="text-white font-display font-bold text-3xl md:text-4xl">
            ESCOLHA O SEU SABOR
          </h2>
        </div>

        {/* Filtros de categoria */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-accent-orange text-primary-dark'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de sorvetes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const selectedSize = getSelectedSize(item.id, item.sizes[0].size);
            const pricing = item.sizes.find((s) => s.size === selectedSize) ?? item.sizes[0];

            return (
              <article
                key={item.id}
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center hover:border-accent-orange/40 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-soft mb-5 ring-4 ring-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-white font-display font-bold text-lg mb-1.5">
                  {item.name}
                </h3>
                <p className="text-text-gray text-sm leading-relaxed mb-4 min-h-[40px]">
                  {item.description}
                </p>

                {/* Seletor de tamanho */}
                <div className="flex gap-2 mb-4">
                  {item.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() =>
                        setSelectedSizes((prev) => ({ ...prev, [item.id]: s.size }))
                      }
                      className={`w-9 h-9 rounded-full text-xs font-bold border transition-colors duration-200 ${
                        selectedSize === s.size
                          ? 'bg-accent-orange text-primary-dark border-accent-orange'
                          : 'border-white/20 text-white/70 hover:border-white/50'
                      }`}
                      aria-label={s.label}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>

                <p className="text-accent-orange font-bold text-lg mb-5">
                  {formatKz(pricing.priceKz)}
                </p>

                <button
                  onClick={() => addToCart(item, selectedSize)}
                  className="btn-outline w-full !py-2.5"
                >
                  <Plus size={16} />
                  ADICIONAR
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
