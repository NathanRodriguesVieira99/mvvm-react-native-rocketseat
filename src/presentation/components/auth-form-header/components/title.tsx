import { Text } from 'react-native';

export const Title = ({ title }: { title: string }) => {
  return (
    <Text className="text-3xl font-bold mb-3 text-center text-gray-500">
      {title}
    </Text>
  );
};
