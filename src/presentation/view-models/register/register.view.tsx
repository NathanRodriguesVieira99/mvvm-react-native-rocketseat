import type { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { useRegisterModel } from "./useRegister.model";

export const RegisterView: FC<ReturnType<typeof useRegisterModel>> = ({
  onSubmit,
}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Register</Text>
      <TouchableOpacity onPress={onSubmit}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};
