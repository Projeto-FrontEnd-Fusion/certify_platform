import type { CertificateStatus } from "./types";

interface StatusBadgeProps {
  status: CertificateStatus;
}

const statusConfig: Record<
  CertificateStatus,
  {
    label: string;
    className: string;
  }
> = {
  expired: {label: 'Expirado', className: 'bg-orange-100 text-orange-700'},
  inactive: {label: 'Cancelado', className: 'bg-red-100 text-red-700'},
  draft: {
    label: "Rascunho",
    className: "bg-[#F2994A33] text-[#F2994A]",
  },

  issued: {
    label: "Emitido",
    className: "bg-[#E0F5E9] text-[#219653]",
  },

  all: {
    label: "Todos",
    className: "bg-[#111111]/10 text-[#111111]/60",
  },

  sent: {
    label: "Enviado",
    className: "bg-[#E1F0FF] text-[#2F80ED]",
  },
};

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-md
        px-2.5
        py-1
        text-xs
        font-medium
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}
