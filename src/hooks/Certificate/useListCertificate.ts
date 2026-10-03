import type { CertificateListResponse } from "@/api/@types"
import { useAuthStoreData } from "@/stores/useAuthStore"
import { certificateServiceInstance } from "@/api/implements"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export function useListCertificateByUserId() {

  const {auth} = useAuthStoreData()

  //console.log(auth?._id);

  return useQuery<CertificateListResponse, AxiosError>({

    enabled: !!auth?._id,

    queryKey: ['certificate', 'list', auth?._id],
    
    queryFn: async () => {
      
      const response = await certificateServiceInstance.listCertificateByUserId(auth!._id)
      
      return response;
    },
    
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

}