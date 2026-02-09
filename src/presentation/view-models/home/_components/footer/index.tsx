import { colors } from '@styles/colors';
import type { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface FooterParams {
  isLoading: boolean;
}

export const Footer: FC<FooterParams> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View>
      <ActivityIndicator size={'small'} color={colors['purple-base']} />
    </View>
  );
};
