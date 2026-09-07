import type { ApiAuthResponse } from "../@types";
import type { LoginSchemaType } from "@/schemas/Login";

export interface AuthSignUp {
  fullname: string;
  email: string;
  password: string;
  cpf?: string;
  phone?: string;
  role: string;
}

export interface CompanySignUp extends AuthSignUp {
  razao_social: string;
  cnpj: string;
}

export interface AuthRepository{
  login : (auth: LoginSchemaType) => Promise<ApiAuthResponse>,
  signUp : (auth : AuthSignUp) => Promise<ApiAuthResponse>,
  signUpCompany : (auth : CompanySignUp) => Promise<ApiAuthResponse>,
  logout : (refreshToken: string) => Promise<void>
}
