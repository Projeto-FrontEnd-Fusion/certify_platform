import { useAuthStoreData } from '@/stores/useAuthStore';
import { certificateServiceInstance, authServiceInstance } from '@/api/implements';
import { getApiErrorMessage } from '@/api/getApiErrorMessage';
import { SuccessCertificateModal } from '@/pages/SuccessCertificateModal';
import { SendingLinksModal } from '@/pages/SendinglinksModal';
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
    "startDate",
    "endDate",
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
  startDate: "",
  endDate: "",
  modalityEnabled: false,
  validityEnabled: false,
  syllabusEnabled: false,
  participants: [],
};

export function CreateCertificateForm({ draft }: CreateCertificateFormProps) {
  const navigate = useNavigate();
  const {auth} = useAuthStoreData();
  const [isPending, setIsPending] = useState(false);
  const [certificateIds, setCertificateIds] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSending, setShowSending] = useState(false);
  const [message, setMessage] = useState('');
  const finish = () => {
    removeDraft(draft.id);
    localStorage.removeItem(`certificate-event:${draft.id}`);
    navigate('/empresa/certificados');
  };
  const sendNow = async () => {
    if (isSending || !certificateIds.length) return;
    setIsSending(true);
    setShowSending(true);
    try {
      const result = await certificateServiceInstance.sendLinks(certificateIds);
      setMessage(`${result.sent} e-mails aceitos pelo servidor; ${result.failed} falhas; ${result.pending} pendentes.`);
    } catch (error) {
      setMessage(getApiErrorMessage(error, 'Não foi possível enviar os links. Você pode tentar novamente ou enviar mais tarde.'));
    } finally {setIsSending(false); setShowSending(false);}
  };
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

  const submitForm = form.handleSubmit(async (data) => {
    if (isPending) return;
    if (!auth?._id) {setMessage('Entre na sua conta para emitir certificados.'); return;}
    setIsPending(true);
    setMessage('');
    try {
      const key = `certificate-event:${draft.id}`;
      const {participants, ...eventFields} = data;
      const profile = await authServiceInstance.getProfile();
      const institution = profile.razao_social || profile.fullname;
      if (!institution) throw new Error('O cadastro da empresa não tem nome para emitir o certificado.');
      const fingerprint = JSON.stringify({issuerId: auth._id, institution, ...eventFields});
      let cached: {id: string; fingerprint: string} | null = null;
      try {cached = JSON.parse(localStorage.getItem(key) || 'null');} catch { /* Recria cache inválido. */ }
      const eventId = cached?.fingerprint === fingerprint ? cached.id : await certificateServiceInstance.createEvent(data, institution);
      localStorage.setItem(key, JSON.stringify({id: eventId, fingerprint}));
      const summary = await certificateServiceInstance.issueBatch(eventId, participants);
      const certificates: string[] = [];
      let page = 1;
      let totalPages = 1;
      do {
        const result = await certificateServiceInstance.listByIssuer(auth._id, page, eventId);
        certificates.push(...result.data.items.map(item => item.id));
        totalPages = result.data.total_pages;
        page += 1;
      } while (page <= totalPages);
      setCertificateIds(certificates);
      if (summary.erros) {
        setMessage(`${summary.criados} criados, ${summary.duplicados_ignorados} já existentes e ${summary.erros} falhas. Corrija os dados e confirme novamente; certificados existentes não serão duplicados.`);
        return;
      }
      setShowSuccess(true);
    } catch (error) {
      setMessage(getApiErrorMessage(error, 'Não foi possível emitir os certificados. O rascunho foi preservado.'));
    } finally {setIsPending(false);}
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
      {message && <p role="status" className="p-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <CertificateStepper current={step} />

        {step === 1 && (
          <CertificateStepOne
            onNext={goNext}
            onChangeTemplate={() => setIsTemplateModalOpen(true)}
          />
        )}
        {step === 2 && <CertificateStepTwo onNext={goNext} onBack={goBack} />}
        {step === 3 && <CertificateStepThree onBack={goBack} isPending={isPending} />}
      </form>

      <SuccessCertificateModal isOpen={showSuccess} certificatesCount={certificateIds.length}
        onSendNow={sendNow} onSendLater={finish} onBack={finish} isSending={isSending} message={message} />
      <SendingLinksModal isSendingModalOpen={showSending} onClose={() => setShowSending(false)} />
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
