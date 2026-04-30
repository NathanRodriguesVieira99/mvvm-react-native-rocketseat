import type { LoginService } from '@services/auth/login.service';
import type { LoginHttpParams } from '@shared/interfaces/http/login';
import { useUserStore } from '../../store/user.store';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = (loginService: LoginService) => {
  const setSession = useUserStore((state) => state.setSession);

  return useMutation({
    mutationFn: (body: LoginHttpParams) => loginService.exec(body),
    onSuccess: (response) => setSession(response),
    onError: (err) => console.error(err.message),
  });
};
