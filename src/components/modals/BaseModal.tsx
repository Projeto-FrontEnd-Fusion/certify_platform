import { useEffect, useRef, type ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const BaseModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: BaseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const titleId = `modal-title-${title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current =
      document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements =
        modalRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      modalRef.current
        ?.querySelector<HTMLElement>("[data-modal-close]")
        ?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1551]/60 p-3 backdrop-blur-sm sm:p-4"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[94vh] w-full max-w-[680px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#D1D5DB] bg-white px-5 py-5 sm:px-6 md:px-7">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-xl font-bold leading-tight text-[#1A1551] sm:text-2xl"
            >
              {title}
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            data-modal-close
            aria-label="Fechar modal"
            title="Fechar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-[#F4F5F9] hover:text-[#1A1551] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 md:px-7">
          {children}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-[#D1D5DB] bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6 md:px-7">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-[#0069A8] px-5 py-3 text-sm font-bold text-[#0069A8] transition-colors hover:bg-[#0069A8]/5 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 sm:w-auto"
          >
            Fechar
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#0069A8] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 sm:w-auto"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
