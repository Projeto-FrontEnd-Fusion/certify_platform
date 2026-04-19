import { isValidCPF } from "@/utils/validators/isValidCPF";
import z from "zod/v3";

export const SignUpStudentSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(60, { message: "O nome deve ter no máximo 60 caracteres" }),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido"),
  cpf: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((cpf) => cpf.length === 11, {
      message: "CPF deve ter 11 dígitos",
    })
    .refine(isValidCPF, {
      message: "CPF inválido",
    }),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length === 11, {
      message: "Telefone inválido",
    }),
  password: z
    .string()
    .min(10, { message: "A senha deve ter pelo menos 10 caracteres" })
    .max(100, { message: "A senha deve ter no máximo 100 caracteres" }),
  confirmPassword: z
    .string()
    .min(10, { message: "Confirme sua senha" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "A senha não corresponde com a anterior",
    path: ["confirmPassword"],
  });

export const SignUpCompanySchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(60, { message: "O nome deve ter no máximo 60 caracteres" }),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido"),
  organizationName: z.
    string()
    .min(1, "O nome da empresa é obrigatório"),
  cnpj: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((cnpj) => cnpj.length === 14, {
      message: "CNPJ deve ter 14 dígitos",
    }),
  occupation: z
    .string()
    .min(1, "A ocupação é obrigatória"),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length === 11, {
      message: "Telefone inválido",
    }),
  password: z
    .string()
    .min(10, { message: "A senha deve ter pelo menos 10 caracteres" })
    .max(100, { message: "A senha deve ter no máximo 100 caracteres" }),
  confirmPassword: z
    .string()
    .min(10, { message: "Confirme sua senha" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "A senha não corresponde com a anterior",
    path: ["confirmPassword"],
  });

export type SignUpStudentSchemaType = z.infer<typeof SignUpStudentSchema>


export type SignUpCompanySchemaType = z.infer<typeof SignUpCompanySchema>


