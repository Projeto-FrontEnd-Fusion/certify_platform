import { FiCopy, FiLoader, FiSend, FiX } from "react-icons/fi";


interface ActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyLink: () => void;
  onSend: () => void;
  onResend: () => void;
  loadingAction: "send" | "resend" | null;
  error: string | null;
  successMessage: string | null;
}

export function ActionsModal({
  isOpen,
  onClose,
  onCopyLink,
  onSend,
  onResend,
  loadingAction,
  error,
  successMessage,
}: ActionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70">
      <div className="relative w-full max-w-[224px] bg-white shadow-xl rounded-lg px-4 pt-4 pb-1">
        <div className="flex justify-end mb-1">
          <button type="button" onClick={onClose} className="cursor-pointer">
            <FiX className="text-[#191C1D] hover:text-black hover:font-semibold" />
          </button>
        </div>

        <div className="flex flex-col">
          <button
            type="button"
            onClick={onCopyLink}
            className="flex items-center gap-3 cursor-pointer py-2.5 text-[#191C1D] text-sm font-normal hover:text-black hover:font-semibold">
            <FiCopy className="text-black/55" />
            Copiar link
          </button>

          <button
            type="button"
            onClick={onSend}
            disabled={loadingAction !== null}
            className="flex items-center gap-3 cursor-pointer py-2.5 text-[#191C1D] text-sm font-normal hover:text-black hover:font-semibold">
            <FiSend className="text-black/55" />
            {loadingAction === "send" ? "Enviando..." : "Enviar"}
          </button>

          <button
            type="button"
            onClick={onResend}
            disabled={loadingAction !== null}
            className="flex items-center gap-3 cursor-pointer py-2.5 text-[#191C1D] text-sm font-normal hover:text-black hover:font-semibold">
            <FiLoader className="text-black/55" />
            {loadingAction === "resend" ? "Reenviando..." : "Reenviar"}
          </button>

          {successMessage && (
            <p role="status" className="text-green-600">
              {successMessage}
            </p>
          )}

          {error && (
            <p role="alert" className="text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}