import type { CertificateInDb } from "./Certificate/@types"

export type status = "pending" | "available" | "expired";

export interface AuthUserReponse {
  _id: string;
  fullname?: string;
  razao_social?: string;
  email: string;
  role: "user" | "admin" | "empresa";
  created_at?: string;
  updated_at?: string;
  status?: status;
}

export interface BaseResponse {
  success : boolean,
  message : string,
  details : string | null
}

export interface SucessResponse extends BaseResponse{
  data : {
    auth : AuthUserReponse,
    access_token?: string,
    refresh_token?: string,
    token_type?: string
  }
}

export interface ErrorResponse extends BaseResponse {
  error_code ?: string | null
}


export interface CertificateResponse extends BaseResponse{
  data : {
    certificate : CertificateInDb
  }
}


export type ApiAuthResponse = SucessResponse | ErrorResponse | CertificateResponse
