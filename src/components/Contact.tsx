import { MapPin, Phone, Clock, Instagram, Facebook, Music2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppContactLink } from '../utils/whatsapp';

export default function Contact() {
  const { openOrderForm } = useCart();

  return (
    <section id="contato" className="bg-dark-gradient py-20 md:py-28">
      <div className="container-app grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="section-eyebrow mb-3">Fale Connosco</p>
          <h2 className="text-white font-display font-bold text-3xl md:text-4xl mb-8">
            CONTATO &amp; LOCALIZAÇÃO
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-4">
              <MapPin className="text-accent-orange shrink-0 mt-0.5" size={22} />
              <div>
                <p className="text-white font-semibold">Endereço</p>
                <p className="text-text-gray text-sm">
                  Rua Comandante Che Guevara, Talatona, Luanda, Angola
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-accent-orange shrink-0 mt-0.5" size={22} />
              <div>
                <p className="text-white font-semibold">Telefone / WhatsApp</p>
                <a
                  href={buildWhatsAppContactLink('Olá! Gostaria de saber mais sobre a Sorveteria Premium.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-gray text-sm hover:text-accent-orange transition-colors"
                >
                  +244 955 241 309
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="text-accent-orange shrink-0 mt-0.5" size={22} />
              <div>
                <p className="text-white font-semibold">Horário de Funcionamento</p>
                <p className="text-text-gray text-sm">Todos os dias · 10h00 – 22h00</p>
              </div>
            </li>
          </ul>

          <div className="flex gap-3 mb-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-colors duration-200"
              aria-label="TikTok"
            >
              <Music2 size={18} />
            </a>
          </div>

          <button onClick={openOrderForm} className="btn-solid">
            FAÇA SEU PEDIDO
          </button>
        </div>

        {/* Mapa */}
        <div className="rounded-3xl overflow-hidden shadow-soft h-[380px] lg:h-full min-h-[380px]">
          <iframe
            title="Localização da Sorveteria Premium"
            src="https://www.google.com/maps?q=Talatona,Luanda,Angola&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
