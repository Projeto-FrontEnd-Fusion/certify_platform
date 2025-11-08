import { useAuthStoreData } from "@/stores/useAuthStore";
import { AcessKey } from "./AcessKey";
import { useCheckAvailableCertificate } from "@/hooks/Certificate/useCheckAvailable";


export interface ProtectedCertificated {
  children: React.ReactNode;
}

export const ProtecteCertificateRouter = ({ children }: ProtectedCertificated) => {
  const { auth } = useAuthStoreData();
  const { data, isLoading, refetch } = useCheckAvailableCertificate(auth?._id!);

  console.log(data)


  if(auth?.status !== "available"){
    refetch()
    return <AcessKey />
  }

  if (isLoading) {
    return <div>Carregando...</div>; 
  }

  return <>{children}</>;
};