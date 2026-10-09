import type { AxiosInstance } from "axios";
import type { CertificateRequest, CertificateResponse, CertificateListResponse, CertificateInDb } from "../@types";
import type { CertificateRepository } from "./CertificateRepository";
import type { PublicCertificate } from '@/lib/certificate-display';
import type { CertificateFormData } from '@/schemas/CertificateSchema';

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
      `/certificate/validate/${encodeURIComponent(access_key)}`
    );
    return response.data;
  }

  public async validatePublicCertificate(key: string): Promise<PublicCertificate> {
    const response = await this.httpServiceAcessClient.get(`/certificate/validate/${encodeURIComponent(key)}`);
    return response.data.data.certificate;
  }

  public async listByIssuer(issuerId: string, page = 1, eventId?: string): Promise<CertificateListResponse> {
    const response = await this.httpServiceAcessClient.get(`/certificate/issuer/${issuerId}`, {params: {page, limit: 100, event_id: eventId}});
    response.data.data.items = response.data.data.items.map((item: CertificateInDb & {_id?: string}) => this.normalizeCertificate(item));
    return response.data;
  }

  public async sendLinks(certificateIds: string[]): Promise<{total: number; sent: number; failed: number; pending: number}> {
    const response = await this.httpServiceAcessClient.post('/certificate/send-links', {certificate_ids: certificateIds}, {timeout: 0});
    return response.data.data;
  }

  public async createEvent(data: CertificateFormData, institution: string): Promise<string> {
    const response = await this.httpServiceAcessClient.post('/events', {
      name: data.activityName, institution, workload: Number(data.workload), description: data.description,
      start_date: `${data.startDate}T00:00:00Z`, end_date: `${data.endDate}T00:00:00Z`,
      design: {variant: data.variant, logo: data.logo, signature: data.signature,
        modality: data.modalityEnabled ? data.modality : undefined, syllabus: data.syllabusEnabled ? data.syllabus : undefined,
        validity: data.validityEnabled ? data.validity : 'Sem validade'},
    });
    return response.data.data.event.id || response.data.data.event._id;
  }

  public async issueBatch(eventId: string, participants: CertificateFormData['participants']) {
    const response = await this.httpServiceAcessClient.post('/certificate/batch', {
      event_id: eventId, notify_students: false,
      participants: participants.map(({name, email}) => ({fullname: name, email})),
    });
    return response.data.data as {criados: number; duplicados_ignorados: number; erros: number};
  }
}
