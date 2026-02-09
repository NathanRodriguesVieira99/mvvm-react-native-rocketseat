import type { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type { useProductCardModel } from './useProductCard.model';
import { RatingCount } from './rating-count';

export const ProductCardView: FC<ReturnType<typeof useProductCardModel>> = ({
  product,
}) => {
  return (
    <TouchableOpacity className="mb-2 mt-5 h-[152px] w-[48%] overflow-hidden rounded-lg bg-white p-1 shadow-sm">
      <View>
        <Image
          source={{ uri: product.photo }}
          className="h-24 w-full rounded-md"
          resizeMode="cover"
        />

        <RatingCount product={product} />
      </View>

      <View className="p-1">
        <Text className="mb-1 text-xs font-semibold" numberOfLines={2}>
          {product.name}
        </Text>
        <View className="flex-row justify-between">
          <Text>R$ {product.value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
