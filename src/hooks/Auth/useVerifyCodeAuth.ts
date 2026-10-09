import { authServiceInstance } from '@/api/implements';
import { getApiErrorMessage } from '@/api/getApiErrorMessage';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";

export const useVerifyCodeAuth = () => {
  const { data, isSuccess, isPending, mutate, isError, error, reset } = useMutation({
    mutationFn: (payload: {email: string; code: string}) => authServiceInstance.verifyCode(payload.email, payload.code),
    mutationKey: ['verify-code-auth'],
    onSuccess: () => {
      toast.success('Código validado com sucesso!', {
        position: "top-center",
        autoClose: 3000,
        ...TOAST_STYLES.success
      });
    },
    onError: (err: Error) => {
      toast.error(getApiErrorMessage(err, 'Erro na solicitação') || 'Código inválido ou expirado.', {
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
    error,
    reset
  };
};
