import { Ionicons } from '@expo/vector-icons';
import { BuildImageUrl } from '@helpers/build-image-url';
import { PriceText } from '@presentation/components/price-text';
import type { Product } from '@shared/interfaces/product';
import { colors } from '@styles/colors';
import { router } from 'expo-router';
import type { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ListHeaderProps {
  productDetails: Product;
}

export const ListHeader: FC<ListHeaderProps> = ({ productDetails }) => {
  console.log(productDetails);

  return (
    <>
      <View className="items-start pb-5">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-full flex-row items-center justify-start gap-3"
        >
          <Ionicons size={20} name="arrow-back" color={colors['purple-base']} />
          <Text className="mx-2 text-base font-bold text-purple-base">
            Voltar
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full rounded-lg bg-white shadow-gray-500/30">
        <Image
          source={{ uri: BuildImageUrl(productDetails.photo) }}
          className="h-48 w-full rounded-lg"
        />

        <View className="absolute right-0 top-0 flex-row items-center gap-1.5 rounded-bl-lg rounded-tr-lg bg-blue-light p-1.5">
          <Ionicons size={16} name="star" color={colors['blue-base']} />
          <Text className="text-sm font-bold text-gray-800">
            {productDetails.averageRating.toFixed(1)}
          </Text>
          <Text className="text-sm font-semibold text-gray-400">/ 5</Text>
        </View>
      </View>

      <View className="bg-background py-7">
        <View className="mb-4 max-w-[70%] flex-row items-baseline justify-between">
          <Text className="text-xl font-bold text-gray-800">
            {productDetails.name}
          </Text>
          <View>
            <PriceText
              value={Number(productDetails.value)}
              classNameValue="text-xl font-bold text-gray-800 ml-1"
            />
          </View>
        </View>
        <View className="mb-4 flex-row items-center rounded-lg bg-blue-light p-3">
          <View className="h-9 w-9 items-center justify-center rounded-md bg-blue-base">
            <Ionicons name="trending-up" size={20} color={colors['white']} />
          </View>

          <Text className="ml-5 flex-1 text-sm text-gray-600">
            <Text className="font-bold">{productDetails.views} pessoas </Text>
            viram esse produto nos últimos 7 dias
          </Text>
        </View>
        <View className="mb-4">
          <Text className="text-base leading-6 text-gray-500">
            {productDetails.description}
          </Text>
        </View>

        {(productDetails.width || productDetails.height) && (
          <View className="mb-4">
            {productDetails.width && (
              <Text className="mb-1 text-base text-gray-500">
                <Text className="text-gray-800">Largura: </Text>
                {productDetails.width}
              </Text>
            )}
            {productDetails.height && (
              <Text className="mb-1 text-base text-gray-500">
                <Text className="text-gray-800">Altura: </Text>
                {productDetails.height}
              </Text>
            )}
          </View>
        )}

        <View className="mb-5">
          <Text className="text-base font-bold text-gray-800">Categoria</Text>
          <Text className="py-1.5 text-base text-gray-600">
            {productDetails.category.name}
          </Text>
        </View>

        <View className="flex-row items-center justify-between border-t border-gray-200 py-5">
          <Text className="text-lg font-bold text-gray-800">Avaliações</Text>
          <TouchableOpacity>
            <Text className="text-base font-bold text-purple-base">
              Avaliar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
