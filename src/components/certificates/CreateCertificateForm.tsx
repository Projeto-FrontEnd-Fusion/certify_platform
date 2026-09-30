import { useState, type FormEvent } from "react";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { CertificateStepper } from "@/components/certificates/CertificateStepper";
import { CertificateStepOne } from "@/components/certificates/steps/CertificateStepOne";
import { CertificateStepTwo } from "@/components/certificates/steps/CertificateStepTwo";
import { CertificateStepThree } from "@/components/certificates/steps/CertificateStepThree";
import { useCertificateDraftAutosave } from "@/hooks/Certificate/useCertificateDraftAutosave";
import { removeDraft, type CertificateDraft, type CertificateStep } from "@/lib/certificate-draft";
import { certificateFormSchema, type CertificateFormData } from "@/schemas/CertificateSchema";
import { SelectTemplateModal } from "@/components/certificates/SelectTemplateModal";

type CreateCertificateFormProps = {
  draft: CertificateDraft;
};

const stepFields: Record<CertificateStep, FieldPath<CertificateFormData>[]> = {
  1: [
    "activityType",
    "description",
    "activityName",
    "workload",

    "modalityEnabled",
    "modality",

    "validityEnabled",
    "validity",

    "syllabusEnabled",
    "syllabus",
  ],
  2: ["participants"],
  3: [],
};

const emptyValues = {
  activityType: "",
  description: "",
  activityName: "",
  workload: "",
  modalityEnabled: false,
  validityEnabled: false,
  syllabusEnabled: false,
  participants: [],
};

export function CreateCertificateForm({ draft }: CreateCertificateFormProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<CertificateStep>(draft.step);

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  function handleChangeTemplate(variant: CertificateFormData["variant"]) {
    form.setValue("variant", variant, { shouldDirty: true });
  }

  const form = useForm<CertificateFormData>({
    resolver: zodResolver(certificateFormSchema),
    mode: "onTouched",
    defaultValues: { ...emptyValues, ...draft.data },
  });

  useCertificateDraftAutosave(draft.id, step, form);

  async function goNext() {
    const isValid = await form.trigger(stepFields[step]);
    if (!isValid) return;
    setStep((current) => Math.min(current + 1, 3) as CertificateStep);
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1) as CertificateStep);
  }

  const submitForm = form.handleSubmit((data) => {
    console.log("Emitir certificado:", data);
    removeDraft(draft.id);
    navigate("/empresa/certificados");
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < 3) {
      goNext();
      return;
    }

    submitForm();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <CertificateStepper current={step} />

        {step === 1 && (
          <CertificateStepOne
            onNext={goNext}
            onChangeTemplate={() => setIsTemplateModalOpen(true)}
          />
        )}
        {step === 2 && <CertificateStepTwo onNext={goNext} onBack={goBack} />}
        {step === 3 && <CertificateStepThree onBack={goBack} />}
      </form>

      {isTemplateModalOpen && (
        <SelectTemplateModal
          defaultVariant={form.getValues("variant")}
          onConfirm={handleChangeTemplate}
          onClose={() => setIsTemplateModalOpen(false)}
        />
      )}
    </FormProvider>
  );
}