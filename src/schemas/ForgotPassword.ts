import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  identifier: z.string().min(1, 'Campo obrigatório').refine(val => {
    // Regex for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex for CPF (with or without mask)
    const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
    // Regex for CNPJ (with or without mask)
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/;
    
    return emailRegex.test(val) || cpfRegex.test(val) || cnpjRegex.test(val);
  }, 'Formato inválido (E-mail, CPF ou CNPJ)'),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
