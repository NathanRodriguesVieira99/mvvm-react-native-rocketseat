import { BottomSheetTemplate } from '@presentation/components/bottom-sheet';
import { useUserStore } from '@shared/store/user.store';
import { Redirect, Stack } from 'expo-router';

export default function PrivateRootLayout() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  if (!user || !token) {
    return <Redirect href={'/(public)/login'} />;
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <BottomSheetTemplate />
    </>
  );
}
