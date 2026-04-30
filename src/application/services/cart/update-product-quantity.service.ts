import { removeProductFromListService } from './remove-product-from-list.service';
import { calculateTotalService } from './calculate-total.service';

import type { CartProduct } from '@stores/cart.store';

type UpdateProductQuantityParams = {
  productList: CartProduct[];
  productId: number;
  quantity: number;
};

type UpdateProductQuantityResponse = {
  products: CartProduct[];
  total: number;
};

interface UpdateProductQuantityServiceContract {
  update: (
    params: UpdateProductQuantityParams,
  ) => UpdateProductQuantityResponse;
}

export const UpdateProductQuantityService: UpdateProductQuantityServiceContract =
  {
    update({ productList, productId, quantity }) {
      if (quantity <= 0)
        return removeProductFromListService.remove(productList, productId);

      const products = productList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity };
        } else {
          return product;
        }
      });

      const total = calculateTotalService.calculate(products);

      return { products, total };
    },
  };
