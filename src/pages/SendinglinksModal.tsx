import { FiCheck, FiInfo, FiLoader, FiX } from "react-icons/fi";

type SendingLinksModalProps = {
  isSendingModalOpen: boolean;
  progressPercentage: number;
  activeStep: number;
  onClose: () => void;
};

type StepStatus = "completed" | "active" | "pending";

export function SendingLinksModal({
  isSendingModalOpen,
  progressPercentage,
  activeStep,
  onClose,
}: SendingLinksModalProps) {
  if (!isSendingModalOpen) {
    return null;
  }

  const safeProgress = Math.min(
    100,
    Math.max(0, progressPercentage)
  );

  const steps = [
    {
      id: 1,
      title: "Preparando envios",
      description:
        "Validando dados e organizando a lista de alunos.",
      status:
        activeStep > 1
          ? ("completed" as StepStatus)
          : activeStep === 1
            ? ("active" as StepStatus)
            : ("pending" as StepStatus),
    },
    {
      id: 2,
      title: "Enviando e-mails",
      description:
        "Enviando links de acesso em massa.",
      status:
        activeStep > 2
          ? ("completed" as StepStatus)
          : activeStep === 2
            ? ("active" as StepStatus)
            : ("pending" as StepStatus),
    },
    {
      id: 3,
      title: "Atualizando status",
      description:
        "Atualizando o status de envio de cada aluno.",
      status:
        activeStep > 3
          ? ("completed" as StepStatus)
          : activeStep === 3
            ? ("active" as StepStatus)
            : ("pending" as StepStatus),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1551]/60 p-4">
      <div className="relative flex w-full max-w-2xl flex-col items-center rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal de envio"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl text-[#1A1551] transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
        >
          <FiX
            size={22}
            aria-hidden="true"
          />
        </button>

        <div className="flex w-full flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0069A8]/10">
            <FiLoader
              size={28}
              className="animate-spin text-[#0069A8]"
              aria-hidden="true"
            />
          </div>

          <h2 className="text-xl font-bold text-[#1A1551] sm:text-2xl">
            Enviando links para os alunos...
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
            Estamos enviando os links de acesso por e-mail.
            Isso pode levar alguns segundos
          </p>
        </div>

        <div className="mt-8 w-full">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-[#1A1551]">
              Progresso
            </span>

            <span className="text-sm font-bold text-[#0069A8]">
              {safeProgress}%
            </span>
          </div>

          <div
            className="h-3 w-full overflow-hidden rounded-full bg-gray-200"
            role="progressbar"
            aria-valuenow={safeProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso do envio: ${safeProgress}%`}
          >
            <div
              className="h-full rounded-full bg-[#0069A8] transition-all duration-500"
              style={{
                width: `${safeProgress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-8 w-full space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex items-start gap-4"
              aria-live="polite"
            >
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-4 top-8 h-10 w-px ${
                    step.status === "completed"
                      ? "bg-green-400"
                      : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                />
              )}

              <div
                className={`relative z-10 flex h-8 w-8 min-w-8 items-center justify-center rounded-full ${
                  step.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : step.status === "active"
                      ? "bg-[#0069A8]/10 text-[#0069A8]"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.status === "completed" && (
                  <FiCheck
                    size={17}
                    aria-hidden="true"
                  />
                )}

                {step.status === "active" && (
                  <FiLoader
                    size={17}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                )}

                {step.status === "pending" && (
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-gray-400"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <span
                  className={`text-sm font-semibold sm:text-base ${
                    step.status === "completed"
                      ? "text-[#1A1551]"
                      : step.status === "active"
                        ? "text-[#0069A8]"
                        : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>

                <span className="mt-1 text-sm leading-relaxed text-gray-500">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex w-full items-start gap-3 rounded-xl border border-[#B9DDF0] bg-[#F0F8FC] p-4">
          <FiInfo
            size={21}
            className="mt-0.5 min-w-5 text-[#0069A8]"
            aria-hidden="true"
          />

          <p className="text-sm font-medium leading-relaxed text-[#0069A8]">
            Você pode fechar esta janela. Avisaremos quando tudo
            estiver concluído
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-[#0069A8] px-6 py-3 font-bold text-white transition-colors hover:bg-[#005582] active:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
