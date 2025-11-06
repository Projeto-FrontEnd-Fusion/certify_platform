import type { CertificateRequest } from "@/api/Certificate/CertificateService"
import { certificateServiceInstance } from "@/api/implements"
import { TOAST_STYLES } from "@/pages/ToastStyleContainer"
import { useAuthStoreData } from "@/stores/useAuthStore"
import { useCertificateStoreData } from "@/stores/useCertificateStore"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { toast } from "react-toastify"

export const useCreateCertificate = () =>  {
  const {setAuthLogin} = useAuthStoreData()
  const {setcertificate} = useCertificateStoreData()
  const certificatemutation = certificateServiceInstance

  const {data, mutate, isError, isPending} = useMutation({
    mutationFn : (
      {userId,certificate_data}:{userId:string,certificate_data:CertificateRequest}
    ) => certificatemutation.createCertificate(userId,certificate_data),
    onSuccess : (data) => {


      console.log("Certificate created successfully!", data);
      setAuthLogin({status : "available"})
      setcertificate(data.data.certificate)


       toast.success('Certificado Disponivel', {
            position: "top-center",
            autoClose: 5000,
            ...TOAST_STYLES.success
          })
      
    },
    onError : (error: AxiosError<any>) => {
      const errorMessage =
    (error.response?.data as { message?: string })?.message ||
    error.message ||
    "Ocorreu um erro inesperado.";
    console.log(error)

  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 5000,
    ...TOAST_STYLES.error,
  });

    }
  })

  return {data, mutate, isError, isPending}
}