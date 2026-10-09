import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { certificateServiceInstance } from '@/api/implements';
import { certificateDate, downloadCertificate, type PublicCertificate } from '@/lib/certificate-display';
import { getApiErrorMessage } from '@/api/getApiErrorMessage';
import Logo from "@/assets/Logo.svg";

import VerifyCodeModal from "./../components/modals/VerifyCodeModal";
import TermsModal from "./../components/modals/Termsmodal";
import PrivacyModal from "./../components/modals/PrivacyPolicyModal";

type CertificateRecord = {
  institution: string;
  event: string;
  date: string;
  authenticationCode: string;
  studentName: string;
  certificateName: string;
  issuedAt: string;
  validity: string;
  completionDate: string;
  workload: string;
  responsibleName: string;
  responsibleRole: string;
};

type Certificate = CertificateRecord & {
  verificationUrl: string;
  source: PublicCertificate;
};

const CertificatePreview = ({
  certificate,
}: {
  certificate: Certificate;
}) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#D1D5DB] bg-white shadow-sm">
      <div className="border-b border-[#D1D5DB] bg-white px-5 py-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[#0069A8]">
          Pré-visualização
        </p>

        <h2 className="mt-1 text-lg font-bold text-[#1A1551]">
          Certificado
        </h2>
      </div>

      <div className="bg-[#F4F5F9] p-4 sm:p-6 md:p-8">
        <div className="mx-auto flex aspect-[1.414/1] w-full max-w-[760px] items-center justify-center overflow-hidden rounded-xl border border-[#D1D5DB] bg-white shadow-md">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 text-center sm:px-10 md:px-14">
            <div className="absolute inset-0 border-[10px] border-[#1A1551]/5 sm:border-[14px]" />

            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0069A8] text-white shadow-md sm:h-16 sm:w-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6 sm:h-8 sm:w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l2.09 4.24L19 8l-3.5 3.41.83 4.82L12 14l-4.33 2.23.83-4.82L5 8l4.91-.76L12 3z"
                />
              </svg>
            </div>

            <p className="relative z-10 mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#0069A8] sm:mt-6 sm:text-xs">
              CERTIFICADO
            </p>

            <p className="relative z-10 mt-2 text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">
              de Conclusão de Curso
            </p>

            <h3 className="relative z-10 mt-2 max-w-[90%] text-lg font-bold leading-tight text-[#1A1551] sm:text-2xl md:text-3xl">
              {certificate.certificateName}
            </h3>

            <p className="relative z-10 mt-3 text-[10px] text-gray-500 sm:text-sm">
              Certificamos que
            </p>

            <p className="relative z-10 mt-1 text-base font-bold text-[#1A1551] sm:text-xl md:text-2xl">
              {certificate.studentName}
            </p>

            <div className="relative z-10 mt-4 h-px w-24 bg-[#0069A8]/30 sm:mt-6 sm:w-32" />

            <p className="relative z-10 mt-3 max-w-[600px] text-[9px] leading-relaxed text-gray-500 sm:text-xs">
              Concluiu com êxito o curso online
            </p>

            <p className="relative z-10 mt-1 max-w-[90%] text-xs font-bold text-[#0069A8] sm:text-sm">
              {certificate.certificateName}
            </p>

            <p className="relative z-10 mt-2 max-w-[90%] text-[8px] leading-relaxed text-gray-400 sm:text-[10px]">
              com carga horária de {certificate.workload} realizado dia{" "}
              {certificate.completionDate}.
            </p>

            <p className="relative z-10 mt-3 text-[8px] text-gray-400 sm:text-[10px]">
              {certificate.institution}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateMetadata = ({
  certificate,
  onCopyCode,
  onCopyLink,
  onDownload,
  isDownloading,
}: {
  certificate: Certificate;
  onCopyCode: () => void;
  onCopyLink: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}) => {
  return (
    <div className="w-full rounded-2xl border border-[#D1D5DB] bg-white shadow-sm">
      <div className="border-b border-[#D1D5DB] px-5 py-5 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[#0069A8]">
          Informações
        </p>

        <h2 className="mt-1 text-xl font-bold text-[#1A1551]">
          Detalhes do certificado
        </h2>
      </div>

      <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
        <div>
          <p className="text-xs font-semibold text-gray-500">
            Nome do aluno
          </p>

          <p className="mt-1 text-sm font-bold text-[#1A1551]">
            {certificate.studentName}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500">
            Certificado
          </p>

          <p className="mt-1 text-sm font-bold leading-relaxed text-[#1A1551]">
            {certificate.certificateName}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500">
            Instituição
          </p>

          <p className="mt-1 text-sm font-bold text-[#1A1551]">
            Certify
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Data de emissão
              </p>

              <p className="mt-1 text-sm font-bold leading-relaxed text-[#1A1551]">
                {certificate.issuedAt}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500">
                Validade
              </p>

              <p className="mt-1 text-sm font-bold text-[#1A1551]">
                {certificate.validity}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500">
            Data de conclusão
          </p>

          <p className="mt-1 text-sm font-bold text-[#1A1551]">
            {certificate.completionDate}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500">
            Carga horária
          </p>

          <p className="mt-1 text-sm font-bold text-[#1A1551]">
            {certificate.workload}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-gray-500">
              Código de autenticação
            </p>

            <button
              type="button"
              onClick={onCopyCode}
              aria-label="Copiar código de autenticação"
              title="Copiar código"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#0069A8] transition-colors hover:bg-[#0069A8]/10 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
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

          <div className="mt-2 rounded-xl border border-[#D1D5DB] bg-[#F4F5F9] px-3 py-3">
            <p className="break-all font-mono text-xs font-bold text-[#1A1551] sm:text-sm">
              {certificate.authenticationCode}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <div>
            <p className="text-xs font-semibold text-gray-500">
              Status
            </p>

            <p className="mt-0.5 text-xs font-medium text-green-700">
              Válido
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
            <span
              className="h-1.5 w-1.5 rounded-full bg-green-600"
              aria-hidden="true"
            />

            Válido
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-[#D1D5DB] pt-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-gray-500">
              Nome do responsável
            </p>

            <p className="mt-1 text-sm font-bold text-[#1A1551]">
              {certificate.responsibleName}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500">
              Descrição do cargo
            </p>

            <p className="mt-1 text-sm font-bold text-[#1A1551]">
              {certificate.responsibleRole}
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-[#D1D5DB] pt-5">
          <button
            type="button"
            onClick={onCopyLink}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0069A8] bg-white px-5 py-3 text-sm font-bold text-[#0069A8] transition-colors hover:bg-[#0069A8]/5 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
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

            Copiar link de verificação
          </button>

          <button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0069A8] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#005582] active:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 disabled:cursor-not-allowed disabled:bg-[#0069A8]/50"
          >
            {isDownloading ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5 animate-spin"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    className="opacity-30"
                  />

                  <path
                    strokeLinecap="round"
                    d="M21 12a9 9 0 00-9-9"
                  />
                </svg>

                Baixando...
              </>
            ) : (
              <>
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
                    d="M12 3v12"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 10l5 5 5-5"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 21h14"
                  />
                </svg>

                Baixar certificado
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const CertificateValidationPage = () => {
  const { code } = useParams<{ code: string }>();

  const [certificate, setCertificate] =
    useState<Certificate | null>(null);

  const [validationError, setValidationError] = useState('');

  const [isValidating, setIsValidating] =
    useState(true);

  const [toast, setToast] =
    useState<string | null>(null);

  const [isDownloading, setIsDownloading] =
    useState(false);

  const [isVerifyModalOpen, setIsVerifyModalOpen] =
    useState(false);

  const [isTermsModalOpen, setIsTermsModalOpen] =
    useState(false);

  const [isPrivacyModalOpen, setIsPrivacyModalOpen] =
    useState(false);

  const normalizedCode = useMemo(
    () => code?.trim() ?? "",
    [code],
  );

  useEffect(() => {
    let cancelled = false;
    const validate = async () => {
      setIsValidating(true);
      setCertificate(null);
      setValidationError('');
      try {
        if (!normalizedCode) return;
        const data = await certificateServiceInstance.validatePublicCertificate(normalizedCode);
        if (cancelled) return;
        setCertificate({institution: data.institution_name || 'Não informado', event: data.event_name,
          date: data.issued_at ? new Date(data.issued_at).toISOString() : '', authenticationCode: data.access_key || normalizedCode,
          studentName: data.participant_name, certificateName: data.description || 'Certificado',
          issuedAt: certificateDate(data.issued_at), validity: data.valid_until ? certificateDate(data.valid_until) : 'Sem validade',
          completionDate: certificateDate(data.event_end), workload: `${data.workload} horas`,
          responsibleName: data.institution_name || '', responsibleRole: 'Instituição emissora',
          verificationUrl: window.location.href, source: data});
      } catch (error) {
        if (!cancelled) setValidationError(getApiErrorMessage(error, 'Não foi possível consultar o certificado.'));
      } finally {if (!cancelled) setIsValidating(false);}
    };
    void validate();
    return () => {cancelled = true;};
  }, [normalizedCode]);

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleCopy = async (
    value: string,
    successMessage: string,
  ) => {
    try {
      await navigator.clipboard.writeText(value);

      showToast(successMessage);
    } catch {
      showToast(
        "Não foi possível copiar. Tente novamente.",
      );
    }
  };

  const handleCopyCode = () => {
    if (!certificate) {
      return;
    }

    handleCopy(
      certificate.authenticationCode,
      "Código de autenticação copiado!",
    );
  };

  const handleCopyLink = () => {
    if (!certificate) {
      return;
    }

    handleCopy(
      certificate.verificationUrl,
      "Link de verificação copiado!",
    );
  };

  const handleDownload = async () => {
    if (!certificate) {
      return;
    }

    try {
      setIsDownloading(true);

      await downloadCertificate(certificate.source);

      showToast(
        "Certificado baixado com sucesso!",
      );
    } catch {
      showToast(
        "Não foi possível baixar o certificado.",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handleVerifyAnother = () => {
    setIsVerifyModalOpen(true);
  };

  if (isValidating) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-[#F4F5F9] font-inter text-[#1A1551]">
        <div className="w-full max-w-[500px] px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F8FC] text-[#0069A8]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8 animate-spin"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                className="opacity-25"
              />

              <path
                strokeLinecap="round"
                d="M21 12a9 9 0 00-9-9"
              />
            </svg>
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#0069A8]">
            Tela carregando
          </p>

          <h1 className="mt-2 text-2xl font-bold">
            Verificando certificado...
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Estamos consultando os dados para confirmar
            a autenticidade
          </p>

          <div className="mt-8 space-y-3 text-left">
            {[
              "Lendo código de autenticação",
              "Consultando certificado",
              "Validando informações",
              "Concluído",
            ].map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-xl border border-[#D1D5DB] bg-white px-4 py-3"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    index === 0
                      ? "bg-[#0069A8] text-white"
                      : "bg-[#F4F5F9] text-gray-400"
                  }`}
                >
                  {index === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 animate-spin"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        className="opacity-30"
                      />

                      <path
                        strokeLinecap="round"
                        d="M21 12a9 9 0 00-9-9"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">
                      {index + 1}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {step}
                  </p>

                  <p className="text-xs text-gray-400">
                    {index === 0
                      ? "Em andamento"
                      : "Aguardando"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-[#D1D5DB] pt-6">
            <p className="text-sm font-bold text-[#1A1551]">
              Certify<sup>®</sup>
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Conhecimento que transforma
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <button
                type="button"
                onClick={() =>
                  setIsTermsModalOpen(true)
                }
                className="transition-colors hover:text-[#0069A8] hover:underline"
              >
                Termos de uso
              </button>

              <span aria-hidden="true">|</span>

              <button
                type="button"
                onClick={() =>
                  setIsPrivacyModalOpen(true)
                }
                className="transition-colors hover:text-[#0069A8] hover:underline"
              >
                Política de privacidade
              </button>
            </div>

            <p className="mt-2 text-xs font-semibold text-gray-400">
              certify.com
            </p>
          </div>
        </div>

        <TermsModal
          isOpen={isTermsModalOpen}
          onClose={() => setIsTermsModalOpen(false)}
        />

        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      </section>
    );
  }

  if (!certificate) {
    return (
      <section className="min-h-screen w-full bg-[#F4F5F9] font-inter text-[#1A1551]">
        {validationError && <p role="alert">{validationError}</p>}
        <header className="flex h-20 w-full items-center justify-between bg-[#1A1551] px-4 sm:px-6 lg:px-10">
          <img
            src={Logo}
            alt="Certify Logo"
            className="h-10 w-auto max-w-[135px] object-contain sm:h-11 sm:max-w-[150px]"
          />

          <button
            type="button"
            onClick={handleVerifyAnother}
            className="rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/60 sm:px-5 sm:text-sm"
          >
            Verificar outro código
          </button>
        </header>

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
          <div className="w-full max-w-[520px] rounded-2xl border border-[#D1D5DB] bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </div>

            <h1 className="mt-5 text-2xl font-bold">
              Certificado não encontrado
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Não foi possível validar o certificado
              informado. Verifique se o código de
              autenticação está correto e tente
              novamente.
            </p>

            {code && (
              <div className="mt-5 rounded-xl border border-[#D1D5DB] bg-[#F4F5F9] px-4 py-3">
                <p className="text-xs font-semibold text-gray-500">
                  Código informado
                </p>

                <p className="mt-1 break-all font-mono text-sm font-bold">
                  {code}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleVerifyAnother}
              className="mt-6 w-full rounded-xl bg-[#0069A8] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
            >
              Verificar outro código
            </button>
          </div>
        </main>

        <VerifyCodeModal
          isOpen={isVerifyModalOpen}
          onClose={() => setIsVerifyModalOpen(false)}
        />

        <TermsModal
          isOpen={isTermsModalOpen}
          onClose={() => setIsTermsModalOpen(false)}
        />

        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-[#F4F5F9] font-inter text-[#1A1551]">
      <header className="flex h-20 w-full items-center justify-between bg-[#1A1551] px-4 sm:px-6 lg:px-10">
        <img
          src={Logo}
          alt="Certify Logo"
          className="h-10 w-auto max-w-[135px] object-contain sm:h-11 sm:max-w-[150px]"
        />

        <button
          type="button"
          onClick={handleVerifyAnother}
          className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/60 sm:px-5 sm:text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12a8 8 0 0114.9-4"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 4v5h-5"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 12a8 8 0 01-14.9 4"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 20v-5h5"
            />
          </svg>

          <span className="hidden sm:inline">
            Verificar outro código
          </span>

          <span className="sm:hidden">
            Outro código
          </span>
        </button>
      </header>

      <main className="w-full px-4 pb-10 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pt-12">
        <div className="mx-auto w-full max-w-[1200px]">
          <section className="mx-auto max-w-[700px] text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm sm:h-20 sm:w-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-8 w-8 sm:h-10 sm:w-10"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 6L9 17l-5-5"
                />
              </svg>
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Certificado verificado
            </h1>

            <p className="mx-auto mt-3 max-w-[600px] text-sm leading-relaxed text-gray-500 sm:text-base">
              Este certificado é autêntico e foi emitido
              pela plataforma Certify
            </p>
          </section>

          <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.75fr)] lg:gap-8">
            <CertificatePreview
              certificate={certificate}
            />

            <CertificateMetadata
              certificate={certificate}
              onCopyCode={handleCopyCode}
              onCopyLink={handleCopyLink}
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
          </div>

          <section className="mt-6 rounded-2xl border border-[#0069A8]/15 bg-[#F0F8FC] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0069A8] shadow-sm">
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
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11v5"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8h.01"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-sm font-bold">
                  Para profissionais de RH
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  Esta página pode ser compartilhada e
                  usada por profissionais de RH para
                  confirmar a autenticidade deste
                  certificado.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#D1D5DB] bg-white sm:grid-cols-3">
            <div className="flex items-center gap-3 border-b border-[#D1D5DB] px-5 py-5 sm:border-b-0 sm:border-r">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F8FC] text-[#0069A8]">
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
                    d="M12 3l7 4v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V7l7-4z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-bold">
                  Verificação segura
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  Este certificado foi verificado em tempo real em nossa base de dados.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-[#D1D5DB] px-5 py-5 sm:border-b-0 sm:border-r">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F8FC] text-[#0069A8]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect
                    width="14"
                    height="17"
                    x="5"
                    y="4"
                    rx="2"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 4V3h6v1M9 9h6M9 13h4"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-bold">
                  Dados protegidos
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  As informações são exibidas de forma segura e não podem ser alteradas.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F8FC] text-[#0069A8]">
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
                    d="M12 3l2.4 4.9L20 9l-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5L4 9l5.6-1.1L12 3z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-bold">
                  Confiança no seu talento
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  A Certify emite certificados autênticos para impulsionar carreiras.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-[#D1D5DB] bg-white px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500">
                  Código de autenticidade
                </p>

                <p className="mt-1 break-all font-mono text-sm font-bold text-[#1A1551]">
                  {certificate.authenticationCode}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Esse certificado foi gerado pela Certify
              </p>
            </div>
          </section>

          <footer className="mt-8 border-t border-[#D1D5DB] py-8 text-center">
            <p className="text-base font-bold text-[#1A1551]">
              Certify<sup>®</sup>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Conhecimento que transforma
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <button
                type="button"
                onClick={() =>
                  setIsTermsModalOpen(true)
                }
                className="transition-colors hover:text-[#0069A8] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
              >
                Termos de uso
              </button>

              <span aria-hidden="true">|</span>

              <button
                type="button"
                onClick={() =>
                  setIsPrivacyModalOpen(true)
                }
                className="transition-colors hover:text-[#0069A8] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
              >
                Política de privacidade
              </button>
            </div>

            <p className="mt-2 text-xs font-semibold text-gray-400">
              certify.com
            </p>
          </footer>
        </div>
      </main>

      <VerifyCodeModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {toast && (
        <div
          className="fixed bottom-5 left-1/2 z-[300] flex -translate-x-1/2 items-center gap-3 rounded-xl bg-[#1A1551] px-4 py-3 text-sm font-semibold text-white shadow-xl"
          role="status"
          aria-live="polite"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12l4 4L19 6"
              />
            </svg>
          </div>

          {toast}
        </div>
      )}
    </section>
  );
};

export default CertificateValidationPage;