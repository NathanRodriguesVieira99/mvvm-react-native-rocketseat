import type {
  CartProduct,
  OmittedCartProductQuantity,
} from '@shared/store/cart.store';
import { findExistingProductService } from './find-existing-product.service';
import { calculateTotalService } from './calculate-total.service';

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
    }

    const products = [...productList, { ...newProduct, quantity: 1 }];

    const total = calculateTotalService.calculate(products);

    return {
      products: products,
      total,
    };
  },
};
