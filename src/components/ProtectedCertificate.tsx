import { useAuthStoreData } from "@/stores/useAuthStore";
import { AcessKey } from "./AcessKey";
import { useCheckAvailableCertificate } from "@/hooks/Certificate/useCheckAvailable";


export interface ProtectedCertificated {
  children: React.ReactNode;
}

export const ProtecteCertificateRouter = ({ children }: ProtectedCertificated) => {
  return <>{children}</>;
};