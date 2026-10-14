import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';
import type { Notification } from '@/types/notification';

export function CompanyNotifications() {
  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const query = useNotifications(page, 20);
  const navigate = useNavigate();

  async function read(notification?: Notification) {
    if (saving) return;
    setSaving(true);
    setSaveError(false);
    try {
      if (notification) {
        if (!notification.read) await query.markRead(notification.id);
        if (notification.href?.startsWith('/') && !notification.href.startsWith('//')) navigate(notification.href);
      } else await query.markAllRead();
    } catch { setSaveError(true); }
    finally { setSaving(false); }
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Notificações</h1>
      <button type="button" className="my-4 text-[#0069A8] disabled:opacity-50" disabled={saving || query.isPending || query.isError || !query.data?.unread_count} onClick={() => { void read(); }}>Marcar todas como lidas</button>
      {saveError && <p role="alert">Não foi possível salvar as alterações.</p>}
      {query.isPending ? <p role="status">Carregando notificações...</p> : query.isError ? (
        <div role="alert"><p>Não foi possível carregar as notificações.</p><button type="button" onClick={() => { void query.refetch(); }}>Tentar novamente</button></div>
      ) : !query.data?.items.length ? <p>Você não tem notificações</p> : (
        <ul className="space-y-3">{query.data.items.map(item => <li key={item.id}>
          <button type="button" disabled={saving} onClick={() => { void read(item); }} className={`w-full rounded-xl border p-4 text-left ${item.severity === 'critical' ? 'bg-red-50 border-red-300' : item.severity === 'warning' ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-300'}`}>
            <span className="block font-bold">{item.title}</span>
            <span className="block">{item.description}</span>
            <time dateTime={item.createdAt} className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString('pt-BR')}</time>
            <span className="ml-3 text-xs">{item.read ? 'Lida' : 'Não lida'}</span>
          </button>
        </li>)}</ul>
      )}
      {!!query.data?.total_pages && <nav aria-label="Paginação de notificações" className="mt-4 flex justify-between gap-3">
        <button type="button" disabled={page === 1 || query.isFetching || saving} onClick={() => setPage(current => current - 1)}>Anterior</button>
        <span>Página {page} de {query.data.total_pages}</span>
        <button type="button" disabled={page >= query.data.total_pages || query.isFetching || saving} onClick={() => setPage(current => current + 1)}>Próxima</button>
      </nav>}
    </section>
  );
}
