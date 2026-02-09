import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import '@styles/global.css';
import { client } from '@lib/react-query';
import { Modal } from '@presentation/components/modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastManager from 'toastify-react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={client}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(private)" />
        </Stack>
        <Modal />
        <ToastManager modal={false} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
