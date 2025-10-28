
import { useRef } from "react";
import { DownloadButton } from "@/components/DownloadButton";

export const DownloadCertificate = () => {
  const printRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="bg-[#F2F2F9] h-full font-inter flex flex-col items-center pt-13 gap-4">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold text-[#1A1551]">
          Seu certificado está pronto!!
        </h2>
        <p className="text-[#1a1551cc]">
          Parabéns pela conquista! Agora você pode baixar e compartilhar seu
          reconhecimento.
        </p>
      </div>

      <div
        ref={printRef}
        className="p-4 border border-gray-300 bg-white text-[#1A1551]"
      >
        <h1 className="text-xl font-bold mb-2">Certificado DevInsights</h1>
        <p>Aqui vai a descrição do certificado</p>
      </div>

      <div className="flex gap-2">
        <DownloadButton Reference={printRef} fileName="DevInsigths" />
      </div>
    </section>
  );
};
