import { useFormContext } from "react-hook-form";
import type { CertificateFormData } from "@/schemas/CertificateSchema";
import {
  useCertificateDraftStore,
} from "@/stores/useCertificateDraftStore";

export function useSaveCertificateDraft() {
  const { getValues } = useFormContext<CertificateFormData>();
  const saveDraft = useCertificateDraftStore((state) => state.saveDraft);

  const saveCurrentFormAsDraft = () => saveDraft(getValues());

  return { saveCurrentFormAsDraft };
}