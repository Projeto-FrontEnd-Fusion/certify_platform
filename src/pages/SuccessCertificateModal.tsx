interface SuccessCertificateModalProps {
  isOpen: boolean;
  certificatesCount: number;
  onSendNow: () => void;
  onSendLater: () => void;
  onBack: () => void;
  isSending?: boolean;
}

export const SuccessCertificateModal = ({
  isOpen,
  certificatesCount,
  onSendNow,
  onSendLater,
  onBack,
  isSending = false,
}: SuccessCertificateModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-certificate-modal-title"
    >
      <div className="flex w-full max-w-xl flex-col items-center rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F0F8FC]"
          aria-hidden="true"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0069A8]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12l4 4L19 6"
              />
            </svg>
          </div>
        </div>

        <h2
          id="success-certificate-modal-title"
          className="mt-6 text-xl font-bold leading-snug text-[#1A1551] sm:text-2xl"
        >
          {certificatesCount} certificados foram gerados com sucesso
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
          Os certificados estão prontos e disponíveis para os participantes.
          Você pode enviar os links de acesso agora ou fazer isso mais tarde.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onSendLater}
            disabled={isSending}
            className="w-full rounded-xl border-2 border-[#D1D5DB] bg-white px-6 py-3 text-sm font-bold text-[#1A1551] outline-none transition-all duration-200 hover:border-[#0069A8]/50 hover:bg-[#F4F5F9] focus-visible:ring-2 focus-visible:ring-[#0069A8]/30 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Enviar mais tarde
          </button>

          <button
            type="button"
            onClick={onSendNow}
            disabled={isSending}
            className="w-full rounded-xl bg-[#0069A8] px-6 py-3 text-sm font-bold text-white outline-none transition-all duration-200 hover:bg-[#00598E] focus-visible:ring-2 focus-visible:ring-[#0069A8]/30 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isSending ? "Enviando..." : "Enviar links agora"}
          </button>
        </div>

        <button
          type="button"
          onClick={onBack}
          disabled={isSending}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0069A8] outline-none transition-colors hover:text-[#00598E] focus-visible:ring-2 focus-visible:ring-[#0069A8]/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>

          Voltar para a página de certificados
        </button>
      </div>
    </div>
  );
};
