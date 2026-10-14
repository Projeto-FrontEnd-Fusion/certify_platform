import { useFormContext, useWatch } from "react-hook-form";
import type { CertificateFormData } from "@/schemas/CertificateSchema";
import { useSaveCertificateDraft } from "@/hooks/Certificate/useSaveCertificateDraft";
import { variantLabels } from "./constants";
import { CertificateTemplate } from "./CertificateTemplate";
import { ResumeItem } from "./ResumeItem";

const NOT_INFORMED = "Não informado";
const VALIDITY_NOT_DEFINED = "Não definida";

export function CertificateResume() {
  const { control } = useFormContext<CertificateFormData>();
  const { saveCurrentFormAsDraft } = useSaveCertificateDraft();

  const variant = useWatch({ control, name: "variant" });
  const { activityName, activityType, workload, validityEnabled, validity, participants } =
    useWatch({ control });

  const validityLabel = validityEnabled
    ? validity || NOT_INFORMED
    : VALIDITY_NOT_DEFINED;

  return (
    <div className="p-6 bg-white border border-[#E2E8F0CC] rounded-md">
      <h2 className="text-[#262626] font-bold text-base mb-4">Resumo do certificado</h2>

      <p className="text-[#A1A1A1] font-normal text-xs">Modelo selecionado</p>
      <p className="text-[#0069A8] font-bold text-sm mb-5">{variantLabels[variant]}</p>

      <CertificateTemplate variant={variant} />

      <div className="mt-9 flex flex-col gap-3.5 justify-center">
        <ResumeItem label="Nome do certificado" value={activityName?.trim() || NOT_INFORMED} />
        <ResumeItem label="Tipo de atividade" value={activityType || NOT_INFORMED} />
        <ResumeItem label="Carga horária" value={workload?.trim() || NOT_INFORMED} />
        <ResumeItem label="Validade" value={validityLabel} />
        <ResumeItem label="Participantes" value={String(participants?.length ?? 0)} />
      </div>

      <div className="border-t border-[#F1F5F9] mt-4">
        <div className="mt-4 flex justify-end items-center gap-4">
          <button
            type="button"
            onClick={saveCurrentFormAsDraft}
            className="bg-white text-sm border border-[#0069A84D] rounded-md px-5 py-2.5 cursor-pointer"
          >
            Salvar rascunho
          </button>
          <button
            type="button"
            className="text-[#99A1AF] text-sm bg-[#E5E7EB] rounded-md px-5 py-2.5 cursor-pointer"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}