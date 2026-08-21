export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountLabel: string;
  endsAt: string;
}

export interface CarouselSlide {
  id: string;
  index: string;
  total: string;
  title: string;
  subtitle: string;
  image: string;
  ctaLabel: string;
}
