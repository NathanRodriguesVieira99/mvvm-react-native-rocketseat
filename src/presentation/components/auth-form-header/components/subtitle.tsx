import { Text } from 'react-native';

export const Subtitle = ({ subtitle }: { subtitle: string }) => {
  return <Text className="text-base text-gray-300">{subtitle}</Text>;
};
