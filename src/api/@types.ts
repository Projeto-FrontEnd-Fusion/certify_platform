import type { LoginSchemaType } from "@/schemas/Login"
import type { CertificateInDb } from "./Certificate/@types"

export type status = "pending" | "available" | "expired";

export interface AuthUserReponse extends Omit<LoginSchemaType, "password">{
_id : string,
role : "user" | "admin",
created_at : Date,
updated_at : Date,
status : status
}

export interface BaseResponse {
  success : boolean,
  message : string,
  details : string | null
}

export interface SucessResponse extends BaseResponse{
  data : {
    auth : AuthUserReponse
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
