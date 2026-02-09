import type { Product } from '@shared/interfaces/product';

interface useProductCardModelParams {
  product: Product;
}

export const useProductCardModel = ({ product }: useProductCardModelParams) => {
  return { product };
};
