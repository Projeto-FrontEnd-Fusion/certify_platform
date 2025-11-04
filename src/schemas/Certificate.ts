import z from "zod/v3";

export const CertificateSchema = z.object({
  fullname: z
    .string()
    .min(6, "O nome completo deve ter no minimo 6 digitos")
    .max(60, "O nome deve ter no maximo 60 caracteres"),
  access_key: z.string().max(5),
  event_id: z.string(),
  status: z.literal("pending").default("pending"),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido"),
});

export type CertificateSchemaType = z.infer<typeof CertificateSchema>;
