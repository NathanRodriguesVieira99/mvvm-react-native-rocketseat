import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "./register.schema";
import { useUserStore } from "@shared/store/user.store";
import { useMutation } from "@tanstack/react-query";
import type { RegisterServiceContract } from "@services/auth.service";
import type { RegisterHttpParams } from "@shared/interfaces/http/register";

type useRegisterModelProps = {
  registerService: RegisterServiceContract;
};

export const useRegisterModel = ({
  registerService,
}: useRegisterModelProps) => {
  const { setSession } = useUserStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutateAsync: userRegisterMutation } = useMutation({
    mutationFn: (body: RegisterHttpParams) => registerService.exec(body),
    onSuccess: (response) => console.log(response),
    onError: (err) => console.error(err),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { confirm_password, ...registerData } = data;
    const mutationResponse = await userRegisterMutation(registerData);
    reset();

    setSession({
      refreshToken: mutationResponse.refreshToken,
      token: mutationResponse.token,
      user: mutationResponse.user,
    });
  });

  return { register, control, errors, onSubmit };
};
