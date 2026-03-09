import type { CartProduct } from '@shared/store/cart.store';

interface FindExistingProductService {
  findExistingProduct: (
    productList: CartProduct[],
    productId: number,
  ) => boolean;
}

export const findExistingProductService: FindExistingProductService = {
  findExistingProduct: (productList: CartProduct[], productId: number) =>
    productList.some(({ id }) => id === productId),
};
