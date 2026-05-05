import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A senha não corresponde com a anterior",
    path: ["confirmPassword"],
  });
