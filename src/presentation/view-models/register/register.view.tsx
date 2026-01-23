import { type FC } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import type { useRegisterModel } from './useRegister.model';
import { InputController } from '../../components/input-controller';
import { AuthFormHeader } from '../../components/auth-form-header';
import { router } from 'expo-router';
import { KeyboardContainer } from '../../components/keyboard-container';
import { colors } from '../../../styles/colors';

export const RegisterView: FC<ReturnType<typeof useRegisterModel>> = ({
  onSubmit,
  control,
}) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <AuthFormHeader
          title="Crie sua conta"
          subtitle="Informe os seus dados pessoais e de acesso"
        />

        <InputController
          name="name"
          label="NOME"
          control={control}
          leftIcon="person-outline"
          placeholder="Seu nome completo"
          placeholderTextColor={colors.gray[200]}
        />

        <InputController
          name="phone"
          label="TELEFONE"
          control={control}
          leftIcon="call-outline"
          placeholder="(00) 00000-0000"
          placeholderTextColor={colors.gray[200]}
        />

        <Text className="text-base mt-6 font-bold text-gray-500">Acesso</Text>

        <InputController
          name="email"
          label="E-MAIL"
          control={control}
          leftIcon="mail-outline"
          placeholder="mail@example.com.br"
          placeholderTextColor={colors.gray[200]}
        />

        <InputController
          name="password"
          label="SENHA"
          control={control}
          leftIcon="lock-closed-outline"
          placeholder="Sua senha"
          placeholderTextColor={colors.gray[200]}
          secureTextEntry
        />

        <InputController
          name="confirm_password"
          label="CONFIRMAR SENHA"
          control={control}
          leftIcon="lock-closed-outline"
          placeholder="Confirme a senha"
          placeholderTextColor={colors.gray[200]}
          secureTextEntry
        />

        <TouchableOpacity onPress={onSubmit}>
          <Text>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('login')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardContainer>
  );
};
