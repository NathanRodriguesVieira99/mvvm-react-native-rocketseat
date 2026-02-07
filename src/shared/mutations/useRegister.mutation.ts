import type { RegisterService } from '@services/register.service';
import type { RegisterHttpParams } from '@shared/interfaces/http/register';
import { useUserStore } from '@shared/store/user.store';
import { useMutation } from '@tanstack/react-query';

interface useRegisterMutationParams {
  onSuccess?: () => void;
  registerService: RegisterService;
}

export const useRegisterMutation = ({
  onSuccess,
  registerService,
}: useRegisterMutationParams) => {
  const setSession = useUserStore((state) => state.setSession);

  return useMutation({
    mutationFn: (body: RegisterHttpParams) => registerService.exec(body),
    onSuccess: (response) => {
      setSession({
        refreshToken: response.refreshToken,
        token: response.token,
        user: response.user,
      });
      onSuccess?.();
    },
    onError: (err) => console.error(err),
  });
};
