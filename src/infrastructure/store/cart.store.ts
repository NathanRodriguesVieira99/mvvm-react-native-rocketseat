import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { addProductToCartService } from '@services/cart/add-product-to-cart.service';
import { removeProductFromListService } from '@services/cart/remove-product-from-list.service';
import { UpdateProductQuantityService } from '@services/cart/update-product-quantity.service';
import { GetItemCountService } from '@services/cart/get-item-count.service';

export interface CartProduct {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

interface CartStates {
  products: CartProduct[];
  total: number;
}

export type OmittedCartProductQuantity = Omit<CartProduct, 'quantity'>;

interface CartActions {
  addProduct: (products: OmittedCartProductQuantity) => void;
  removeProduct: (productId: number) => void;
  updateQuantity: (params: { productId: number; quantity: number }) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

type CartStore = CartStates & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      products: [],
      total: 0,

      addProduct: (newProduct) =>
        set((s) =>
          addProductToCartService.addProductToCart(s.products, newProduct),
        ),

      clearCart: () => set({ products: [], total: 0 }),

      getItemCount: () => GetItemCountService.getItemCount(get().products),

      removeProduct: (productId) =>
        set((s) => removeProductFromListService.remove(s.products, productId)),

      updateQuantity: ({ productId, quantity }) =>
        set((s) =>
          UpdateProductQuantityService.update({
            productId,
            quantity,
            productList: s.products,
          }),
        ),
    }),
    {
      name: 'marketplace-cart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
