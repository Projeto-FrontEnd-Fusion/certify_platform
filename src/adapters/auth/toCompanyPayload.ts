import { type SignUpCompanySchemaType } from "@/schemas/SignUp"

export function toCompanyPayload(data: SignUpCompanySchemaType) {
  const { fullname, email, password, cnpj, razao_social, phone } = data;

  return {
    razao_social,
    fullname,
    email,
    password,
    cnpj,
    ...(phone ? { phone } : {}),
    role: "empresa" as const,
  }
}
