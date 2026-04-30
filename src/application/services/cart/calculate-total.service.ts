import type { CartProduct } from '@stores/cart.store';

interface CalculateTotalServiceContract {
  calculate: (productList: CartProduct[]) => number;
}

export const calculateTotalService: CalculateTotalServiceContract = {
  calculate: (productList: CartProduct[]) => {
    return productList.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  },
};
