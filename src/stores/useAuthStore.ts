import { create } from "zustand";
import { persist } from "zustand/middleware";

export type status = "pending" | "available" | "expired";

export interface authPayload {
  _id: string;
  fullname?: string;
  role: "user" | "admin";
  email: string;
  created_at?: Date;
  updated_at?: Date;
  status: status;
}

interface authStoreProps {
  auth: authPayload | null;
  setAuthLogin: (authData: Partial<authPayload>) => void;
  authLogout: () => void;
}

export const useAuthStoreData = create<authStoreProps>()(
  persist(
    (set) => ({
      auth: null,

      setAuthLogin: (authData) =>
        set((state) => ({
          auth: state.auth ? { ...state.auth, ...authData } : (authData as authPayload),
        })),

      authLogout: () => set({ auth: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
