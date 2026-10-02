type GenerationStep = "validation" | "generation" | "links";

interface CertificateGenerationModalProps {
  isOpen: boolean;
  progressPercentage: number;
  currentStep: GenerationStep;
  onCancel: () => void;
}

interface StepProps {
  label: string;
  status: "completed" | "active" | "waiting";
}

const steps: Record<GenerationStep, number> = {
  validation: 0,
  generation: 1,
  links: 2,
};

const stepLabels = [
  "Validando participantes",
  "Gerando certificados",
  "Preparando links de acesso",
];

export const CertificateGenerationModal = ({
  isOpen,
  progressPercentage,
  currentStep,
  onCancel,
}: CertificateGenerationModalProps) => {
  if (!isOpen) return null;

  const currentStepIndex = steps[currentStep];

  const getStepStatus = (index: number): StepProps["status"] => {
    if (index < currentStepIndex) return "completed";
    if (index === currentStepIndex) return "active";
    return "waiting";
  };

  const getStatusLabel = (status: StepProps["status"]) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "active":
        return "Em andamento";
      default:
        return "Aguardando";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="generation-modal-title"
    >
      <div className="relative flex w-full max-w-2xl flex-col rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F8FC]"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8 animate-spin text-[#0069A8]"
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

          <h2
            id="generation-modal-title"
            className="mt-5 text-xl font-bold text-[#1A1551] sm:text-2xl"
          >
            Gerando certificados
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Estamos processando os dados e isso pode levar alguns instantes
          </p>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#1A1551]">
              Progresso
            </span>

            <span className="text-sm font-bold text-[#0069A8]">
              {progressPercentage}%
            </span>
          </div>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-[#F4F5F9]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercentage}
          >
            <div
              className="h-full rounded-full bg-[#0069A8] transition-all duration-500 ease-out"
              style={{
                width: `${Math.min(Math.max(progressPercentage, 0), 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {stepLabels.map((label, index) => {
            const status = getStepStatus(index);

            return (
              <div
                key={label}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    status === "completed"
                      ? "bg-[#0069A8] text-white"
                      : status === "active"
                        ? "bg-[#F0F8FC] text-[#0069A8] ring-2 ring-[#0069A8]/20"
                        : "bg-[#F4F5F9] text-gray-400"
                  }`}
                >
                  {status === "completed" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12l4 4L19 6"
                      />
                    </svg>
                  )}

                  {status === "active" && (
                    <span className="h-3 w-3 animate-pulse rounded-full bg-[#0069A8]" />
                  )}

                  {status === "waiting" && (
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                  )}
                </div>

                <div className="flex flex-1 items-center justify-between gap-4">
                  <span
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      status === "waiting"
                        ? "text-gray-400"
                        : "text-[#1A1551]"
                    }`}
                  >
                    {label}
                  </span>

                  <span
                    className={`text-xs font-semibold sm:text-sm ${
                      status === "waiting"
                        ? "text-gray-400"
                        : "text-[#0069A8]"
                    }`}
                  >
                    {getStatusLabel(status)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex gap-3 rounded-xl border border-[#0069A8]/20 bg-[#F0F8FC] p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mt-0.5 h-5 w-5 shrink-0 text-[#0069A8]"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
            />
            <path
              strokeLinecap="round"
              d="M12 11v5M12 8h.01"
            />
          </svg>

          <p className="text-left text-sm leading-5 text-[#1A1551]">
            Apenas os participantes válidos receberão o certificado. Você será
            notificado quando o processo for concluído.
          </p>
        </div>

        <div className="mt-8 flex justify-center border-t border-[#D1D5DB] pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#D1D5DB] bg-white px-6 py-3 text-sm font-bold text-[#1A1551] outline-none transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-[#0069A8]/30"
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
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>

            Cancelar geração
          </button>
        </div>
      </div>
    </div>
  );
};