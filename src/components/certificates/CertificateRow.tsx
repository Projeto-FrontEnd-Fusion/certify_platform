import { MdMoreVert } from "react-icons/md";
import type { Certificate } from "./types";
import { StatusBadge } from "./StatusBadge";

interface CertificateRowProps {
  certificate: Certificate;
}

export function CertificateRow({
  certificate,
}: CertificateRowProps) {
  return (
    <tr className="border-b border-[#111111]/10 last:border-b-0">
      <td className="px-6 py-4 text-sm font-medium text-[#111111]">
        {certificate.name}
      </td>

      <td className="px-6 py-4 text-sm text-[#111111]/60">
        {certificate.student}
      </td>

      <td className="px-6 py-4 text-sm text-[#111111]/60">
        {certificate.model}
      </td>

      <td className="px-6 py-4 text-sm text-[#111111]/60">
        {certificate.issuedAt}
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={certificate.status} />
      </td>

      <td className="px-6 py-4">
        <button
          type="button"
          aria-label={`Ações para ${certificate.name}`}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            text-[#111111]/40
            transition-colors
            hover:bg-[#0069A8]/10
            hover:text-[#0069A8]
            focus:outline-none
            focus:ring-2
            focus:ring-[#0069A8]/30
          "
        >
          <MdMoreVert size={20} />
        </button>
      </td>
    </tr>
  );
}