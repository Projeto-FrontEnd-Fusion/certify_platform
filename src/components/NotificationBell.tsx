import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiBellOn } from 'react-icons/ci';
import NotificationsModal from './modals/NotificacaoModal';
import { useNotifications } from '@/hooks/useNotifications';

export function NotificationBell({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const query = useNotifications();
  const close = useCallback(() => setOpen(false), []);
  const unread = query.data?.unread_count ?? 0;

  return (
    <div className="relative">
      <button
        ref={bellRef}
        type="button"
        onClick={() => { setOpen(current => !current); if (!open) void query.refetch(); }}
        aria-label={`Notificações${unread ? `, ${unread} não lidas` : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? 'notifications-modal' : undefined}
        className={`relative p-2 rounded-full ${dark ? 'border border-white/10 text-white' : 'text-black/45'}`}
      >
        <CiBellOn className="w-5 h-5" />
        {unread > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1 text-[10px] text-white">{unread > 99 ? '99+' : unread}</span>}
      </button>
      <NotificationsModal
        open={open} onClose={close} bellRef={bellRef}
        notifications={query.data?.items ?? []} unreadCount={unread}
        loading={query.isPending} error={query.isError}
        onRetry={() => { void query.refetch(); }} onNavigate={navigate}
        onMarkRead={query.markRead} onMarkAllRead={query.markAllRead}
      />
    </div>
  );
}
