import type { Product } from '@shared/interfaces/product';
import type { FC } from 'react';
import { ProductCardView } from './product-card.view';
import { useProductCardModel } from './useProductCard.model';

interface ProductCardParams {
  product: Product;
}

export const ProductCard: FC<ProductCardParams> = (props) => {
  const model = useProductCardModel(props);

  return <ProductCardView {...model} />;
};
