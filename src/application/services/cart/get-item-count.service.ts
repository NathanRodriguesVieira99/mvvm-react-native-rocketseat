import type { CartProduct } from '@stores/cart.store';

interface GetItemCountServiceContract {
  getItemCount: (productList: CartProduct[]) => number;
}

export const GetItemCountService: GetItemCountServiceContract = {
  getItemCount(productList: CartProduct[]) {
    return productList.reduce((acc, product) => acc + product.quantity, 0);
  },
};
