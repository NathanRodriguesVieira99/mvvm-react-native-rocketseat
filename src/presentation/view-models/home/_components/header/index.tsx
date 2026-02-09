import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@shared/store/user.store';
import { colors } from '@styles/colors';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const HomeHeader = () => {
  const user = useUserStore((s) => s.user);

  return (
    <View>
      <TouchableOpacity className="flex-row items-center gap-5">
        <View className="relative">
          {user?.avatarUrl ? (
            <Image
              source={{ uri: user?.avatarUrl }}
              className="size-14 rounded-xl border-shape"
            />
          ) : (
            <View className="pb- size-14 items-center justify-center rounded-xl border-2 border-gray-200 bg-shape">
              <Ionicons name="person" size={24} color={colors.gray[300]} />
            </View>
          )}
        </View>

        <View className="">
          <Text className="text-base font-bold">
            {/* exibe apenas o primeiro nome do usuário */}
            Olá, {user?.name.split(' ')[0] || 'Usuário'}!
          </Text>

          <View className="flex-row items-center gap-2">
            <Text className="font-bold color-purple-base">Ver perfil</Text>
            <Ionicons
              name="arrow-forward-outline"
              color={colors['purple-base']}
              size={20}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
