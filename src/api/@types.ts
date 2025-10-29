import type { LoginSchemaType } from "@/schemas/Login"


export interface AuthUserReponse extends Omit<LoginSchemaType, "password">{
_id : string,
role : "user" | "admin",
created_at : Date,
updated_at : Date
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


export type ApiAuthResponse = SucessResponse | ErrorResponse
