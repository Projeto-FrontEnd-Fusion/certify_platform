import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface authPayload {
  _id: string;
  fullname?: string;
  role: "user" | "admin";
  email: string;
  created_at?: Date,
  updated_at?: Date 
}

interface authStoreProps {
  auth: authPayload | null;
  setAuthLogin: (auth: authPayload) => void;
  authLogout: () => void;
}

export const useAuthStoreData = create<authStoreProps>()(
  persist(
    (set) => ({
      auth: null,
      setAuthLogin: (auth) =>
        set({
          auth: auth,
        }),
      authLogout: () => set({ auth: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);