import { useUserStore } from '@shared/store/user.store';
import { Redirect, Stack } from 'expo-router';

export default function PublicRootLayout() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  if (user && token) {
    return <Redirect href={'/(private)/home'} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
