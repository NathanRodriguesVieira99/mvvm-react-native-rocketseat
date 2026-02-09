import { Ionicons } from '@expo/vector-icons';
import type { Product } from '@shared/interfaces/product';
import { colors } from '@styles/colors';
import type { FC } from 'react';
import { Text, View } from 'react-native';

interface RatingCountProps {
  product: Product;
}

export const RatingCount: FC<RatingCountProps> = ({ product }) => {
  return (
    <View className="absolute right-0 top-0 flex-row items-center rounded-b-lg rounded-r-none bg-white px-2 py-1">
      <Ionicons name="star" size={12} color={colors['blue-base']} />
      <Text className="ml-1 text-sm font-semibold">{product.ratingCount}</Text>
    </View>
  );
};
