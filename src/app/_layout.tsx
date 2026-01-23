import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import '../styles/global.css';
import { client } from '../lib/react-query';

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(private)" />
      </Stack>
    </QueryClientProvider>
  );
}
