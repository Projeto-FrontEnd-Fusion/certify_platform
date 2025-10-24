import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FakeStorePayload {
  _id: string;
  fullname: string;
  role: "user" | "admin";
  email: string;
}

interface useFakeStoreProps {
  auth: FakeStorePayload | null;
  setFakeLogin: (user: FakeStorePayload) => void;
  fakeLogout: () => void;
}

export const useFakeStore = create<useFakeStoreProps>()(
  persist(
    (set) => ({
      auth: null,
      setFakeLogin: (user) =>
        set({
          auth: user,
        }),
      fakeLogout: () => set({ auth: null }),
    }),
    {
      name: "fake-auth-storage",
    }
  )
);