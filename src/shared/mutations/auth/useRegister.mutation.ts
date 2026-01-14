import { useMutation } from "@tanstack/react-query";
import * as authService from "@services/auth.service";
import type { RegisterHttpParams } from "../../interfaces/http/register";

export const useRegisterMutation = () => {
  const { mutateAsync: userRegisterMutation } = useMutation({
    mutationFn: (body: RegisterHttpParams) => authService.register(body),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { userRegisterMutation };
};
