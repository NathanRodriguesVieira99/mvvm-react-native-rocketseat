import type { RegisterService } from '@services/register.service';
import type { RegisterHttpParams } from '@shared/interfaces/http/register';
import { useMutation } from '@tanstack/react-query';

export const useRegisterMutation = (registerService: RegisterService) => {
  return useMutation({
    mutationFn: (body: RegisterHttpParams) => registerService.exec(body),
    onSuccess: (response) => console.log(response),
    onError: (err) => console.error(err),
  });
};
