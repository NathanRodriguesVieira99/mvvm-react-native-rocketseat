import type { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@styles/colors';
import { Input } from '@presentation/components/input';
import { Filter } from '../filter';
import { useBottomSheetStore } from '@shared/store/bottom-sheet.store';

interface SearchInputProps {
  setSearchInputText: (text: string) => void;
  value: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  setSearchInputText,
  value,
}) => {
  const open = useBottomSheetStore((s) => s.open);

  return (
    <View className="mt-8">
      <Text className="text-2xl font-bold">Explore Produtos</Text>
      <View className="flex-row items-end justify-center gap-4">
        <View className="flex-1">
          <Input
            placeholder="Pesquisar"
            onChangeText={setSearchInputText}
            value={value}
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
