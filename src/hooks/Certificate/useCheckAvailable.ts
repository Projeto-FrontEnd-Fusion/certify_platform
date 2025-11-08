import type { CertificateResponse } from "@/api/@types"
import type { CertificateInDb } from "@/api/Certificate/@types"
import { certificateServiceInstance } from "@/api/implements"
import { useCertificateStoreData } from "@/stores/useCertificateStore"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useCheckAvailableCertificate = (certificateId: string) => {
  const { setcertificate } = useCertificateStoreData()
  
  const QUERY_KEY = ['user-certificate', certificateId]
  const queryFn = certificateServiceInstance

  const { data, isLoading, isError, refetch, error } = useQuery<CertificateResponse, AxiosError>({
    queryFn: async () => {
      const response = await queryFn.findCertificateById(certificateId)
      
      if (response?.data?.certificate) {
        console.log("Aporra do certificado foi encontrado", response.data)
        setcertificate(response.data.certificate as CertificateInDb)
      }
      return response
      
    },
    queryKey: QUERY_KEY,
    
    
  })


  return { data, isError, isLoading, refetch, error }
}