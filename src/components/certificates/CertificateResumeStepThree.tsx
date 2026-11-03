import { useFormContext, useWatch } from "react-hook-form";
import type { CertificateFormData } from "@/schemas/CertificateSchema";
import { variantLabels } from "./constants";
import { CertificateTemplate } from "./CertificateTemplate";
import { ResumeItem } from "./ResumeItem";

const NOT_INFORMED = "Não informado";
const VALIDITY_NOT_DEFINED = "Não definida";

export function CertificateResumeStepThree() {
  const { control } = useFormContext<CertificateFormData>();


  const variant = useWatch({ control, name: "variant" });
  const { activityName, activityType, workload, validityEnabled, validity } =
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
        <ResumeItem label="Tipo de atividade" value={activityType || NOT_INFORMED} />
        <ResumeItem label="Descrição de certificação" value="Certificado de participação" />
        <ResumeItem label="Nome da atividade" value={activityName?.trim() || NOT_INFORMED} />
        <ResumeItem label="Carga horária" value={`${workload?.trim() || NOT_INFORMED} horas`} />
        <ResumeItem label="Validade" value={validityLabel} />
        <ResumeItem label="Conteúdo programático" value="Matematica" />
      </div>


    </div>
  );
}
