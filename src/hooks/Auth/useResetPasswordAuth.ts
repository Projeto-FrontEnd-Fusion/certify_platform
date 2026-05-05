import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";

// Mock API call function
const mockResetPasswordApi = async (password: string): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "error123") {
        reject(new Error("Erro ao redefinir a senha. Tente novamente."));
      } else {
        resolve({ success: true, message: "Senha redefinida com sucesso!" });
      }
    }, 1500); // 1.5 seconds delay to show loading state
  });
};

export const useResetPasswordAuth = () => {
  const { data, isSuccess, isPending, mutate, isError, error } = useMutation({
    mutationFn: (password: string) => mockResetPasswordApi(password),
    mutationKey: ['reset-password-auth'],
    onSuccess: () => {
      toast.success('Senha alterada com sucesso!', {
        position: "top-center",
        autoClose: 3000,
        ...TOAST_STYLES.success
      });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Erro ao redefinir a senha.', {
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
