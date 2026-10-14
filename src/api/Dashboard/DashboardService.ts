import type { AxiosInstance } from 'axios';

export interface DashboardData {
  issued: number;
  pending_delivery: number;
  sent: number;
  participants: number;
  emissions: { month: string; emissions: number }[];
  recent_activities: { id: string; name: string; student: string; issued_at: string }[];
}

export class DashboardService {
  private readonly client: AxiosInstance;
  constructor(client: AxiosInstance) { this.client = client; }

  async get(): Promise<DashboardData> {
    const response = await this.client.get<{ data: DashboardData }>('/dashboard');
    return response.data.data;
  }
}
