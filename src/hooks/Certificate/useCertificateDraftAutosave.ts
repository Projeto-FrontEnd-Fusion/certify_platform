import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import { saveDraft, type CertificateDraft, type CertificateStep } from "@/lib/certificate-draft";
import type { CertificateFormData } from "@/schemas/CertificateSchema";

export function useCertificateDraftAutosave(
  id: string,
  step: CertificateStep,
  form: UseFormReturn<CertificateFormData>,
) {
  useEffect(() => {
    saveDraft({ id, step, data: form.getValues() });

    const subscription = form.watch((values) => {
      saveDraft({ id, step, data: values as CertificateDraft["data"] });
    });

    return () => subscription.unsubscribe();
  }, [id, step, form]);
}