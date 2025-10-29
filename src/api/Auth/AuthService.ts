import type { LoginSchemaType } from "@/schemas/Login";
import type { AuthRepository, AuthSignUp } from "./AuthRepository";
import type { ApiAuthResponse } from "../@types";
import type { AxiosInstance } from "axios";

export class AuthService implements AuthRepository {
  private httpServiceAuthClient: AxiosInstance 
  
  constructor(api: AxiosInstance) {
    this.httpServiceAuthClient = api
  }

  public async signUp(auth: AuthSignUp): Promise<ApiAuthResponse> {
    const signupRes = await this.httpServiceAuthClient.post("/auth/signup", auth)
    console.log("Chamou o meu Serviço de Cadastro")
    return signupRes.data
  }

  public async login(auth: LoginSchemaType): Promise<ApiAuthResponse> {
    const loginRes = await this.httpServiceAuthClient.post("/auth/login", auth)
    console.log("Chamou o meu Serviço de Login")
    return loginRes.data
  }
}