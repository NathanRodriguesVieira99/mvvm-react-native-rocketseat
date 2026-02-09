import { Text } from 'react-native';

export const Title = ({ title }: { title: string }) => {
  return (
    <Text className="mb-3 text-center text-3xl font-bold text-gray-500">
      {title}
    </Text>
  );
};
