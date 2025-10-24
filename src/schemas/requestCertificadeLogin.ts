import z from "zod/v3";

export const RequestCertificadeLoginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido"),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "A senha deve ter no máximo 100 caracteres" }),
});


export type RequestCertificadeLoginSchemaType = z.infer<typeof RequestCertificadeLoginSchema>
