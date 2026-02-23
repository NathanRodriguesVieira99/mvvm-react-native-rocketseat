import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface CartActions {
  addItem: (products: Omit<CartProduct, 'quantity'>) => void;
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

      addItem: () => set({}),
      clearCart: () => set({ products: [], total: 0 }),
      getItemCount: () => 0,
      removeProduct: () => set({}),
      updateQuantity: () => set({}),
    }),
    {
      name: 'marketplace-cart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
