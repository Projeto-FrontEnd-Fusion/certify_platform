import { type ApiAuthResponse, type AuthUserReponse, type SucessResponse } from "@/api/@types"
import { useMutation } from "@tanstack/react-query"
import { authServiceInstance } from "@/api/implements"
import type { LoginSchemaType } from "@/schemas/Login"
import { authStoreData } from "@/stores/useAuthStore"

export const useLoginAuth = () => {
  const { setAuthLogin } = authStoreData()
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
        
        const formattedData = formatteData(data)
        
        if (formattedData && isValidAuthResponse(formattedData)) {
          setAuthLogin(formattedData)
        } else {
          console.error("Dados de autenticação formatados são inválidos")
        }
      } catch (err) {
        console.error("Erro ao processar resposta de login:", err)
      }
    },
    onError: (err: Error) => {
      console.error("Falha ao autenticar usuário:", err.message)
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

  const isValidAuthResponse = (auth: AuthUserReponse): boolean => {
    return auth !== null && typeof auth === 'object'
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