import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "./register.schema";
import { useRegisterMutation } from "@shared/mutations/auth/useRegister.mutation";
import { useUserStore } from "@shared/store/user.store";

export const useRegisterModel = () => {
  const { userRegisterMutation } = useRegisterMutation();
  const { setSession, user } = useUserStore();

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
