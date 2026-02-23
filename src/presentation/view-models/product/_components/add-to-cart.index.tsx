import { Button } from '@presentation/components/button';
import { PriceText } from '@presentation/components/price-text';
import type { Product } from '@shared/interfaces/product';
import type { FC } from 'react';
import { View } from 'react-native';

interface AddToCartProps {
  product: Product;
}

export const AddToCart: FC<AddToCartProps> = ({ product }) => {
  return (
    <View className="fixed bottom-0 left-0 right-0 h-24 flex-row items-center bg-white px-6 pb-8">
      <View className="flex-1">
        <PriceText value={Number(product.value)} />
      </View>

      <Button leftIcon="cart-outline" className="w-[120px] gap-2">
        Adicionar
      </Button>
    </View>
  );
};
