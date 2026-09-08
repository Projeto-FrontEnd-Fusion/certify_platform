export type CertificateStatus =
  | "all"
  | "issued"
  | "sent"
  | "draft";

export interface Certificate {
  id: number;
  name: string;
  student: string;
  model: string;
  issuedAt: string;
  status: CertificateStatus;
}

export type CertificateModel =
  | "no-border"
  | "classic"
  | "modern"
  | "ornamental";

export interface CertificateFilters {
  status: CertificateStatus;
  model: CertificateModel | null;
  startDate: string;
  endDate: string;
  student: string;
}