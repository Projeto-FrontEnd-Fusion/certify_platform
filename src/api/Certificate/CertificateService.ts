import type { AxiosInstance } from "axios";
import type { CertificateRequest, CertificateResponse, CertificateListResponse } from "../@types";
import type { CertificateRepository } from "./CertificateRepository";

export class CertificateService implements CertificateRepository {
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

  public async listCertificateByUserId(userId: string) : Promise<CertificateListResponse> {
    const response = await this.httpServiceAcessClient.get(
      `/certificate/users/${userId}`
    );
    return response.data;
  }

  public async validateCertificate(access_key: string): Promise<CertificateResponse> {
    const response = await this.httpServiceAcessClient.get(
      `/certificate/validate/${access_key}`
    );
    return response.data;
  }
}
