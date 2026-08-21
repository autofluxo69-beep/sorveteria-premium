const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-beige">
      <div className="container-app py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-dark text-white shrink-0">
          <span className="font-display text-[9px] font-semibold text-center leading-tight">
            Sorveteria
            <br />
            Premium
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Links rápidos">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-[#333333] text-sm font-medium hover:text-accent-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-[#333333]/70 text-xs text-center md:text-right">
          © {new Date().getFullYear()} Sorveteria Premium. Todos os direitos reservados.
          <br />
          Desenvolvido por{' '}
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contato');
            }}
            className="font-semibold hover:text-accent-orange transition-colors"
          >
            [Sua Marca]
          </a>
        </p>
      </div>
    </footer>
  );
}
