import { colors } from '@styles/colors';
import type { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface ListFooterProps {
  isLoadingMore: boolean;
}

export const ListFooter: FC<ListFooterProps> = ({ isLoadingMore }) => {
  if (!isLoadingMore) return null;

  return (
    <View className="py-4">
      <ActivityIndicator color={colors['purple-base']} size={'small'} />
    </View>
  );
};
