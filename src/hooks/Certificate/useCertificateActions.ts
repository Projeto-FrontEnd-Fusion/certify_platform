
import { useState } from "react";

export type CertificateAction = "send" | "resend" | null;

export function useCertificateActions() {
  const [loadingAction, setLoadingAction] =
    useState<CertificateAction>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const clearFeedback = () => {
    setError(null);
    setSuccessMessage(null);
  };

  // Simulação visual: não copia um link real.
  const copyCertificateLink = () => {
    clearFeedback();
    setSuccessMessage("Link copiado com sucesso!");
  };

  // Simulação visual: não envia requisições.
  const sendCertificateLink = async () => {
    clearFeedback();
    setLoadingAction("send");

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 800);
    });

    setLoadingAction(null);
    setSuccessMessage("Link enviado com sucesso!");
  };

  // Simulação visual: não envia requisições.
  const resendCertificateLink = async () => {
    clearFeedback();
    setLoadingAction("resend");

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 800);
    });

    setLoadingAction(null);
    setSuccessMessage("Link reenviado com sucesso!");
  };

  return {
    copyCertificateLink,
    sendCertificateLink,
    resendCertificateLink,
    loadingAction,
    error,
    successMessage,
    clearFeedback,
  };
}
