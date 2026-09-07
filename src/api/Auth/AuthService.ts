import type { LoginSchemaType } from "@/schemas/Login";
import type { AuthRepository, AuthSignUp, CompanySignUp } from "./AuthRepository";
import type { ApiAuthResponse } from "../@types";
import type { AxiosInstance } from "axios";

export class AuthService implements AuthRepository {
  private httpServiceAuthClient: AxiosInstance 
  
  constructor(api: AxiosInstance) {
    this.httpServiceAuthClient = api
  }

  public async signUp(auth: AuthSignUp): Promise<ApiAuthResponse> {
    const signupRes = await this.httpServiceAuthClient.post("/auth/signup", auth)
    return signupRes.data
  }

  public async signUpCompany(auth: CompanySignUp): Promise<ApiAuthResponse> {
    const signupRes = await this.httpServiceAuthClient.post("/auth/signup/company", auth)
    return signupRes.data
  }

  public async login(auth: LoginSchemaType): Promise<ApiAuthResponse> {
    const loginRes = await this.httpServiceAuthClient.post("/auth/login", auth)
    return loginRes.data
  }

  public async logout(refreshToken: string): Promise<void> {
    await this.httpServiceAuthClient.post("/auth/logout", {
      refresh_token: refreshToken,
    })
  }
}
