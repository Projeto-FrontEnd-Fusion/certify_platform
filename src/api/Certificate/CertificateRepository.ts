import type { CertificateRequest, CertificateResponse, CertificateListResponse } from "../@types";

export interface CertificateRepository {
  createCertificate : (userId: string, certificate_data: CertificateRequest) => Promise<CertificateResponse>;
  findCertificateById : (certificateId: string) => Promise<CertificateResponse>;
  listCertificateByUserId : (userId: string) => Promise<CertificateListResponse>;
}