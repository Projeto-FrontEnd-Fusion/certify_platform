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

export interface AuthRepository{
  login : (auth: LoginSchemaType) => Promise<ApiAuthResponse>,
  signUp : (auth : AuthSignUp) => Promise<ApiAuthResponse>
}