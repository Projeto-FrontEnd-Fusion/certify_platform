import { useAuthStoreData } from "@/stores/useAuthStore";
import { AcessKey } from "./AcessKey";
import { useCheckAvailableCertificate } from "@/hooks/Certificate/useCheckAvailable";


export interface ProtectedCertificated {
  children: React.ReactNode;
}

export const ProtecteCertificateRouter = ({ children }: ProtectedCertificated) => {
  const { auth } = useAuthStoreData();
  
  const hasValidAuth = auth?.status !== undefined && auth.status;
  const userId = auth?._id || "";
  
  const { data, isLoading, error } = useCheckAvailableCertificate(userId, {
    enabled: hasValidAuth && !!userId
  });

  console.log({
    "o certificado está com status available": hasValidAuth,
    "Esse é o meu auth status": auth?.status,
    "Esses são meus dados do Data": data?.data.certificate
  });

  if (!hasValidAuth || error) {
    return <AcessKey />;
  }

  if (isLoading) {
    return <div>Carregando...</div>; 
  }

  return <>{children}</>;
};