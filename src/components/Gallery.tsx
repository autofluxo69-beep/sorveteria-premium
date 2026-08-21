import { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  caption: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=700&q=80',
    caption: 'O nosso espaço',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=700&q=80',
    caption: 'Baunilha Madagáscar',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=700&q=80',
    caption: 'Açaí Premium Original',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=700&q=80',
    caption: 'Petit Gateau no Copo',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=700&q=80',
    caption: 'Preparação artesanal',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1629385696086-573faa842379?w=700&q=80',
    caption: 'Pistacho Siciliano',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=700&q=80',
    caption: 'Morango do Campo',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=700&q=80',
    caption: 'Maracujá Intenso',
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <section id="galeria" className="bg-dark-gradient py-20 md:py-28">
      <div className="container-app">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h2 className="text-white font-display font-bold text-3xl md:text-4xl">
            GALERIA
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelected(image)}
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/60 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <span className="text-white text-sm font-semibold">{image.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.caption}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            onClick={() => setSelected(null)}
            aria-label="Fechar"
          >
            <X size={32} />
          </button>
          <figure
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.caption}
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
            <figcaption className="text-white/70 text-center mt-4 text-sm">
              {selected.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
