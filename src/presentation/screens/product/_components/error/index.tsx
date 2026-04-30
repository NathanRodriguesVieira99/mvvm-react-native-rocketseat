import { Ionicons } from '@expo/vector-icons';
import { Button } from '@presentation/components/button';
import { colors } from '@styles/colors';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export const Error = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Ionicons name="alert-circle" color={colors.danger} size={40} />
      <Text className="mt-5 text-center text-xl text-danger">
        Ocorreu um erro ao buscar os detalhes do produto!
      </Text>

      <Button className="mt-5" onPress={router.back}>
        Voltar
      </Button>
    </View>
  );
};
