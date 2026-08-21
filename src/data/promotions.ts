import type { Promotion } from '../types/Promotion';

// endsAt: data ISO usada pelo Promotions.tsx para calcular a contagem decrescente.
// Ajuste esta data ao configurar uma promoção real.
export const promotions: Promotion[] = [
  {
    id: 'combo-casal',
    title: 'Combo Casal',
    description:
      '2 sorvetes Grandes à escolha + 1 Petit Gateau no Copo para partilhar, com preço especial só esta semana.',
    discountLabel: '-20%',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
  },
];
