import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchema } from './register.schema';
import type { RegisterService } from '@services/register.service';
import { useRegisterMutation } from '@shared/mutations/useRegister.mutation';
import { useUserStore } from '@shared/store/user.store';

type useRegisterModelProps = {
  registerService: RegisterService;
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
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
    },
  });

  const { mutateAsync: userRegisterMutation } =
    useRegisterMutation(registerService);

  const onSubmit = handleSubmit(async (data) => {
    const { confirm_password, ...registerData } = data;
    const mutationResponse = await userRegisterMutation(registerData);

    setSession({
      refreshToken: mutationResponse.refreshToken,
      token: mutationResponse.token,
      user: mutationResponse.user,
    });
  });

  return { register, control, errors, onSubmit };
};
