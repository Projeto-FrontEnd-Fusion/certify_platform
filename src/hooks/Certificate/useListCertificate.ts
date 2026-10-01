import type { CertificateResponse } from "@/api/@types"
import { useAuthStoreData } from "@/stores/useAuthStore"
import { certificateServiceInstance } from "@/api/implements"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export function useListCertificateByUserId() {

  const {auth} = useAuthStoreData()

  //console.log(auth?._id);

  return useQuery<CertificateResponse, AxiosError>({

    enabled: !!auth,

    queryKey: ['user_id', auth?._id],
    
    queryFn: async () => {
      const response = await certificateServiceInstance.listCertificateByUserId(auth!._id)
      
      if (response?.data) {
        //console.log("Aporra do certificado foi encontrado", response.data.certificate[0].participant_email)
      }
      return response as CertificateResponse;
    },
    
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}