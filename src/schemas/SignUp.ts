import z from "zod/v3";

export const SignUpSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(60, { message: "O nome deve ter no máximo 60 caracteres" }),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido"),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "A senha deve ter no máximo 100 caracteres" }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>
