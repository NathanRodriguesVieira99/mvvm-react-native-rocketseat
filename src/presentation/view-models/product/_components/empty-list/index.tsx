import { colors } from '@styles/colors';
import type { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface EmptyListProps {
  isLoadingComments: boolean;
}

export const EmptyList: FC<EmptyListProps> = ({ isLoadingComments }) => {
  if (isLoadingComments)
    return (
      <View className="items-center py-8">
        <ActivityIndicator color={colors['purple-base']} size={'small'} />
        <Text className="mt-2 text-gray-500">Carregando comentários...</Text>
      </View>
    );

  return (
    <View className="items-center py-8">
      <Text className="text-base text-gray-500">
        Ainda não há comentários para este produto
      </Text>
      <Text className="mt-1 text-sm text-gray-400">
        Seja o primeiro a comentar!
      </Text>
    </View>
  );
};
