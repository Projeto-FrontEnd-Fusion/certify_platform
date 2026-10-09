import { z } from 'zod/v3';
export const ForgotPasswordSchema = z.object({identifier: z.string().trim().email('Informe um e-mail válido')});
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
