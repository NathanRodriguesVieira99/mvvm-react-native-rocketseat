import type { CartProduct } from '@shared/store/cart.store';
import { calculateTotalService } from './calculate-total.service';

type RemoveProductsResult = {
  products: CartProduct[];
  total: number;
};

interface RemoveProductFromListServiceContract {
  remove: (
    productList: CartProduct[],
    productId: number,
  ) => RemoveProductsResult;
}

export const removeProductFromListService: RemoveProductFromListServiceContract =
  {
    remove: (productList: CartProduct[], productId: number) => {
      const products = productList.filter(({ id }) => id !== productId);
      const total = calculateTotalService.calculate(products);

      return { products, total };
    },
  };
