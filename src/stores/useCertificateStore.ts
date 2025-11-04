import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CertificateResponse } from "@/schemas/CertificateResponse";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";

interface UseCertificateStoreData {
  Access: CertificateResponse;
  setAccess: (payload: CertificateResponse) => void;
}

export const useCertificateStoreData = create<UseCertificateStoreData>()(
  persist(
    (set) => ({
      Access: {
        status: "pending",
        access_key: null,
        email: null,
        description: null,
        event_date: null,
        event_end: null,
        event_name: null,
        event_start: null,
        institution_name: null,
        workload: null,
        participant_email: null,
        participant_name: null,
      },
      setAccess: (payload: CertificateResponse) => {
        if (payload.access_key === "ABC12") {
          return set({ Access: payload });
        }
        toast.error("Credenciais Inválidas", {
          position: "top-center",
          autoClose: 1500,
          ...TOAST_STYLES.error,
        });
      },
    }),
    {
      name: "access-storage",
    }
  )
);
