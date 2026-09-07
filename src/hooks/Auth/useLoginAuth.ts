import { type ApiAuthResponse, type AuthUserReponse, type SucessResponse } from "@/api/@types"
import { useMutation } from "@tanstack/react-query"
import { authServiceInstance } from "@/api/implements"
import type { LoginSchemaType } from "@/schemas/Login"
import { useAuthStoreData } from "@/stores/useAuthStore"
import { toast } from "react-toastify"
import { TOAST_STYLES } from "@/pages/ToastStyleContainer"
import { getApiErrorMessage } from "@/api/getApiErrorMessage"

export const useLoginAuth = () => {
  const { setAuthLogin } = useAuthStoreData()
  const signUpMutation = authServiceInstance 

  const { data, isSuccess, isPending, mutate, isError, error } = useMutation<ApiAuthResponse, Error, LoginSchemaType>({
    mutationFn: (data: LoginSchemaType) => signUpMutation.login(data),
    mutationKey: ['login-auth'],
    onSuccess: (data) => {
      try {
        if (!data || typeof data !== 'object') {
          console.error("Resposta de autenticação inválida")
          return
        }
        
        const response = data as SucessResponse
        const formattedData = response.data?.auth
        
        if (formattedData && response.data.access_token && response.data.refresh_token) {
          setAuthLogin(
            formattedData,
            response.data.access_token,
            response.data.refresh_token
          )
        } else {
          throw new Error("Resposta de autenticação sem usuário ou tokens")
        }
      } catch (err) {
        console.error("Erro ao processar resposta de login:", err)
      }
    },
    onError: (err: Error) => {
         toast.error(getApiErrorMessage(err, 'E-mail ou senha inválidos.'), {
            position: "top-center",
            autoClose: 5000,
            ...TOAST_STYLES.error
          });
      console.error(err)
    }
  })

  const formatteData = (data: ApiAuthResponse): AuthUserReponse | null => {
    try {
      const dataTransform = data as SucessResponse
      
      if (!dataTransform?.data?.auth) {
        console.error("Estrutura de resposta inválida")
        return null
      }
      
      return dataTransform.data.auth
    } catch (err) {
      console.error("Erro ao formatar dados de autenticação:", err)
      return null
    }
  }

  const dataAuthApi = data ? formatteData(data) : null

  return { 
    dataAuthApi, 
    isPending, 
    isSuccess, 
    mutate, 
    isError,
    error 
  }
}
