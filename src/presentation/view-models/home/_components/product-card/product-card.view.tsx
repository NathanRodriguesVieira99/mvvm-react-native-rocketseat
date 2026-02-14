import type { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type { useProductCardModel } from './useProductCard.model';
import { RatingCount } from '../rating-count';
import { PriceText } from '@presentation/components/price-text';
import { router } from 'expo-router';

export const ProductCardView: FC<ReturnType<typeof useProductCardModel>> = ({
  product,
  displayProductName,
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${product.id}`)}
      className="mb-2 mt-5 h-[152px] w-[48%] overflow-hidden rounded-lg bg-white p-1 shadow-sm"
    >
      <View>
        <Image
          source={{ uri: product.photo }}
          className="h-24 w-full rounded-md"
          resizeMode="cover"
        />

        <RatingCount product={product} />
      </View>

      <View className="p-1">
        <Text className="mb-1 text-sm font-semibold" numberOfLines={2}>
          {displayProductName}
        </Text>

        <View className="flex-row items-center justify-between">
          <PriceText
            value={Number(product.value)}
            classNameCurrency="text-sm font-semibold"
            classNameValue="font-bold text-lg flex-1"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
