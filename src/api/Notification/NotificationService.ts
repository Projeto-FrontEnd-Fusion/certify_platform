import type { AxiosInstance } from 'axios';
import type { Notification } from '@/types/notification';

type ApiNotification = Omit<Notification, 'createdAt'> & { created_at: string };
export type NotificationPage = {
  items: Notification[];
  total: number;
  unread_count: number;
  page: number;
  total_pages: number;
};

export class NotificationService {
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) { this.client = client; }

  async list(page = 1, limit = 5): Promise<NotificationPage> {
    const response = await this.client.get<{ data: Omit<NotificationPage, 'items'> & { items: ApiNotification[] } }>(
      '/notifications', { params: { page, limit } },
    );
    return {
      ...response.data.data,
      items: response.data.data.items.map(({ created_at, ...item }) => ({ ...item, createdAt: created_at })),
    };
  }

  async markRead(id: string) {
    await this.client.patch(`/notifications/${encodeURIComponent(id)}/read`);
  }

  async markAllRead() {
    await this.client.patch('/notifications/read-all');
  }
}
