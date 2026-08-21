import { useState, type FormEvent } from 'react';
import { X, Minus, Plus, Trash2, Loader2, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatKz } from '../utils/currency';
import { validateCustomerDetails, hasErrors } from '../utils/validation';
import { buildWhatsAppOrderLink } from '../utils/whatsapp';
import type { CustomerDetails, FormErrors, PaymentMethod } from '../types/Order';

const PAYMENT_METHODS: PaymentMethod[] = ['TPA', 'Transferência', 'Cash'];

const emptyCustomer: CustomerDetails = {
  name: '',
  phone: '',
  address: '',
  neighborhood: '',
  reference: '',
  notes: '',
  paymentMethod: 'TPA',
};

export default function OrderForm() {
  const { items, isOrderFormOpen, closeOrderForm, updateQuantity, removeItem, clearCart, totalKz } =
    useCart();
  const [customer, setCustomer] = useState<CustomerDetails>(emptyCustomer);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOrderFormOpen) return null;

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    closeOrderForm();
    setStatus('idle');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    const validationErrors = validateCustomerDetails(customer);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setStatus('loading');

    // Simula o envio antes de abrir o WhatsApp, para dar feedback visual claro
    setTimeout(() => {
      const link = buildWhatsAppOrderLink(customer, items, totalKz);
      window.open(link, '_blank', 'noopener,noreferrer');
      setStatus('success');
      clearCart();
      setCustomer(emptyCustomer);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-primary-dark border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-soft">
        <div className="sticky top-0 bg-primary-dark/95 backdrop-blur border-b border-white/10 px-6 py-5 flex items-center justify-between z-10">
          <h2 className="text-white font-display font-bold text-xl">O Seu Pedido</h2>
          <button onClick={handleClose} className="text-white/60 hover:text-white" aria-label="Fechar">
            <X size={24} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-6 py-16 flex flex-col items-center text-center gap-4">
            <CheckCircle2 size={56} className="text-success-green" />
            <h3 className="text-white font-display font-bold text-2xl">Pedido enviado!</h3>
            <p className="text-text-gray max-w-sm">
              Abrimos o WhatsApp com o resumo do seu pedido. Confirme o envio por lá para
              finalizarmos a preparação.
            </p>
            <button onClick={handleClose} className="btn-solid mt-2">
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6">
            {/* Resumo do carrinho */}
            <div className="mb-8">
              <h3 className="text-white/70 text-xs font-bold tracking-wide uppercase mb-3">
                Itens
              </h3>
              {items.length === 0 ? (
                <p className="text-text-gray text-sm">
                  O seu carrinho está vazio. Adicione sorvetes no cardápio para continuar.
                </p>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={`${item.iceCreamId}-${item.size}`}
                      className="flex items-center justify-between gap-3 bg-white/5 rounded-2xl px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-text-gray text-xs">{item.sizeLabel}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.iceCreamId, item.size, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-white/20 text-white flex items-center justify-center hover:border-white/50"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.iceCreamId, item.size, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-white/20 text-white flex items-center justify-center hover:border-white/50"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={14} />
                        </button>
                        <span className="text-accent-orange text-sm font-bold w-20 text-right">
                          {formatKz(item.unitPriceKz * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.iceCreamId, item.size)}
                          className="text-white/40 hover:text-red-400"
                          aria-label="Remover item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {items.length > 0 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-accent-orange font-display font-bold text-xl">
                    {formatKz(totalKz)}
                  </span>
                </div>
              )}
            </div>

            {/* Dados do cliente */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="sm:col-span-2">
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-accent-orange outline-none"
                  placeholder="Ex: Maria João"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-accent-orange outline-none"
                  placeholder="9XX XXX XXX"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  Rua / Avenida
                </label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-accent-orange outline-none"
                  placeholder="Ex: Rua da Missão, nº 12"
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">Bairro</label>
                <input
                  type="text"
                  value={customer.neighborhood}
                  onChange={(e) => handleChange('neighborhood', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-accent-orange outline-none"
                  placeholder="Ex: Talatona"
                />
                {errors.neighborhood && (
                  <p className="text-red-400 text-xs mt-1">{errors.neighborhood}</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  Ponto de Referência
                </label>
                <input
                  type="text"
                  value={customer.reference}
                  onChange={(e) => handleChange('reference', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-accent-orange outline-none"
                  placeholder="Ex: perto do mercado"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  Observações Especiais
                </label>
                <textarea
                  value={customer.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-accent-orange outline-none resize-none"
                  placeholder="Ex: sem cobertura de chocolate"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 text-xs font-semibold mb-2">
                  Forma de Pagamento
                </label>
                <div className="flex gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => handleChange('paymentMethod', method)}
                      className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors duration-200 ${
                        customer.paymentMethod === method
                          ? 'bg-accent-orange text-primary-dark border-accent-orange'
                          : 'border-white/15 text-white/70 hover:border-white/40'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={items.length === 0 || status === 'loading'}
              className="btn-solid w-full mt-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  A enviar pedido...
                </>
              ) : (
                'CONFIRMAR PEDIDO'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
