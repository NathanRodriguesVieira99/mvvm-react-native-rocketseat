import { Text, View } from 'react-native';
import { router } from 'expo-router';
import type { FC } from 'react';
import type { useLoginModel } from './useLogin.model';
import { InputController } from '../../components/input-controller';
import { colors } from '../../../styles/colors';
import { Button } from '../../components/button';
import { Login } from '.';

export const LoginView: FC<ReturnType<typeof useLoginModel>> = ({
  control,
  onSubmit,
}) => {
  return (
    <Login.KeyboardContainer>
      <View className="flex-1 px-[40px] items-center justify-center">
        <View className="flex-1 w-full items-center justify-center">
          <Login.Header
            title="Acesse sua conta"
            subtitle="Informe seu e-mail e senha para entrar"
          />

          <InputController
            control={control}
            name="email"
            label="E-MAIL"
            leftIcon="mail-outline"
            placeholder="email@example.com.br"
            placeholderTextColor={colors.gray[200]}
          />

          <InputController
            control={control}
            name="password"
            label="SENHA"
            leftIcon="lock-closed-outline"
            placeholder="Sua senha"
            secureTextEntry
            placeholderTextColor={colors.gray[200]}
          />

          <Button
            className="mt-6"
            variant="filled"
            rightIcon="arrow-forward"
            onPress={onSubmit}
          >
            Acessar
          </Button>
        </View>

        <View className="flex-2 pb-16">
          <Text className="text-base text-gray-300 mb-6">
            Ainda não tem uma conta?
          </Text>
          <Button
            variant="outlined"
            rightIcon="arrow-forward"
            onPress={() => router.push('/(public)/register')}
          >
            Registrar
          </Button>
        </View>
      </View>
    </Login.KeyboardContainer>
  );
};
