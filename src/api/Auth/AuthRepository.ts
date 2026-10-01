import type { ApiAuthResponse, AuthSignUp, CompanySignUp } from "../@types";
import type { LoginSchemaType } from "@/schemas/Login";

export interface AuthRepository{
  login : (auth: LoginSchemaType) => Promise<ApiAuthResponse>,
  signUp : (auth : AuthSignUp) => Promise<ApiAuthResponse>,
  signUpCompany : (auth : CompanySignUp) => Promise<ApiAuthResponse>,
  logout : (refreshToken: string) => Promise<void>
}
