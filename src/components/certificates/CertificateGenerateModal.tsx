import { useEffect, useState } from "react";
import { FiCheck, FiFileText, FiInfo } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CertificateGeneratedModal } from "./CertificateGeneratedModal";

type CertificateGenerateModalProps = {
  onCancel: () => void;
};

// Cada etapa "ocupa" uma faixa da barra de progresso.
const STEPS = [
  { label: "Validando participantes", from: 0, to: 33 },
  { label: "Gerando certificados", from: 33, to: 66 },
  { label: "Preparando links de acesso", from: 66, to: 100 },
];

type StepStatus = "done" | "active" | "waiting";

const STATUS_TEXT: Record<StepStatus, { label: string; color: string }> = {
  done: { label: "Concluído", color: "text-[#059669]" },
  active: { label: "Em andamento", color: "text-[#0069A8]" },
  waiting: { label: "Aguardando", color: "text-[#A1A1A1]" },
};

function getStepStatus(progress: number, from: number, to: number): StepStatus {
  if (progress >= to) return "done";
  if (progress >= from) return "active";
  return "waiting";
}

export function CertificateGenerateModal({ onCancel }: CertificateGenerateModalProps) {
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const isComplete = progress >= 100;

  // Mock: sobe 1% a cada 50ms (~5s no total) e para em 100%.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval);
          return 100;
        }
        return current + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const timeout = setTimeout(() => setShowResult(true), 400);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="generate-modal-title"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/70"
    >
      <div className="relative w-full max-w-225 bg-white shadow-xl rounded-lg py-12 px-6 flex flex-col items-center">

        {showResult && <CertificateGeneratedModal onClose={onCancel} />}

        {!showResult && (
          <>
            <FiFileText className="w-28 h-28 text-[#0069A8]" />

            <p id="generate-modal-title" className="mt-3 text-xl font-bold text-[#262626]">
              {isComplete ? "Certificados gerados" : "Gerando certificados"}
            </p>
            <p className="mt-1.5 text-sm text-[#737373]">
              Estamos processando os dados e isso pode levar alguns instantes.
            </p>

            {/* Barra de carregamento (esquerda pra direita) */}
            <div className="flex items-center gap-6 mt-6">
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="bg-[#F3F4F6] w-131 h-2.5 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-[#0069A8] rounded-full transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[#0069A8] font-bold text-xs w-8">{progress}%</p>
            </div>

            {/* Etapas */}
            <div className="mt-7 flex items-start">
              {STEPS.map((step, index) => {
                const status = getStepStatus(progress, step.from, step.to);
                const text = STATUS_TEXT[status];

                return (
                  <div key={step.label} className="flex items-start">
                    <div className="flex flex-col items-center w-40">
                      {status === "done" && (
                        <div className="bg-[#E6F9F0] border border-[#A7F3D0] w-9 h-9 flex justify-center items-center rounded-full">
                          <FiCheck className="w-5 h-5 text-[#10B981]" />
                        </div>
                      )}

                      {status === "active" && (
                        <div className="bg-[#EFF6FF80] w-9 h-9 flex justify-center items-center rounded-full">
                          <div className="border-2 border-[#E5E7EB] border-t-[#0069A8] w-7 h-7 rounded-full animate-spin" />
                        </div>
                      )}

                      {status === "waiting" && (
                        <div className="bg-[#EFF6FF80] w-9 h-9 flex justify-center items-center rounded-full">
                          <div className="border-2 border-[#E5E7EB] w-7 h-7 rounded-full" />
                        </div>
                      )}

                      <p className="mt-2 text-[#262626] font-semibold text-xs text-center">{step.label}</p>
                      <p className={`mt-0.5 font-normal text-[11px] ${text.color}`}>{text.label}</p>
                    </div>

                    {index < STEPS.length - 1 && (
                      <div
                        className={`h-0.5 w-20 mt-4.25 transition-colors ${status === "done" ? "bg-[#10B981]" : "bg-[#E5E7EB]"
                          }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 bg-[#F0F6FF] p-4 w-full border border-[#DBEAFE] rounded-xl mt-6">
              <div className="bg-white border border-[#BFDBFE] flex justify-center items-center w-7 h-7 rounded-full shrink-0">
                <FiInfo className="text-[#0069A8] w-3 h-3" />
              </div>

              <div className="flex flex-col gap-1 text-xs text-[#404040]">
                <p className="text-[#262626] font-bold text-xs">Apenas os participantes válidos receberão o certificado.</p>
                <p className="text-[#737373] font-normal text-[11px]">Você será notificado quando o processo for concluído.</p>
              </div>
            </div>

            <button
              onClick={onCancel}
              type="button"
              className="flex items-center gap-3 justify-center border border-[#0069A84D] px-5 py-2.5 mt-6 rounded-md cursor-pointer text-sm"
            >
              <IoCloseCircleOutline className="w-5 h-5" />
              {isComplete ? "Fechar" : "Cancelar geração"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}