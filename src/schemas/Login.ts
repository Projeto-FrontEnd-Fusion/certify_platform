import z from "zod/v3";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("E-mail ou senha inválidos."),
  password: z
    .string()
    .min(6, { message: "E-mail ou senha inválidos." })
    .max(100, { message: "E-mail ou senha inválidos." }),
});


export type LoginSchemaType = z.infer<typeof LoginSchema>;
