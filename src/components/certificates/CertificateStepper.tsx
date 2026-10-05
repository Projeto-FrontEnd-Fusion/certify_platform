import type { CertificateStep } from "@/lib/certificate-draft";

type CertificateStepperProps = {
  current: CertificateStep;
};

const labels = ["Dados do Certificado", "Participantes", "Revisão"];

export function CertificateStepper({ current }: CertificateStepperProps) {
  return (
    <div className="flex justify-center items-center gap-4">
      {labels.map((label, index) => {
        const number = index + 1;
        const isReached = number <= current;
        const isCurrent = number === current;

        return (
          <div key={label} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full text-xs font-semibold flex justify-center items-center border ${isReached
                    ? "bg-[#0066B2] text-white border-[#0066B2]"
                    : "bg-white text-[#525252] border-[#D4D4D4]"
                  }`}
              >
                {number}
              </div>
              <p className={`text-xs ${isCurrent ? "font-bold" : "font-medium text-[#525252]"}`}>{label}</p>
            </div>

            {number < labels.length && <div className="w-[180px] h-0.5 bg-[#E5E5E5]" />}
          </div>
        );
      })}
    </div>
  );
}