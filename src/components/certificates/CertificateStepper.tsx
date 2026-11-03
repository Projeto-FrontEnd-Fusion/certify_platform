import type { CertificateStep } from "@/lib/certificate-draft";

type CertificateStepperProps = {
  current: CertificateStep;
  onStepChange: (step: CertificateStep) => void;
  disabled?: boolean;
};

const labels = ["Dados do Certificado", "Participantes", "Revisão"];

export function CertificateStepper({ current, onStepChange, disabled = false }: CertificateStepperProps) {
  return (
    <div className="flex justify-center items-center gap-4">
      {labels.map((label, index) => {
        const number = (index + 1) as CertificateStep;
        const isReached = number <= current;
        const isCurrent = number === current;

        return (
          <div key={label} className="flex items-center gap-4">
            <button
              type="button"
              disabled={disabled}
              aria-current={isCurrent ? "step" : undefined}
              onClick={() => onStepChange(number)}
              className="flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <div
                className={`w-6 h-6 rounded-full text-xs font-semibold flex justify-center items-center border ${isReached
                  ? "bg-[#0066B2] text-white border-[#0066B2]"
                  : "bg-white text-[#525252] border-[#D4D4D4]"
                  }`}
              >
                {number}
              </div>
              <p className={`text-xs ${isCurrent ? "font-bold" : "font-medium text-[#525252]"}`}>{label}</p>
            </button>

            {number < labels.length && <div className="w-[180px] h-0.5 bg-[#E5E5E5]" />}
          </div>
        );
      })}
    </div>
  );
}