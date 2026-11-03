import type { CertificateFormData } from "@/schemas/CertificateSchema";
import { useFormContext, useWatch } from "react-hook-form";
import { SentFile } from "./form/SentFile";

export function CertificateSentFiles() {
  const { control } = useFormContext<CertificateFormData>();

  const logo = useWatch({ control, name: "logo" });
  const signature = useWatch({ control, name: "signature" });

  return (
    <section className="bg-white p-6">
      <p className="text-[#262626] font-bold text-sm mb-5">Arquivos enviados</p>

      <SentFile label="Logo da instituição" image={logo} />

      <div className="mt-5">
        <SentFile label="Assinatura do responsável" image={signature} />
      </div>
    </section>
  );
}