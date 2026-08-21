/**
 * Formata um valor numérico como moeda angolana (Kwanza).
 * Ex: 2500 -> "2.500 Kz"
 */
export function formatKz(value: number): string {
  const formatted = new Intl.NumberFormat('pt-AO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  return `${formatted} Kz`;
}
