import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CertificateFormData } from "@/schemas/CertificateSchema";

export type CertificateDraft = {
  id: string;
  savedAt: string;
  data: CertificateFormData;
};

type CertificateDraftState = {
  drafts: CertificateDraft[];
  activeDraftId: string | null;
  saveDraft: (data: CertificateFormData) => void;
  deleteDraft: (id: string) => void;
  startNewDraft: () => void;
};

export const selectActiveDraftSavedAt = (state: CertificateDraftState) =>
  state.drafts.find((draft) => draft.id === state.activeDraftId)?.savedAt ?? null;

export const useCertificateDraftStore = create<CertificateDraftState>()(
  persist(
    (set, get) => ({
      drafts: [],
      activeDraftId: null,

      saveDraft: (data) => {
        const id = get().activeDraftId ?? crypto.randomUUID();
        const draft: CertificateDraft = { id, data, savedAt: new Date().toISOString() };

        set(({ drafts }) => {
          const alreadyExists = drafts.some((current) => current.id === id);

          return {
            activeDraftId: id,
            drafts: alreadyExists
              ? drafts.map((current) => (current.id === id ? draft : current))
              : [draft, ...drafts],
          };
        });
      },

      deleteDraft: (id) =>
        set(({ drafts, activeDraftId }) => ({
          drafts: drafts.filter((draft) => draft.id !== id),
          activeDraftId: activeDraftId === id ? null : activeDraftId,
        })),

      startNewDraft: () => set({ activeDraftId: null }),

    }),
    { name: "certificate-drafts-storage" },
  ),
);