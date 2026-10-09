import { authServiceInstance } from '@/api/implements';
import { getApiErrorMessage } from '@/api/getApiErrorMessage';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";

export const useForgotPasswordAuth = () => {
  const { data, isSuccess, isPending, mutate, isError, error } = useMutation({
    mutationFn: (email: string) => authServiceInstance.forgotPassword(email),
    mutationKey: ['forgot-password-auth'],
    onSuccess: () => {
      toast.success('Se o usuário existir, um código foi enviado.', {
        position: "top-center",
        autoClose: 3000,
        ...TOAST_STYLES.success
      });
    },
    onError: (err: Error) => {
      toast.error(getApiErrorMessage(err, 'Erro na solicitação') || 'Erro ao solicitar recuperação', {
        position: "top-center",
        autoClose: 5000,
        ...TOAST_STYLES.error
      });
      console.error(err);
    }
  });

  return { 
    data, 
    isPending, 
    isSuccess, 
    mutate, 
    isError,
    error 
  };
};
