import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { CartItem } from '../types/Order';
import type { IceCream, IceCreamSize } from '../types/IceCream';

interface CartContextValue {
  items: CartItem[];
  isOrderFormOpen: boolean;
  openOrderForm: () => void;
  closeOrderForm: () => void;
  addToCart: (iceCream: IceCream, size: IceCreamSize) => void;
  removeItem: (iceCreamId: string, size: IceCreamSize) => void;
  updateQuantity: (iceCreamId: string, size: IceCreamSize, quantity: number) => void;
  clearCart: () => void;
  totalKz: number;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const openOrderForm = useCallback(() => setIsOrderFormOpen(true), []);
  const closeOrderForm = useCallback(() => setIsOrderFormOpen(false), []);

  const addToCart = useCallback((iceCream: IceCream, size: IceCreamSize) => {
    const pricing = iceCream.sizes.find((s) => s.size === size);
    if (!pricing) return;

    setItems((prev) => {
      const existing = prev.find(
        (item) => item.iceCreamId === iceCream.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.iceCreamId === iceCream.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          iceCreamId: iceCream.id,
          name: iceCream.name,
          size,
          sizeLabel: pricing.label,
          unitPriceKz: pricing.priceKz,
          quantity: 1,
        },
      ];
    });
    setIsOrderFormOpen(true);
  }, []);

  const removeItem = useCallback((iceCreamId: string, size: IceCreamSize) => {
    setItems((prev) =>
      prev.filter((item) => !(item.iceCreamId === iceCreamId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (iceCreamId: string, size: IceCreamSize, quantity: number) => {
      if (quantity <= 0) {
        removeItem(iceCreamId, size);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.iceCreamId === iceCreamId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalKz = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPriceKz * item.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    isOrderFormOpen,
    openOrderForm,
    closeOrderForm,
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,
    totalKz,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return ctx;
}
