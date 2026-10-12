export type NotificationType =
  | "maintenance"
  | "instability"
  | "student"
  | "certificate"
  | "model";

export type NotificationSeverity = "critical" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  href?: string | null;
}