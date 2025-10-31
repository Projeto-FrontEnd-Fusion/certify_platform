import { useCallback, useRef, useState } from "react";
import type { IDownload } from "@/types/Download";
import { DownloadService } from "@/services/DownloadService";

export const useDownload = () => {
  const [loadingMethods, setLoadingMethods] = useState<{
    [key: string]: boolean;
  }>({});
  const { current } = useRef(new DownloadService());

  const handleDownload = useCallback(
    async ({ element, fileName, method }: IDownload) => {
      setLoadingMethods((prev) => ({ ...prev, [method]: true }));
      try {
        if (method === "PDF") {
          await current.generatePDF({ element, fileName, method });
        } else {
          await current.generatePNG({ element, fileName, method });
        }
      } catch (error) {
        console.error(`Erro ao gerar o arquivo ${method}`, error);
        alert(`Falha ao gerar o arquivo ${method}`);
      } finally {
        setLoadingMethods((prev) => ({ ...prev, [method]: false }));
      }
    },
    [current]
  );

  return { handleDownload, loadingMethods };
};
