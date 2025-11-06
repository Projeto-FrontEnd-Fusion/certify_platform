import type { CertificateInDb } from "@/api/Certificate/@types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseCertificateStoreData {
  certificate: CertificateInDb | null;
  setcertificate: (payload: CertificateInDb) => void;
  deleteCertificate: () => void;
}

export const useCertificateStoreData = create<UseCertificateStoreData>()(
  persist(
    (set) => ({
      certificate: null,

      setcertificate: (payload) => set({ certificate: payload }),

      deleteCertificate: () => set({ certificate: null }),
    }),
    {
      name: "certificate-storage",
    }
  )
);
