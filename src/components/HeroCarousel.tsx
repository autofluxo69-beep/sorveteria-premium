import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { carouselSlides } from '../data/carousel';

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToMenu = () => {
    document.querySelector('#cardapio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative pt-[90px] min-h-screen bg-hero-gradient-radial overflow-hidden"
    >
      {/* Textura ambiente sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full border border-white/40" />
        <div className="absolute top-40 -left-32 w-[300px] h-[300px] rounded-full border border-white/30" />
      </div>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[calc(100vh-90px)]"
      >
        {carouselSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="container-app h-full flex flex-col md:flex-row items-center">
              {/* Coluna esquerda — texto + CTA (60%) */}
              <div className="w-full md:w-[60%] py-12 md:py-0 order-2 md:order-1">
                <span className="text-white/50 font-display font-semibold text-4xl md:text-5xl block mb-4 animate-fadeUp">
                  {slide.index}
                  <span className="text-2xl md:text-3xl">/{slide.total}</span>
                </span>
                <h1
                  key={slide.id + '-title'}
                  className="text-white font-display font-bold text-4xl sm:text-5xl lg:text-[42px] leading-[1.1] mb-5 animate-fadeUp"
                  style={{ animationDelay: '0.1s', opacity: 0 }}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-white/80 text-base md:text-lg max-w-md mb-8 animate-fadeUp"
                  style={{ animationDelay: '0.2s', opacity: 0 }}
                >
                  {slide.subtitle}
                </p>
                <button
                  onClick={scrollToMenu}
                  className="btn-outline animate-fadeUp"
                  style={{ animationDelay: '0.3s', opacity: 0 }}
                >
                  {slide.ctaLabel}
                </button>
              </div>

              {/* Coluna direita — produto em destaque circular (40%) */}
              <div className="w-full md:w-[40%] order-1 md:order-2 flex justify-center md:justify-end pt-8 md:pt-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full scale-90 blur-2xl opacity-20" />
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-white shadow-soft animate-float overflow-hidden ring-8 ring-white/5">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navegação por números */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {carouselSlides.map((slide, i) => (
          <span
            key={slide.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-8 bg-accent-orange' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
