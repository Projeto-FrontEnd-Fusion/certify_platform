import { type SignUpStudentSchemaType } from "@/schemas/SignUp"

export function toStudentPayload(data: SignUpStudentSchemaType) {
  const { fullname, email, password, cpf, phone } = data;

  return {
    fullname,
    email,
    password,
    cpf,
    ...(phone ? { phone } : {}),
    role: "user" as const,
  }
}