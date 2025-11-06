import { useAuthStoreData } from "@/stores/useAuthStore";
import { AcessKey } from "./AcessKey";

export interface ProtectedCertificated {
  children: React.ReactNode;
}

export const ProtecteCertificateRouter = ({ children }: ProtectedCertificated) => {
  const { auth } = useAuthStoreData();
  const certificateStatus = auth?.status === "available";

  if (!certificateStatus) {
    return <AcessKey onClose={() => true} />;
  }

  return <>{children}</>;
};
