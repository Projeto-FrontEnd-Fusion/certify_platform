import { useState } from "react";
import type { IDownload } from "@/types/Download";
import { DownloadService } from "@/services/DownloadService";

export const useDownload = () => {
  const [loadingMethod, setLoadingMethod] = useState<"PNG" | "PDF" | null>();
  const service = new DownloadService();

  const handleDownload = async ({ element, fileName, method }: IDownload) => {
    if (!element) return alert("Certificado não encontrado");
    setLoadingMethod(method);

    try {
      if (method === "PDF") {
        await service.generatePDF({ element, fileName, method });
      } else {
        await service.generatePNG({ element, fileName, method });
      }
    } catch (error) {
      console.error(`Erro ao gerar o arquivo ${method}`, error);
      alert(`Falha ao gerar o arquivo ${method}`);
    } finally {
      setLoadingMethod(null);
    }
  };

  return { handleDownload, loadingMethod };
};
