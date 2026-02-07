import { HttpClient } from '@api/http-client';
import { HttpMethod } from '@api/http-client.types';
import { useUserStore } from '@shared/store/user.store';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const logout = useUserStore((state) => state.logout);

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
