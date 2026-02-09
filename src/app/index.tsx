import { useUserStore } from '@shared/store/user.store';
import { Redirect } from 'expo-router';

export default function App() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  if (user && token) {
    return <Redirect href={'/(private)/home'} />;
  }

  return <Redirect href={'/(public)/login'} />;
}
