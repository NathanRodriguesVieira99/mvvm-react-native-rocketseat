import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from './login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginService } from '@services/login.service';
import { useLoginMutation } from '@shared/mutations/useLogin.mutation';

type useLoginModelProps = {
  loginService: LoginService;
};

export const useLoginModel = ({ loginService }: useLoginModelProps) => {
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutateAsync: userLoginMutation } = useLoginMutation(loginService);

  const onSubmit = handleSubmit(async (data) => {
    const mutationResponse = await userLoginMutation(data);

    console.log(mutationResponse);
  });

  return { control, onSubmit };
};
