import { type FC } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { useRegisterModel } from './useRegister.model';
import { InputController } from '@presentation/components/input-controller';
import { router } from 'expo-router';
import { colors } from '@styles/colors';
import { Button } from '@presentation/components/button';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardContainer } from '@presentation/components/keyboard-container';
import { AuthFormHeader } from '@presentation/components/auth-form-header';

export const RegisterView: FC<ReturnType<typeof useRegisterModel>> = ({
  onSubmit,
  control,
  handleSelectAvatar,
  avatarUri,
}) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <AuthFormHeader
          title="Crie sua conta"
          subtitle="Informe os seus dados pessoais e de acesso"
        />
        <TouchableOpacity
          className="mb-8 h-[120px] w-[120px] items-center justify-center self-center rounded-xl bg-shape"
          onPress={handleSelectAvatar}
        >
          {avatarUri ? (
            <Image
              className="h-full w-full rounded-xl"
              resizeMode="cover"
              source={{ uri: avatarUri }}
            />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} />
          )}
        </TouchableOpacity>

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

        <Text className="mt-6 text-base font-bold text-gray-500">Acesso</Text>

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

        <Button className="mt-6" onPress={onSubmit}>
          Registrar
        </Button>

        <View className="mt-16">
          <Text className="mb-6 text-base text-gray-300">
            Já possui uma conta?
          </Text>

          <Button
            variant="outlined"
            onPress={() => router.push('/(public)/login')}
          >
            Login
          </Button>
        </View>
      </ScrollView>
    </KeyboardContainer>
  );
};
