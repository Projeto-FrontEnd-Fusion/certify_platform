import { type ApiAuthResponse, type AuthUserReponse, type SucessResponse } from "@/api/@types"
import type { SignUpSchemaType } from "@/schemas/SignUp"
import { useMutation } from "@tanstack/react-query"
import { authServiceInstance } from "@/api/implements"

interface SignUpType extends SignUpSchemaType {
  role: string
}

export const useAuthSignUp = () => {
  const signUpMutation = authServiceInstance 
  
  const { data, isSuccess, isPending, mutate, isError, error } = useMutation<ApiAuthResponse, Error, SignUpType>({
    mutationFn: (data: SignUpType) => signUpMutation.signUp(data),
    mutationKey: ['signup-auth'],
    onSuccess: (data) => {
      console.log("Usuário registrado com sucesso", data)
    },
    onError: (err: Error) => {
      console.error("Falha ao registrar usuário:", err.message)
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