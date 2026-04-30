import type { Product } from '@shared/interfaces/product';

interface useProductCardModelParams {
  product: Product;
}

export const useProductCardModel = ({ product }: useProductCardModelParams) => {
  const formatProductName = (name: string) => {
    if (name.length >= 17) {
      return `${name.slice(0, 17)}...`;
    }
    return name;
  };

  const displayProductName = formatProductName(product.name);

  return { product, displayProductName };
};
