import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";

// Mock API call function
const mockForgotPasswordApi = async (identifier: string): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success for demonstration
      // If you want to simulate an error, you can conditionally reject based on the identifier
      if (identifier.includes("erro")) {
        reject(new Error("Usuário não encontrado."));
      } else {
        resolve({ success: true, message: "Código de recuperação enviado!" });
      }
    }, 2000); // 2 seconds delay to show loading state
  });
};

export const useForgotPasswordAuth = () => {
  const { data, isSuccess, isPending, mutate, isError, error } = useMutation({
    mutationFn: (identifier: string) => mockForgotPasswordApi(identifier),
    mutationKey: ['forgot-password-auth'],
    onSuccess: () => {
      toast.success('Se o usuário existir, um código foi enviado.', {
        position: "top-center",
        autoClose: 3000,
        ...TOAST_STYLES.success
      });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Erro ao solicitar recuperação', {
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
