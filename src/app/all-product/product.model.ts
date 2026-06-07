export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  oldPrice: number;
  price: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isHot?: boolean;
  discount?: number;
  outOfStock?: boolean;
  sizes?: string[];
}
