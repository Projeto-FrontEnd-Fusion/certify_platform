
export type Status = "pending" | "avaliable" | "expired";

export interface CertificateInDb {
  id: string;
  user_id: string;
  access_key: string;
  status: Status;
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

