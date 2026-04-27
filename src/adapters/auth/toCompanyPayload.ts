import { type SignUpCompanySchemaType } from "@/schemas/SignUp"

export function toCompanyPayload(data: SignUpCompanySchemaType) {
  const { fullname, email, password, cnpj, occupation, organizationName, phone } = data;

  return {
    fullname,
    email,
    password,
    cnpj,
    occupation,
    organizationName,
    ...(phone ? { phone } : {}),
    role: "user" as const,
  }
}