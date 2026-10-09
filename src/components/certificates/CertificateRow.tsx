import { useNavigate } from 'react-router-dom';
import { certificateServiceInstance } from '@/api/implements';
import { getApiErrorMessage } from '@/api/getApiErrorMessage';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MdMoreVert } from "react-icons/md";
import type { Certificate } from "./types";
import { StatusBadge } from "./StatusBadge";

interface CertificateRowProps {
  certificate: Certificate;
}

export function CertificateRow({
  certificate,
}: CertificateRowProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const send = async () => {
    setIsSending(true);
    try {
      const result = await certificateServiceInstance.sendLinks([String(certificate.id)]);
      setMessage(result.sent ? 'E-mail aceito pelo servidor.' : 'Envio pendente ou com falha.');
      await queryClient.invalidateQueries({queryKey: ['issuer-certificates']});
    } catch (error) {setMessage(getApiErrorMessage(error, 'Falha ao enviar o link.'));}
    finally {setIsSending(false);}
  };
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
          onClick={() => navigate(String(certificate.id).startsWith('draft:')
            ? `/empresa/certificados/criar/${String(certificate.id).slice(6)}`
            : `/certificados/visualizar/${certificate.id}`)}
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
        {['issued', 'sent'].includes(certificate.status) && <button type="button" disabled={isSending} onClick={send} className="text-sm text-[#0069A8]">{isSending ? 'Enviando...' : 'Enviar link'}</button>}
        {message && <p role="status">{message}</p>}
      </td>
    </tr>
  );
}
