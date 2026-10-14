import { useEffect, useRef, useState } from "react";
import type { Notification } from "../../types/notification";

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  unreadCount: number;
  onMarkRead: (id: string) => Promise<void>;
  onMarkAllRead: () => Promise<void>;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  onNavigate: (path: string) => void;
  bellRef: React.RefObject<HTMLButtonElement | null>;
}

const iconByType: Record<Notification["type"], string> = {
  maintenance: "⚙",
  instability: "⚠",
  student: "♙",
  certificate: "✓",
  model: "▤",
};

const formatRelativeDate = (createdAt: string) => {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return "";

  const diff = Math.max(0, Date.now() - date.getTime());
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "agora mesmo";
  if (minutes < 60) return `Há ${minutes} min`;
  if (hours < 24) return `Há ${hours} h`;
  if (days === 1) return "Ontem";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

function NotificationItem({
  notification,
  onClick,
  busy,
}: {
  notification: Notification;
  onClick: (notification: Notification) => void;
  busy: boolean;
}) {
  const critical = notification.severity === "critical";
  const warning = notification.severity === "warning";

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => onClick(notification)}
      aria-label={`${notification.title}. ${
        notification.read ? "Lida" : "Não lida"
      }. ${notification.description}`}
      className={`flex w-full gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0069A8] focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-wait ${
        critical
          ? "border-red-300 bg-red-50 hover:bg-red-100"
          : "border-[#D1D5DB] bg-white hover:bg-[#F4F5F9]"
      }`}
    >
      <div
        aria-hidden="true"
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
          critical
            ? "bg-red-100 text-red-600"
            : warning
              ? "bg-amber-100 text-amber-600"
              : "bg-[#F0F8FC] text-[#0069A8]"
        }`}
      >
        {iconByType[notification.type]}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold leading-5 text-[#1A1551]">
            {notification.title}
          </h3>

          <time
            dateTime={notification.createdAt}
            className="shrink-0 text-[11px] text-gray-500"
          >
            {formatRelativeDate(notification.createdAt)}
          </time>
        </div>

        <p
          title={notification.description}
          className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500"
        >
          {notification.description}
        </p>

        {!notification.read && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0069A8]">
              Não lida
            </span>

            <span
              aria-hidden="true"
              className={`h-2 w-2 shrink-0 rounded-full ${
                critical ? "bg-red-500" : "bg-[#0069A8]"
              }`}
            />
          </div>
        )}

        {notification.read && (
          <span className="sr-only">Notificação lida</span>
        )}
      </div>
    </button>
  );
}

function NotificationSkeleton() {
  return (
    <div className="flex h-[112px] animate-pulse gap-3 rounded-xl border border-[#D1D5DB] p-4">
      <div className="h-10 w-10 shrink-0 rounded-full bg-[#F4F5F9]" />

      <div className="flex-1 space-y-3">
        <div className="h-3 w-3/4 rounded bg-[#F4F5F9]" />
        <div className="h-3 w-full rounded bg-[#F4F5F9]" />
        <div className="h-3 w-2/3 rounded bg-[#F4F5F9]" />
      </div>
    </div>
  );
}

export default function NotificationsModal({
  open,
  onClose,
  notifications,
  unreadCount,
  onMarkRead,
  onMarkAllRead,
  loading = false,
  error = false,
  onRetry,
  onNavigate,
  bellRef,
}: NotificationsModalProps) {
  const modalRef = useRef<HTMLElement>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState(false);

  const sortedNotifications = [...notifications]
    .sort((a, b) => {
      const aPriority =
        !a.read ? a.severity === "critical" ? 2 : a.severity === "warning" ? 1 : 0 : 0;
      const bPriority =
        !b.read ? b.severity === "critical" ? 2 : b.severity === "warning" ? 1 : 0 : 0;

      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    })
    .slice(0, 5);

  useEffect(() => {
    if (!open) return;

    const modal = modalRef.current;
    const bell = bellRef.current;

    const getFocusable = () =>
      Array.from(
        modal?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    (getFocusable()[0] ?? modal)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusable();

      if (!elements.length) {
        event.preventDefault();
        modal?.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === modal)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        !modal?.contains(target) &&
        !bellRef.current?.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      bell?.focus();
    };
  }, [open, onClose, bellRef]);

  const handleMarkAllRead = async () => {
    if (saving || unreadCount === 0) return;

    setSaving(true);
    setSaveError(false);

    try {
      await onMarkAllRead();
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (busyId || saving) return;

    setBusyId(notification.id);

    setSaveError(false);
    try {
      if (!notification.read) await onMarkRead(notification.id);
      if (notification.href?.startsWith('/') && !notification.href.startsWith('//')) {
        onClose();
        onNavigate(notification.href);
      }
    } catch {
      setSaveError(true);
    } finally {
      setBusyId(null);
    }
  };

  if (!open) return null;

  return (
    <section
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notifications-modal-title"
      id="notifications-modal"
      tabIndex={-1}
      className="fixed right-4 top-20 md:absolute md:right-0 md:top-full z-50 mt-3 flex max-h-[min(600px,calc(100dvh-7rem))] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#D1D5DB] bg-white shadow-2xl"
    >
      <header className="flex items-center justify-between gap-3 border-b border-[#D1D5DB] px-4 py-4">
        <h2
          id="notifications-modal-title"
          className="text-base font-bold text-[#1A1551]"
        >
          Notificações
        </h2>

        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={
            unreadCount === 0 || saving || !!busyId || loading || error
          }
          className="shrink-0 text-xs font-semibold text-[#0069A8] transition-colors hover:text-[#1A1551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0069A8]/30 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          {saving ? "Salvando..." : "Marcar todas como lidas"}
        </button>
      </header>

      {saveError && (
        <div
          role="alert"
          className="mx-4 mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          Não foi possível salvar as alterações.
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {loading ? (
          Array.from({ length: 4 }, (_, index) => (
            <NotificationSkeleton key={index} />
          ))
        ) : error ? (
          <div
            role="alert"
            className="flex flex-col items-center px-4 py-8 text-center"
          >
            <p className="text-sm text-gray-500">
              Não foi possível carregar as notificações.
            </p>

            <button
              type="button"
              onClick={onRetry}
              className="mt-4 rounded-xl bg-[#0069A8] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#005586] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0069A8]/30"
            >
              Tentar novamente
            </button>
          </div>
        ) : sortedNotifications.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-10 text-center">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F8FC] text-3xl text-[#0069A8]"
            >
              ♧
            </div>

            <p className="mt-4 text-sm font-semibold text-[#1A1551]">
              Você não tem notificações
            </p>
          </div>
        ) : (
          sortedNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={handleNotificationClick}
              busy={
                busyId === notification.id ||
                saving
              }
            />
          ))
        )}
      </div>

      {!loading && !error && sortedNotifications.length > 0 && (
        <footer className="border-t border-[#D1D5DB] p-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate("/empresa/notificacoes");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#D1D5DB] bg-white px-4 py-3 text-sm font-bold text-[#0069A8] transition-all hover:border-[#0069A8]/30 hover:bg-[#F0F8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0069A8]/30"
          >
            Ver todas as notificações

            <span aria-hidden="true">→</span>
          </button>
        </footer>
      )}
    </section>
  );
}
