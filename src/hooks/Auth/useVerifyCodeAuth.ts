import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";

// Mock API call function
const mockVerifyCodeApi = async (code: string): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success for demonstration
      // Reject if code is 00000 or anything you want to simulate error
      if (code === "00000") {
        reject(new Error("Código inválido ou expirado."));
      } else {
        resolve({ success: true, message: "Código validado com sucesso!" });
      }
    }, 1500); // 1.5 seconds delay to show loading state
  });
};

export const useVerifyCodeAuth = () => {
  const { data, isSuccess, isPending, mutate, isError, error, reset } = useMutation({
    mutationFn: (code: string) => mockVerifyCodeApi(code),
    mutationKey: ['verify-code-auth'],
    onSuccess: () => {
      toast.success('Código validado com sucesso!', {
        position: "top-center",
        autoClose: 3000,
        ...TOAST_STYLES.success
      });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Código inválido ou expirado.', {
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
