import { authServiceInstance } from '@/api/implements';
import { getApiErrorMessage } from '@/api/getApiErrorMessage';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";

export const useResetPasswordAuth = () => {
  const { data, isSuccess, isPending, mutate, isError, error } = useMutation({
    mutationFn: (payload: {email: string; code: string; new_password: string}) => authServiceInstance.resetPassword(payload.email, payload.code, payload.new_password),
    mutationKey: ['reset-password-auth'],
    onSuccess: () => {
      toast.success('Senha alterada com sucesso!', {
        position: "top-center",
        autoClose: 3000,
        ...TOAST_STYLES.success
      });
    },
    onError: (err: Error) => {
      toast.error(getApiErrorMessage(err, 'Erro na solicitação') || 'Erro ao redefinir a senha.', {
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
