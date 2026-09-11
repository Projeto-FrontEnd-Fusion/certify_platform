import { create } from "zustand";
import { persist } from "zustand/middleware";

export type status = "pending" | "available" | "expired";

export interface authPayload {
  _id: string;
  fullname?: string;
  razao_social?: string;
  role: "user" | "admin" | "empresa";
  email: string;
  created_at?: string;
  updated_at?: string;
  status?: status;
}

interface authStoreProps {
  auth: authPayload | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuthLogin: (
    authData: authPayload,
    accessToken: string,
    refreshToken: string
  ) => void;
  authLogout: () => void;
  updateAuth: (updates: Partial<authPayload>) => void;
}

export const useAuthStoreData = create<authStoreProps>()(
  persist(
    (set) => ({
      auth: null,
      accessToken: null,
      refreshToken: null,

      setAuthLogin: (authData, accessToken, refreshToken) =>
        set({ auth: authData, accessToken, refreshToken }),
      updateAuth: (updates) => set((state) => ({
        auth: state.auth ? { ...state.auth, ...updates } : null,
      })),

      authLogout: () =>
        set({ auth: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
