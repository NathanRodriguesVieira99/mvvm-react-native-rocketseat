import { Text, View } from 'react-native';
import { router } from 'expo-router';
import type { FC } from 'react';
import type { useLoginModel } from './useLogin.model';
import { InputController } from '@presentation/components/input-controller';
import { colors } from '@styles/colors';
import { Button } from '@presentation/components/button';
import { Login } from '.';

export const LoginView: FC<ReturnType<typeof useLoginModel>> = ({
  control,
  onSubmit,
}) => {
  return (
    <Login.KeyboardContainer>
      <View className="flex-1 items-center justify-center px-[40px]">
        <View className="w-full flex-1 items-center justify-center">
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
          <Text className="mb-6 text-base text-gray-300">
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
