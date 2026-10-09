import { FiLoader } from 'react-icons/fi';

export function SendingLinksModal({isSendingModalOpen, onClose}: {
  isSendingModalOpen: boolean; onClose: () => void;
}) {
  if (!isSendingModalOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div role="dialog" aria-modal="true" aria-labelledby="sending-title" className="w-full max-w-lg rounded-2xl bg-white p-8 text-center">
      <FiLoader aria-hidden="true" className="mx-auto animate-spin" size={30} />
      <h2 id="sending-title" className="mt-4 text-xl font-bold">Enviando links para os alunos...</h2>
      <p role="status" className="mt-4">Aguardando o resultado do servidor de e-mail.</p>
      <button type="button" onClick={onClose} className="mt-6 rounded-lg bg-[#0069A8] px-6 py-3 text-white">Fechar janela</button>
    </div>
  </div>;
}
