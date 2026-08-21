import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { promotions } from '../data/promotions';

function useCountdown(endsAt: string) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, new Date(endsAt).getTime() - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, new Date(endsAt).getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, expired: timeLeft <= 0 };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-primary-dark/90 rounded-xl px-4 py-3 min-w-[64px]">
      <span className="text-white font-display font-bold text-2xl tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-white/60 text-[10px] uppercase tracking-wide">{label}</span>
    </div>
  );
}

export default function Promotions() {
  const promo = promotions[0];
  const { hours, minutes, seconds, expired } = useCountdown(promo.endsAt);

  const scrollToMenu = () => {
    document.querySelector('#cardapio')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!promo) return null;

  return (
    <section className="py-16 md:py-20 bg-primary-dark">
      <div className="container-app">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-orange to-[#FF6B35] px-8 py-10 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="pointer-events-none absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10" />

          <div className="relative z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-primary-dark text-white text-xs font-bold tracking-wide px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={14} />
              OFERTA POR TEMPO LIMITADO
            </span>
            <h2 className="text-primary-dark font-display font-extrabold text-3xl md:text-4xl mb-3">
              {promo.title} {promo.discountLabel}
            </h2>
            <p className="text-primary-dark/80 max-w-md text-sm md:text-base">
              {promo.description}
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            {!expired ? (
              <div className="flex gap-3">
                <TimeBlock value={hours} label="Horas" />
                <TimeBlock value={minutes} label="Min" />
                <TimeBlock value={seconds} label="Seg" />
              </div>
            ) : (
              <p className="text-primary-dark font-bold">Oferta encerrada — fique atento à próxima!</p>
            )}
            <button
              onClick={scrollToMenu}
              className="bg-primary-dark text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-black transition-colors duration-200"
            >
              APROVEITAR AGORA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
