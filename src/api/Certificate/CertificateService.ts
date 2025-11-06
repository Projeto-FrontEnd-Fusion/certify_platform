import type { AxiosInstance } from "axios";import type { CertificateResponse } from "../@types";

   
export type status = "pending" | "available" | "expired"

export interface CertificateRequest {
  fullname: string;
  access_key?: string | undefined;
  event_id: string | number;
  status: status;
  email: string;
}


interface CertificateServiceInterface {
  createCertificate(
    userId: string,
    certificate_data: CertificateRequest
  ): Promise<CertificateResponse>;
  findCertificateById(certificateId: string): Promise<CertificateResponse>;

}

export class CertificateService implements CertificateServiceInterface {
  private httpServiceAcessClient: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.httpServiceAcessClient = api;
  }

  public async createCertificate(userId: string, certificate_data: CertificateRequest
  ): Promise<CertificateResponse> {
    const response = await this.httpServiceAcessClient.post(
      `/certificate/${userId}`,certificate_data
    );
    return response.data;
  }

  public async findCertificateById(certificateId: string): Promise<CertificateResponse> {
    const response = await this.httpServiceAcessClient.get(
      `/certificate/${certificateId}`
    );
    return response.data;
  }
}
