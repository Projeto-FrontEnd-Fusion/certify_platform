import { type ApiAuthResponse, type AuthUserReponse, type SucessResponse } from "@/api/@types"
import { useMutation } from "@tanstack/react-query"
import { authServiceInstance } from "@/api/implements"
import { getApiErrorMessage } from "@/api/getApiErrorMessage"
import { toast } from "react-toastify"
import { TOAST_STYLES } from "@/pages/ToastStyleContainer"

interface SignUpType {
  fullname: string
  email: string
  password: string
  cpf?: string
  cnpj?: string
  organizationName?: string
  occupation?: string
  phone?: string
  role: string
  razao_social?: string
}

export const useAuthSignUp = () => {
  const signUpMutation = authServiceInstance 
  
  const { data, isSuccess, isPending, mutate, isError, error } = useMutation<ApiAuthResponse, Error, SignUpType>({
    mutationFn: (data: SignUpType) => data.role === "empresa"
      ? signUpMutation.signUpCompany(
          data as Parameters<typeof signUpMutation.signUpCompany>[0]
        )
      : signUpMutation.signUp(data),
    mutationKey: ['signup-auth'],
    onSuccess: (data) => {
      console.log("Usuário registrado com sucesso", data)
    },
    onError: (err: Error) => {
      toast.error(getApiErrorMessage(err, "Falha ao realizar cadastro."), {
        position: "top-center",
        autoClose: 5000,
        ...TOAST_STYLES.error,
      })
    }
  })

  const formatteData = (data: ApiAuthResponse): AuthUserReponse | null => {
    try {
      const dataTransform = data as SucessResponse
      
      if (!dataTransform?.data?.auth) {
        return null
      }
      
      return dataTransform.data.auth
    } catch {
      return null
    }
  }

  const dataAuthApi = data ? formatteData(data) : null

  return { 
    dataAuthApi, 
    isPending, 
    mutate, 
    isError, 
    isSuccess,
    error
  }
}
