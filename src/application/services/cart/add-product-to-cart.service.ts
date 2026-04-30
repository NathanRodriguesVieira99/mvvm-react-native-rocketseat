import { findExistingProductService } from './find-existing-product.service';
import { calculateTotalService } from './calculate-total.service';

import type {
  CartProduct,
  OmittedCartProductQuantity,
} from '@stores/cart.store';

type AddProductToCartResponse = {
  products: CartProduct[];
  total: number;
};

interface AddProductToCartServiceContract {
  addProductToCart: (
    productList: CartProduct[],
    newProduct: OmittedCartProductQuantity,
  ) => AddProductToCartResponse;
}

export const addProductToCartService: AddProductToCartServiceContract = {
  addProductToCart: (
    productList: CartProduct[],
    newProduct: OmittedCartProductQuantity,
  ) => {
    const existingProduct = findExistingProductService.findExistingProduct(
      productList,
      newProduct.id,
    );

    if (existingProduct) {
      const products = productList.map((product) => {
        if (product.id === newProduct.id) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      });

      const total = calculateTotalService.calculate(products);

      return { products, total };
    }

    const products = [...productList, { ...newProduct, quantity: 1 }];

    const total = calculateTotalService.calculate(products);

    return { products, total };
  },
};
