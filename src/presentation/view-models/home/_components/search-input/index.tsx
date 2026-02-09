import { Ionicons } from '@expo/vector-icons';
import { Input } from '@presentation/components/input';
import { useBottomSheetStore } from '@shared/store/bottom-sheet.store';
import { colors } from '@styles/colors';
import { Text, TouchableOpacity, View } from 'react-native';
import { Filter } from '../filter';

export const SearchInput = () => {
  const open = useBottomSheetStore((s) => s.open);

  return (
    <View className="mt-8">
      <Text className="text-2xl font-bold">Explore Produtos</Text>
      <View className="flex-row items-end justify-center gap-4">
        <View className="flex-1">
          <Input
            leftIcon="search"
            returnKeyType="search"
            className="flex-1 text-lg"
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            open({ content: <Filter /> });
          }}
          className="mb-4 ml-4 mt-6 size-[48px] items-center justify-center rounded-lg border border-purple-base"
        >
          <Ionicons
            name="filter-outline"
            size={24}
            color={colors['purple-base']}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
