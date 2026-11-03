import { useState } from "react";
import { FiCheck, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

import { SendLinkToStudentsModal } from "./SendLinkToStudentsModal";

type CertificateGeneratedModalProps = {
  onClose: () => void;
};

export function CertificateGeneratedModal({ onClose }: CertificateGeneratedModalProps) {
  const [showSendLinks, setShowSendLinks] = useState(false);

  if (showSendLinks) {
    return <SendLinkToStudentsModal onClose={() => setShowSendLinks(false)} />;
  }

  return (
    <>
      <FiCheck className="text-[#16A34A] w-28 h-28" />
      <p className="text-[#0F172A] font-extrabold text-2xl mt-6">112 certificados foram gerados com sucesso</p>
      <p className="text-[#475569] font-normal text-sm mt-3">Os certificados estão prontos e disponíveis para os participantes.</p>
      <p className="text-[#475569] font-normal text-sm">Você pode enviar os links de acesso agora ou fazer isso mais tarde.</p>

      <div className="flex items-center gap-4 mt-7">
        <button
          type="button"
          onClick={onClose}
          className="bg-white text-sm border border-[#0069A84D] rounded-md px-5 py-2.5 cursor-pointer text-[#030712] font-semibold"
        >
          Enviar mais tarde
        </button>
        <button
          type="button"
          onClick={() => setShowSendLinks(true)}
          className="text-white text-sm bg-[#0069A8] rounded-md px-5 py-2.5 cursor-pointer"
        >
          Enviar links agora
        </button>
      </div>

      <div className="flex items-center gap-1.5 mt-3 text-[#0069A8] font-semibold text-xs">
        <FiFileText className="w-4 h-4" />
        <Link to="/empresa/certificados">Voltar para a página de certificados</Link>
      </div>
    </>
  );
}