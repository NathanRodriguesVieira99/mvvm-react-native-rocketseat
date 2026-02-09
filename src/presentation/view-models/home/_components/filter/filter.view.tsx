import type { FC } from 'react';
import type { useFilterModel } from './useFilter.model';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@styles/colors';
import { Input } from '@presentation/components/input';
import { Button } from '@presentation/components/button';
import Checkbox from 'expo-checkbox';

export const FilterView: FC<ReturnType<typeof useFilterModel>> = ({
  productsCategories,
  isLoading,
}) => {
  return (
    <View>
      <View className="flex-row items-center justify-between p-4 px-6 pb-8">
        <Text className="text-lg font-bold text-gray-900">
          Filtrar anúncios
        </Text>
        <TouchableOpacity>
          <Ionicons name="close" size={24} color={colors['purple-base']} />
        </TouchableOpacity>
      </View>

      <View className="p-4 px-6">
        <Text className="text-base font-semibold text-gray-300">VALOR</Text>
        <View className="mb-6 w-full flex-row gap-5">
          <View className="flex-1">
            <Input
              placeholder="De"
              keyboardType="numeric"
              containerClassName="w-[90%]"
            />
          </View>
          <View className="flex-1">
            <Input
              placeholder="Até"
              keyboardType="numeric"
              containerClassName="w-[90%]"
            />
          </View>
        </View>

        <Text className="text-base font-semibold text-gray-300">CATEGORIA</Text>

        {isLoading ? (
          <Text>Carregando categorias...</Text>
        ) : (
          <View className="mb-10 mt-5 gap-3">
            {productsCategories?.map(({ name, id }) => (
              <TouchableOpacity
                key={`product-category-${id}`}
                className="flex-row items-center py-2"
              >
                <Checkbox
                  color={colors['purple-base']}
                  className="mr-2 rounded-xl"
                />
                <Text className="text-base text-gray-400">{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="mb-6 mt-4 flex-row gap-3">
          <View className="flex-1">
            <Button variant="outlined">Limpar filtro</Button>
          </View>

          <View className="flex-1">
            <Button>Filtrar</Button>
          </View>
        </View>
      </View>
    </View>
  );
};
