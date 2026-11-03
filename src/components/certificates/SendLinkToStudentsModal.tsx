import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuInfo } from "react-icons/lu";

type SendLinkToStudentsModalProps = {
  onClose: () => void;
};

type StepStatus = "waiting" | "active" | "done";

// Cada etapa "ocupa" uma faixa da barra de progresso.
const SEND_STEPS = [
  {
    title: "Preparando envios",
    description: "Validando dados e organizando a lista de alunos.",
    from: 0,
    to: 33,
  },
  {
    title: "Enviando e-mails",
    description: "Enviando links de acesso em massa.",
    from: 33,
    to: 66,
  },
  {
    title: "Atualizando status",
    description: "Atualizando o status de envio de cada aluno.",
    from: 66,
    to: 100,
  },
];

function getStepStatus(progress: number, from: number, to: number): StepStatus {
  if (progress >= to) return "done";
  // Com progress 0 todas ficam aguardando; a primeira só ativa quando começa a andar.
  if (progress > 0 && progress >= from) return "active";
  return "waiting";
}

function StepMarker({ status }: { status: StepStatus }) {
  if (status === "done") {
    return (
      <div className="w-6 h-6 shrink-0 flex items-center justify-center border-2 border-[#0069A8] rounded-full">
        <div className="w-2.5 h-2.5 bg-[#0069A8] rounded-full"></div>
      </div>
    );
  }

  if (status === "active") {
    return (
      <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-[#0069A8] rounded-full border-4 border-[#F1F5F9]">
        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
      </div>
    );
  }

  return <div className="w-6 h-6 shrink-0 border border-[#E2E8F0] rounded-full"></div>;
}

export function SendLinkToStudentsModal({ onClose }: SendLinkToStudentsModalProps) {
  const [progress, setProgress] = useState(0);

  // Mock: sobe 1% a cada 30ms (~3s no total) e para em 100%.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval);
          return 100;
        }
        return current + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-end w-full">
        <button type="button" aria-label="Fechar" onClick={onClose} className="cursor-pointer">
          <IoMdClose className="w-5 h-5 text-[#737373]" />
        </button>
      </div>

      <div className="flex flex-col justify-center items-center">
        {/* Loading circular */}
        <div className="border-4 border-[#E0F2FE] border-t-[#0062D2] w-12 h-12 rounded-full animate-spin" />

        <p className="mt-6 font-bold text-xl text-[#0F172A]">Enviando links para os alunos...</p>
        <p className="mt-3 font-normal text-xs text-[#404040]">Estamos enviando os links de acesso por e-mail.</p>
        <p className="font-normal text-xs text-[#404040]">Isso pode levar alguns segundos.</p>
      </div>

      {/* Barra de carregamento (esquerda pra direita) */}
      <div className="flex items-center gap-6 mt-6 w-full">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="bg-[#F1F5F9] w-full h-2 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-[#0069A8] rounded-full transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[#262626] font-semibold text-xs w-8">{progress}%</p>
      </div>

      <div className="mt-5 w-full flex flex-col">
        {SEND_STEPS.map((step, index) => {
          const status = getStepStatus(progress, step.from, step.to);
          const isLast = index === SEND_STEPS.length - 1;

          return (
            <div key={step.title} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <StepMarker status={status} />
                {!isLast && <div className="w-0.5 flex-1 bg-[#F1F5F9]"></div>}
              </div>

              <div className={`flex flex-col ${isLast ? "" : "pb-6"}`}>
                <p
                  className={`text-sm ${status === "waiting"
                    ? "text-[#737373] font-medium"
                    : "text-[#262626] font-semibold"
                    }`}
                >
                  {step.title}
                </p>
                <p className="text-[#737373] font-normal text-xs">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex items-center gap-3 bg-[#F0F6FF] rounded-xl p-4 mt-5">
        <div className="bg-white border border-[#BFDBFE] flex justify-center items-center w-7 h-7 rounded-full">
          <LuInfo className="w-3.5 h-3.5 text-[#0069A8]" />
        </div>

        <p className="text-[#0069A8] font-normal text-xs">Você pode fechar esta janela. Avisaremos quando tudo estiver concluído</p>
      </div>
    </div>
  );
}