import type { LoginSchemaType } from "@/schemas/Login";
import type { AuthRepository } from "./AuthRepository";
import type { ApiAuthResponse, AuthSignUp, CompanySignUp } from "../@types";
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

  public async getProfile() {
    return (await this.httpServiceAuthClient.get<{data: {auth: import('../@types').AuthUserReponse}}>('/auth/me')).data.data.auth;
  }

  public async updateProfile(userId: string, payload: {fullname: string; email: string; phone: string; cpf?: string; birth_date?: string}) {
    return (await this.httpServiceAuthClient.put<{data: {auth: import('../@types').AuthUserReponse}}>(`/auth/${userId}`, payload)).data.data.auth;
  }

  public async uploadAvatar(file: File) {
    const body = new FormData();
    body.append('file', file);
    const response = await this.httpServiceAuthClient.post<{data: {url: string}}>('/upload/avatar', body, {headers: {'Content-Type': 'multipart/form-data'}});
    return response.data.data.url;
  }

  public async changePassword(current_password: string, new_password: string) {
    await this.httpServiceAuthClient.post('/auth/change-password', {current_password, new_password});
  }

  public async forgotPassword(email: string) {
    return (await this.httpServiceAuthClient.post('/auth/forgot-password', {email})).data;
  }

  public async verifyCode(email: string, code: string) {
    return (await this.httpServiceAuthClient.post('/auth/verify-code', {email, code})).data;
  }

  public async resetPassword(email: string, code: string, new_password: string) {
    return (await this.httpServiceAuthClient.post('/auth/reset-password', {email, code, new_password})).data;
  }
}
