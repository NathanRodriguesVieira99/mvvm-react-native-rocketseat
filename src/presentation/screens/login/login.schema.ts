import { z } from 'zod';
import { MIN_PASSWORD_LENGTH } from '@shared/constants/index';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .nonempty({ message: 'Senha é obrigatória' })
    .min(MIN_PASSWORD_LENGTH, {
      message: 'Senha deve ter ao menos 6 caracteres',
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
