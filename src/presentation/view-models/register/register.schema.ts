import { z } from "zod";
import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from "@shared/constants/index";

// Zod v4 não está rodando no React Native, foi necessário um downgrade para a v3.23.8

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Nome é obrigatório" })
      .min(MIN_NAME_LENGTH, { message: "Nome deve ter ao menos 4 caracteres" }),
    email: z
      .string()
      .nonempty({ message: "E-mail é obrigatório" })
      .email({ message: "E-mail inválido" }),
    password: z
      .string()
      .nonempty({ message: "Senha é obrigatória" })
      .min(MIN_PASSWORD_LENGTH, {
        message: "Senha deve ter ao menos 6 caracteres",
      }),
    confirm_password: z.string().nonempty({ message: "Senha é obrigatória" }),
    phone: z
      .string()
      .nonempty({ message: "Telefone é obrigatório" })
      .regex(/^\d{11}$/, { message: "Telefone inválido" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
