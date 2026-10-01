
export type status = "pending" | "available" | "expired";

/**
 * =========================================
 * Auth
 * =========================================
 */

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

/**
 * =========================================
 * Certificate
 * =========================================
 */

export interface CertificateInDb {
  id: string;
  user_id: string;
  access_key: string;
  status: status;
  participant_name: string;
  participant_email: string;
  institution_name: string;
  event_id: string;
  event_name: string;
  description: string;
  workload: string;
  event_start?: Date | null;
  event_end?: Date | null;
  event_date?: Date | null;
  issued_at?: Date | null;
  valid_until: Date;
}

export interface CertificateRequest {
  fullname: string;
  access_key?: string | undefined;
  event_id: string | number;
  status: status;
  email: string;
}

export interface CertificateResponse extends BaseResponse{
  data : {
    certificate : CertificateInDb
  }
}

/**
 * =========================================
 * Base Response
 * =========================================
 */

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




export type ApiAuthResponse = SucessResponse | ErrorResponse | CertificateResponse
