import type { AxiosInstance } from "axios";
import type { CertificateSchemaType } from "@/schemas/Certificate";
import type { ApiResponse } from "@/schemas/CertificateResponse";

export class CertificateService {
  private httpServiceAcessClient: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.httpServiceAcessClient = api;
  }

  public async Acess(
    body: CertificateSchemaType,
    userId: string
  ): Promise<ApiResponse> {
    const response = await this.httpServiceAcessClient.post(
      `/certificate/${userId}`,
      body
    );
    return response.data;
  }
}
