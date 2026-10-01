import type { AxiosInstance } from "axios";
import type { CertificateRequest, CertificateResponse } from "../@types";
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
}
