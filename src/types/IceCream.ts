export type IceCreamCategory =
  | 'Clássicos'
  | 'Premium'
  | 'Frutas Tropicais'
  | 'Criações Especiais';

export type IceCreamSize = 'P' | 'M' | 'G';

export interface SizePricing {
  size: IceCreamSize;
  label: string;
  priceKz: number;
}

export interface IceCream {
  id: string;
  name: string;
  description: string;
  category: IceCreamCategory;
  image: string;
  sizes: SizePricing[];
  isSignature?: boolean;
  tags?: string[];
}
