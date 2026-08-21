import type { IceCreamSize } from './IceCream';

export type PaymentMethod = 'TPA' | 'Transferência' | 'Cash';

export interface CartItem {
  iceCreamId: string;
  name: string;
  size: IceCreamSize;
  sizeLabel: string;
  unitPriceKz: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  reference: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  neighborhood?: string;
}

export interface Order {
  customer: CustomerDetails;
  items: CartItem[];
  totalKz: number;
}
