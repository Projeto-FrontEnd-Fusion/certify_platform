import { useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationServiceInstance } from '@/api/implements';
import { useAuthStoreData } from '@/stores/useAuthStore';

export function useNotifications(page = 1, limit = 5) {
  const { auth } = useAuthStoreData();
  const client = useQueryClient();
  const key = ['company-notifications', auth?._id];
  const query = useQuery({
    queryKey: [...key, page, limit],
    queryFn: () => notificationServiceInstance.list(page, limit),
    enabled: !!auth?._id && ['empresa', 'admin'].includes(auth.role),
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: false,
  });

  async function markRead(id: string) {
    await notificationServiceInstance.markRead(id);
    await client.invalidateQueries({ queryKey: key });
  }

  async function markAllRead() {
    await notificationServiceInstance.markAllRead();
    await client.invalidateQueries({ queryKey: key });
  }

  return { ...query, markRead, markAllRead };
}
