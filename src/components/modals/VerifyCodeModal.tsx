import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { useNavigate } from "react-router-dom";


type VerifyCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const VerifyCodeModal = ({
  isOpen,
  onClose,
}: VerifyCodeModalProps) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isPasting, setIsPasting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setValue("");
    setError("");

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

 useEffect(() => {
  if (!isOpen) {
    return;
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [isOpen, onClose]);


  const normalizeInput = (input: string) => {
    const trimmedValue = input.trim();

    if (!trimmedValue) {
      return "";
    }

    try {
      const url = new URL(trimmedValue);
      const segments = url.pathname.split("/").filter(Boolean);

      const codeIndex = segments.findIndex(
        (segment) =>
          segment.toLowerCase() === "verificar" ||
          segment.toLowerCase() === "validar-certificado" ||
          segment.toLowerCase() === "validate" ||
          segment.toLowerCase() === "validar",
      );

      if (codeIndex >= 0 && segments[codeIndex + 1]) {
        return decodeURIComponent(
          segments[codeIndex + 1],
        )
          .trim();
      }

      const codeFromQuery =
        url.searchParams.get("code") ||
        url.searchParams.get("codigo");

      if (codeFromQuery) {
        return codeFromQuery.trim();
      }
    } catch {
      return trimmedValue;
    }

    return trimmedValue;
  };

  const handlePaste = async () => {
    setError("");
    setIsPasting(true);

    try {
      const clipboardText =
        await navigator.clipboard.readText();

      if (!clipboardText.trim()) {
        setError(
          "A área de transferência está vazia.",
        );
        return;
      }

      setValue(clipboardText);
      inputRef.current?.focus();
    } catch {
      setError(
        "Não foi possível acessar a área de transferência. Use Ctrl+V ou Cmd+V para colar.",
      );
      inputRef.current?.focus();
    } finally {
      setIsPasting(false);
    }
  };

  const handleInputPaste = (
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const pastedValue =
      event.clipboardData.getData("text");

    setValue(pastedValue);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedCode = normalizeInput(value);

    if (!normalizedCode) {
      setError(
        "Digite ou cole um link ou código de verificação.",
      );
      inputRef.current?.focus();
      return;
    }

    onClose();
    navigate(`/verificar/${encodeURIComponent(normalizedCode)}`);
  };

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-[2px]"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="verify-code-modal-title"
        aria-describedby="verify-code-modal-description"
        className="relative w-full max-w-[520px] rounded-2xl border border-[#D1D5DB] bg-white p-6 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F8FC] text-[#0069A8]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 3h8l4 4v14H7a2 2 0 01-2-2V5a2 2 0 012-2z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 3v5h5"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 14l2 2 4-4"
              />
            </svg>
          </div>

          <h2
            id="verify-code-modal-title"
            className="mt-5 text-xl font-bold text-[#1A1551] sm:text-2xl"
          >
            Verificar outro certificado
          </h2>

          <p
            id="verify-code-modal-description"
            className="mx-auto mt-3 max-w-[430px] text-sm leading-relaxed text-gray-500"
          >
            Cole o link ou o código de verificação
            copiado de um currículo ou e-mail para
            conferir a autenticidade do certificado.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6"
          noValidate
        >
          <label
            htmlFor="verification-code"
            className="block text-left text-sm font-bold text-[#1A1551]"
          >
            Link ou código de verificação
          </label>

          <div className="relative mt-2">
            <input
              ref={inputRef}
              id="verification-code"
              type="text"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setError("");
              }}
              onPaste={handleInputPaste}
              placeholder="Cole aqui o link ou código de verificação"
              aria-invalid={Boolean(error)}
              aria-describedby={
                error
                  ? "verification-code-error"
                  : undefined
              }
              className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 pr-24 text-sm text-[#1A1551] outline-none transition-colors placeholder:text-gray-400 focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/15"
            />

            <button
              type="button"
              onClick={handlePaste}
              disabled={isPasting}
              className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-[#0069A8] transition-colors hover:bg-[#F0F8FC] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>
                {isPasting ? "Colando..." : "Colar"}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect
                  width="13"
                  height="13"
                  x="9"
                  y="9"
                  rx="2"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                />
              </svg>
            </button>
          </div>

          {error && (
            <p
              id="verification-code-error"
              className="mt-2 text-xs font-medium text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!value.trim()}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0069A8] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 20l-4-4"
              />
            </svg>

            Verificar certificado
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCodeModal;
