import type { AxiosInstance } from "axios";
import type { CertificateRequest, CertificateResponse, CertificateListResponse, CertificateInDb } from "../@types";
import type { CertificateRepository } from "./CertificateRepository";

export class CertificateService implements CertificateRepository {
  private httpServiceAcessClient: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.httpServiceAcessClient = api;
  }

  private normalizeCertificate(certificate: CertificateInDb & {_id?: string}): CertificateInDb {
    return {...certificate, id: certificate.id || certificate._id || ''};
  }

  public async createCertificate(userId: string, certificate_data: CertificateRequest
  ): Promise<CertificateResponse> {
    const response = await this.httpServiceAcessClient.post(
      `/certificate/${userId}`,certificate_data
    );
    response.data.data.certificate = this.normalizeCertificate(response.data.data.certificate);
    return response.data;
  }

  public async findCertificateById(certificateId: string): Promise<CertificateResponse> {
    const response = await this.httpServiceAcessClient.get(
      `/certificate/${certificateId}`
    );
    response.data.data.certificate = this.normalizeCertificate(response.data.data.certificate);
    return response.data;
  }

  public async listCertificateByUserId(userId: string) : Promise<CertificateListResponse> {
    const response = await this.httpServiceAcessClient.get(
      `/certificate/users/${userId}`
    );
    response.data.data.items = response.data.data.items.map((item: CertificateInDb & {_id?: string}) => this.normalizeCertificate(item));
    return response.data;
  }

  public async validateCertificate(access_key: string): Promise<CertificateResponse> {
    const response = await this.httpServiceAcessClient.get(
      `/certificate/validate/${access_key}`
    );
    return response.data;
  }
}
