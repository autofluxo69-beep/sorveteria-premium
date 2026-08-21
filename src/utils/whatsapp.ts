import type { CartItem, CustomerDetails } from '../types/Order';
import { formatKz } from './currency';

export const WHATSAPP_NUMBER = '244955241309';

function buildOrderMessage(
  customer: CustomerDetails,
  items: CartItem[],
  totalKz: number
): string {
  const itemLines = items
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} - ${item.sizeLabel} - ${formatKz(
          item.unitPriceKz * item.quantity
        )}`
    )
    .join('\n');

  const fullAddress = [customer.address, customer.neighborhood, customer.reference]
    .filter(Boolean)
    .join(', ');

  return `*NOVO PEDIDO - SORVETERIA PREMIUM*

👤 Cliente: ${customer.name}
📞 Telefone: ${customer.phone}

🍨 *ITENS DO PEDIDO:*
${itemLines}

📝 Observações: ${customer.notes || 'Nenhuma'}
📍 Endereço: ${fullAddress}
💳 Pagamento: ${customer.paymentMethod}

💰 *TOTAL: ${formatKz(totalKz)}*
⏱️ Horário estimado: 30-45 mins`;
}

/**
 * Gera o link do WhatsApp com a mensagem do pedido já formatada e codificada.
 */
export function buildWhatsAppOrderLink(
  customer: CustomerDetails,
  items: CartItem[],
  totalKz: number
): string {
  const message = buildOrderMessage(customer, items, totalKz);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Gera um link genérico do WhatsApp para contacto (fora do fluxo de pedido).
 */
export function buildWhatsAppContactLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
