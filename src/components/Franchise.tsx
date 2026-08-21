import { Store, TrendingUp, HeartHandshake } from 'lucide-react';
import { buildWhatsAppContactLink } from '../utils/whatsapp';

const PILLARS = [
  {
    icon: Store,
    title: 'Modelo Comprovado',
    description: 'Receitas, fornecedores e processos já testados e otimizados.',
  },
  {
    icon: TrendingUp,
    title: 'Alto Potencial',
    description: 'Mercado de gelados premium em crescimento constante em Angola.',
  },
  {
    icon: HeartHandshake,
    title: 'Suporte Completo',
    description: 'Acompanhamento na abertura, marketing e gestão do dia a dia.',
  },
];

export default function Franchise() {
  return (
    <section id="franquia" className="bg-primary-dark py-20 md:py-28">
      <div className="container-app text-center">
        <p className="section-eyebrow mb-3">Expansão</p>
        <h2 className="text-white font-display font-bold text-3xl md:text-4xl mb-4">
          TORNE-SE UM FRANQUEADO
        </h2>
        <p className="text-text-gray max-w-xl mx-auto mb-14">
          Leve a experiência Sorveteria Premium para o seu bairro. Procuramos
          parceiros que partilhem a nossa paixão por qualidade e atendimento.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white/[0.04] border border-white/10 rounded-3xl p-8"
            >
              <div className="w-12 h-12 rounded-full bg-accent-orange/15 flex items-center justify-center mx-auto mb-4">
                <Icon className="text-accent-orange" size={22} />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-text-gray text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <a
          href={buildWhatsAppContactLink('Olá! Tenho interesse em abrir uma franquia da Sorveteria Premium.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid"
        >
          QUERO SER FRANQUEADO
        </a>
      </div>
    </section>
  );
}
