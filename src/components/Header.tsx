import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'QUEM SOMOS', href: '#quem-somos' },
  { label: 'CARDÁPIO', href: '#cardapio' },
  { label: 'GALERIA', href: '#galeria' },
  { label: 'FRANQUIA', href: '#franquia' },
  { label: 'CONTATO', href: '#contato' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, openOrderForm } = useCart();

  // Fecha o menu mobile sempre que a janela é redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-beige shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
      <div className="container-app flex items-center justify-between h-[90px]">
        {/* Logo circular */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center justify-center w-[62px] h-[62px] md:w-[80px] md:h-[80px] rounded-full bg-primary-dark text-white shrink-0 shadow-soft"
          aria-label="Sorveteria Premium — Início"
        >
          <span className="font-display text-[11px] md:text-xs font-semibold tracking-wide text-center leading-tight">
            Sorveteria
            <br />
            Premium
          </span>
        </a>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Menu principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-[#333333] text-sm font-semibold tracking-wide hover:text-accent-orange transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openOrderForm}
            className="relative hidden sm:inline-flex items-center gap-2 bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-dark-gradient transition-colors duration-200"
          >
            <ShoppingBag size={16} />
            Pedido
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-orange text-primary-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Botão hamburger mobile */}
          <button
            className="md:hidden text-[#333333] p-2"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-beige-light ${
          isMenuOpen ? 'max-h-96 border-t border-black/10' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col py-3" aria-label="Menu mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-6 py-3 text-[#333333] text-sm font-semibold tracking-wide hover:bg-black/5"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openOrderForm();
            }}
            className="mx-6 mt-2 mb-3 inline-flex items-center justify-center gap-2 bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            <ShoppingBag size={16} />
            Ver Pedido ({totalItems})
          </button>
        </nav>
      </div>
    </header>
  );
}
