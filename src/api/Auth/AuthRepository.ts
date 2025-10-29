import type { SignUpSchemaType } from "@/schemas/SignUp";
import type { ApiAuthResponse } from "../@types";
import type { LoginSchemaType } from "@/schemas/Login";

export interface AuthSignUp extends SignUpSchemaType{
role : string,
}
export interface AuthRepository{
  login : (auth: LoginSchemaType) => Promise<ApiAuthResponse>,
  signUp : (auth : AuthSignUp) => Promise<ApiAuthResponse>
}