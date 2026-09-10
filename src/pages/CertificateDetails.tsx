import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiDownload,
  FiLinkedin,
  FiMail,
  FiX,
} from "react-icons/fi";
import Logo from "@/assets/Logo.svg";

interface Certificate {
  id: string;
  studentName: string;
  issueDate: string;
  courseName: string;
  workload: string;
  authenticityCode: string;
  title: string;
  institution: string;
  signature?: string;
  acceptedDate?: string;
  lastUpdated?: string;
}

interface CertificateDetailsProps {
  certificate: Certificate;
}

type VerificationStatus = "success" | "loading" | "error";

interface VerificationStep {
  id: string;
  label: string;
  status: VerificationStatus;
  critical?: boolean;
}

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: VerificationStep[];
}

function VerificationModal({
  isOpen,
  onClose,
  steps,
}: VerificationModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement =
      document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const modal = modalRef.current;

      if (!modal) return;

      const focusableElements =
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

      if (!focusableElements.length) return;

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

    return () => {
      document.body.style.overflow = "";

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasError = steps.some(
    (step) =>
      step.critical && step.status === "error"
  );

  const allSuccess =
    steps.length > 0 &&
    steps.every(
      (step) => step.status === "success"
    );

  const overallStatus = hasError
    ? "Falha na verificação"
    : allSuccess
      ? "VERIFICADO"
      : "Verificação em andamento";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1A1551]/60 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="verification-title"
        className="w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-white rounded-xl sm:rounded-2xl shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 sm:px-7 py-5 border-b border-[#D1D5DB]">
          <h2
            id="verification-title"
            className="text-xl sm:text-2xl font-bold text-[#1A1551]"
          >
            Verificação
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de verificação"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#1A1551] hover:bg-[#F4F5F9] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 transition-colors"
          >
            <FiX
              size={22}
              aria-hidden="true"
            />
          </button>
        </div>

        <div
          aria-live="polite"
          aria-atomic="false"
          className="px-5 sm:px-7 py-6"
        >
          <div className="mb-6">
            <p className="text-sm sm:text-base text-gray-600">
              Status da autenticidade do certificado
            </p>

            <p
              className={`mt-1 text-lg font-bold ${
                hasError
                  ? "text-red-600"
                  : allSuccess
                    ? "text-green-600"
                    : "text-[#0069A8]"
              }`}
            >
              {overallStatus}
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-start gap-3"
                aria-live="polite"
              >
                <div className="w-6 h-6 min-w-6 flex items-center justify-center mt-0.5">
                  {step.status === "success" && (
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <FiCheck
                        size={15}
                        aria-hidden="true"
                      />
                    </span>
                  )}

                  {step.status === "loading" && (
                    <span
                      className="w-5 h-5 border-2 border-[#0069A8]/30 border-t-[#0069A8] rounded-full animate-spin"
                      aria-label="Carregando"
                    />
                  )}

                  {step.status === "error" && (
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      <FiX
                        size={15}
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </div>

                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    step.status === "error"
                      ? "text-red-600"
                      : "text-[#1A1551]"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          {hasError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
            >
              <FiAlertCircle
                size={20}
                className="min-w-5 text-red-600 mt-0.5"
                aria-hidden="true"
              />

              <p className="text-sm text-red-600 font-medium">
                Não foi possível verificar todas as
                informações do certificado.
              </p>
            </div>
          )}
        </div>

        <div className="px-5 sm:px-7 py-4 border-t border-[#D1D5DB]">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto sm:min-w-[140px] py-3 px-6 bg-[#0069A8] text-white rounded-xl font-bold hover:bg-[#005582] active:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export function CertificateDetails({
  certificate,
}: CertificateDetailsProps) {
  const [isDownloading, setIsDownloading] =
    useState(false);

  const [isVerificationOpen, setIsVerificationOpen] =
    useState(false);

  const [verificationSteps, setVerificationSteps] =
    useState<VerificationStep[]>([]);

  const initials = useMemo(() => {
    return certificate.studentName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();
  }, [certificate.studentName]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat(
      navigator.language || "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ).format(new Date(certificate.issueDate));
  }, [certificate.issueDate]);

  const acceptedDate = useMemo(() => {
    if (!certificate.acceptedDate) {
      return formattedDate;
    }

    return new Intl.DateTimeFormat(
      navigator.language || "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ).format(new Date(certificate.acceptedDate));
  }, [
    certificate.acceptedDate,
    formattedDate,
  ]);

  const lastUpdated = useMemo(() => {
    if (!certificate.lastUpdated) {
      return formattedDate;
    }

    return new Intl.DateTimeFormat(
      navigator.language || "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ).format(new Date(certificate.lastUpdated));
  }, [
    certificate.lastUpdated,
    formattedDate,
  ]);

  const createVerificationSteps =
    (): VerificationStep[] => [
      {
        id: "issue-date",
        label: `Emitido em ${formattedDate}`,
        status: "loading",
        critical: true,
      },
      {
        id: "issuer",
        label: "Emitido usando Certify",
        status: "loading",
        critical: true,
      },
      {
        id: "recipient",
        label: `Emitido para ${certificate.studentName}`,
        status: "loading",
        critical: true,
      },
      {
        id: "accepted-date",
        label: `Aceitar em ${acceptedDate}`,
        status: "loading",
        critical: true,
      },
      {
        id: "last-updated",
        label: `Última atualização ${lastUpdated}`,
        status: "loading",
        critical: true,
      },
      {
        id: "verified",
        label: "VERIFICADO",
        status: "loading",
        critical: true,
      },
    ];

  const updateStep = (
    stepId: string,
    status: VerificationStatus,
    label?: string
  ) => {
    setVerificationSteps((currentSteps) =>
      currentSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              status,
              label: label ?? step.label,
            }
          : step
      )
    );
  };

  const verifyCertificate = async () => {
    setVerificationSteps(createVerificationSteps());
    setIsVerificationOpen(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );

      updateStep("issue-date", "success");

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      updateStep("issuer", "success");

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      updateStep("recipient", "success");

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      updateStep(
        "accepted-date",
        "success"
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      updateStep(
        "last-updated",
        "success"
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      updateStep(
        "verified",
        "success"
      );
    } catch (error) {
      console.error(
        "Erro durante a verificação:",
        error
      );

      setVerificationSteps((currentSteps) =>
        currentSteps.map((step) =>
          step.status === "loading"
            ? {
                ...step,
                status: "error",
                label: "Erro ao verificar",
              }
            : step
        )
      );
    }
  };

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);

      const response = await fetch(
        `/api/certificates/${certificate.id}/pdf`
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível baixar o certificado."
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "certificado.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Erro ao baixar certificado:",
        error
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendEmail = () => {
    console.log(
      "Enviar certificado por e-mail:",
      certificate.id
    );
  };

  const handleLinkedIn = () => {
    console.log(
      "Compartilhar certificado no LinkedIn:",
      certificate.id
    );
  };

  return (
    <section className="flex min-h-screen w-full font-inter bg-[#F4F5F9] text-[#1A1551]">
      <header className="fixed top-0 left-0 z-40 w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-12">
        <a
          href="/"
          aria-label="Ir para a página inicial da Certify"
          className="flex items-center"
        >
          <img
            src={Logo}
            alt="Certify Logo"
            className="h-12 sm:h-14 lg:h-16 xl:h-[4.5rem] w-auto object-contain"
          />
        </a>

        <div
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0069A8] text-white flex items-center justify-center font-bold text-sm sm:text-base"
          aria-label={`Perfil do aluno ${initials}`}
          title="Perfil do aluno"
        >
          {initials}
        </div>
      </header>

      <main className="w-full min-h-screen pt-20 bg-[#F4F5F9]">
        <section
          aria-labelledby="certificate-metadata-title"
          className="sticky top-20 z-30 w-full bg-white border-b border-gray-200 shadow-sm"
        >
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-5">
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] sm:min-w-[48px] rounded-full bg-[#0069A8] text-white flex items-center justify-center font-bold text-sm sm:text-base"
                  aria-hidden="true"
                >
                  {initials}
                </div>

                <div className="min-w-0">
                  <h2
                    id="certificate-metadata-title"
                    className="sr-only"
                  >
                    Informações do certificado
                  </h2>

                  <p className="text-sm sm:text-base text-[#1A1551] leading-relaxed">
                    Este certificado foi emitido para{" "}
                    <span className="font-bold">
                      {certificate.studentName}
                    </span>
                  </p>

                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    Data da emissão:{" "}
                    <span className="font-semibold text-[#1A1551]">
                      {formattedDate}
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                aria-busy={isDownloading}
                className="w-full md:w-auto md:min-w-[180px] h-12 px-6 bg-[#0069A8] text-white rounded-xl font-bold text-sm sm:text-base disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed hover:bg-[#005582] active:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 transition-colors flex items-center justify-center gap-2"
              >
                <FiDownload
                  size={18}
                  aria-hidden="true"
                />

                {isDownloading
                  ? "Baixando..."
                  : "Fazer download"}
              </button>
            </div>
          </div>
        </section>

        <div className="w-full px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-[1200px] mx-auto">
            <section
              aria-labelledby="certificate-page-title"
              className="w-full"
            >
              <div className="mb-6 sm:mb-8">
                <h1
                  id="certificate-page-title"
                  className="text-2xl sm:text-3xl md:text-[35px] font-bold text-[#1A1551]"
                >
                  Cursos
                </h1>
              </div>

              <section
                aria-label="Pré-visualização do certificado"
                className="w-full max-w-[842px] mx-auto"
              >
                <article className="w-full aspect-[1.414/1] bg-white rounded-xl sm:rounded-2xl border border-[#D1D5DB] p-5 sm:p-7 md:p-10 lg:p-12 flex flex-col items-center justify-between text-center">
                  <div className="w-full flex justify-center">
                    <img
                      src={Logo}
                      alt="Certify Logo"
                      className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1551]">
                      {certificate.title}
                    </h2>

                    <p className="text-base sm:text-xl md:text-2xl font-bold text-[#1A1551]">
                      {certificate.studentName}
                    </p>

                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      Certificamos que
                    </p>

                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      concluiu o curso
                    </p>

                    <p className="text-sm sm:text-lg md:text-xl font-bold text-[#1A1551]">
                      {certificate.courseName}
                    </p>

                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        Carga horária:{" "}
                        <span className="font-semibold text-[#1A1551]">
                          {certificate.workload}
                        </span>
                      </p>

                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        Data:{" "}
                        <span className="font-semibold text-[#1A1551]">
                          {formattedDate}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="flex flex-col items-center">
                      {certificate.signature ? (
                        <img
                          src={certificate.signature}
                          alt="Assinatura"
                          className="max-h-8 sm:max-h-10 md:max-h-12 max-w-[120px] sm:max-w-[160px] object-contain"
                        />
                      ) : (
                        <div className="w-[120px] sm:w-[160px] border-b border-[#1A1551]" />
                      )}

                      <span className="text-[10px] sm:text-xs text-gray-500 mt-2">
                        Assinatura
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        Código de autenticidade
                      </p>

                      <p className="text-[10px] sm:text-xs md:text-sm font-bold text-[#1A1551] mt-1">
                        {certificate.authenticityCode}
                      </p>
                    </div>
                  </div>
                </article>
              </section>

              <div className="w-full max-w-[842px] mx-auto mt-6 sm:mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={verifyCertificate}
                  className="inline-flex items-center justify-center gap-2 px-2 py-2 text-sm sm:text-base font-semibold text-[#0069A8] hover:text-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 rounded-lg transition-colors"
                >
                  <span
                   className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <FiCheck size={15} />
                  </span>

                  Verificar autenticidade
                </button>
              </div>

              <nav
                aria-label="Ações do certificado"
                className="w-full max-w-[842px] mx-auto mt-3 flex flex-col sm:flex-row gap-3"
              >
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  aria-busy={isDownloading}
                  className="w-full sm:flex-1 h-12 px-5 bg-[#0069A8] text-white rounded-xl font-bold text-sm sm:text-base disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed hover:bg-[#005582] active:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <FiDownload
                    size={18}
                    aria-hidden="true"
                  />

                  {isDownloading
                    ? "Baixando..."
                    : "Fazer download"}
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="w-full sm:flex-1 h-12 px-5 bg-transparent border border-[#0069A8] text-[#0069A8] rounded-xl font-bold text-sm sm:text-base hover:bg-[#0069A8]/5 active:bg-[#0069A8]/10 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <FiMail
                    size={18}
                    aria-hidden="true"
                  />

                  Enviar por e-mail
                </button>

                <button
                  type="button"
                  onClick={handleLinkedIn}
                  className="w-full sm:flex-1 h-12 px-5 bg-transparent border border-[#0069A8] text-[#0069A8] rounded-xl font-bold text-sm sm:text-base hover:bg-[#0069A8]/5 active:bg-[#0069A8]/10 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <FiLinkedin
                    size={18}
                    aria-hidden="true"
                  />

                  LinkedIn
                </button>
              </nav>
            </section>
          </div>
        </div>
      </main>

      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() =>
          setIsVerificationOpen(false)
        }
        steps={verificationSteps}
      />
    </section>
  );
}
