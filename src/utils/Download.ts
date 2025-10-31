import { useDownload } from "@/hooks/useDownload";
import { useEffect, useRef, useState } from "react";
import type { IDownloadButton } from "@/types/DownloadButton";

export const Download = ({ fileName }: IDownloadButton) => {
  const printRef = useRef<HTMLDivElement | null>(null);
  const [activeMethod, setActiveMethod] = useState<"PDF" | "PNG" | null>(null);
  const { loadingMethods, handleDownload } = useDownload();

  useEffect(() => {
    if (!activeMethod) return;
    if (!printRef.current) return;

    const download = async () => {
      await handleDownload({
        element: printRef.current,
        fileName,
        method: activeMethod,
      });
      setActiveMethod(null);
    };

    download();
  }, [activeMethod, handleDownload, fileName]);

  return { printRef, activeMethod, loadingMethods, setActiveMethod };
};
