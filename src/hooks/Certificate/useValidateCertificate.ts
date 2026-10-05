import type { CertificateResponse } from "@/api/@types"
import { certificateServiceInstance } from "@/api/implements"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export function useValidateCertificate(access_key: string) {


  return useQuery<CertificateResponse, AxiosError>({

    enabled: !!access_key,

    queryKey: ['certificate', 'validate', access_key],
    
    queryFn: async () => {
      
      const response = await certificateServiceInstance.validateCertificate(access_key);
      
      return response;
    },
    
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

}