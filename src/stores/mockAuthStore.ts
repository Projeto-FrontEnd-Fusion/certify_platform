import { TOAST_STYLES } from "@/pages/ToastStyleContainer";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FakeStorePayload {
  status?: "pending" | "authorized";
  acessKey?: string[] | string | null;
}

interface UseFakeStoreProps {
  fakeAccess: FakeStorePayload;
  setFakeAccess: (payload: FakeStorePayload) => void;
}

export const useFakeStore = create<UseFakeStoreProps>()(
  persist(
    (set) => ({
      fakeAccess: { status: "pending", acessKey: null },
      setFakeAccess: (payload: FakeStorePayload) => {
        if (payload.acessKey === "ABC12") {
          return set({
            fakeAccess: { status: "authorized" },
          });
        }
        toast.error("Credenciais Inválidas", {
          position: "top-center",
          autoClose: 1500,
          ...TOAST_STYLES.error,
        });
        set({ fakeAccess: payload });
      },
    }),
    {
      name: "fake-access-storage",
    }
  )
);
