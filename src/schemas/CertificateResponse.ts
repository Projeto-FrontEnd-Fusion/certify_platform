export interface CertificateResponse {
  status: "pending" | "available";
  access_key?: string | null;
  email: string | null;
  description: string | null;
  event_date: string | null;
  event_end: string | null;
  event_name: string | null;
  event_start: string | null;
  institution_name: string | null;
  workload: string | null;
  participant_name: string | null;
  participant_email: string | null;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  details: string | null;
  data: {
    certificate: CertificateResponse;
  };
}
