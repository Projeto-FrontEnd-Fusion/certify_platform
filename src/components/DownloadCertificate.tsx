import { LuDownload } from "react-icons/lu";
import { useRef } from "react";
import { useDownload } from "@/hooks/useDownload";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const DownloadCertificate = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const { loadingMethod, handleDownload } = useDownload();

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
        {(["PDF", "PNG"] as const).map((methods) => (
          <button
            key={methods}
            type="button"
            disabled={loadingMethod === methods}
            onClick={() =>
              handleDownload({
                element: printRef.current,
                fileName: "DevInsigths",
                method: methods,
              })
            }
            className="flex items-center gap-2 py-2 bg-[#3925DD] w-26 justify-center text-white text-xl rounded cursor-pointer duration-300 transition-transform hover:scale-105"
          >
            {loadingMethod === methods ? (
              <AiOutlineLoading3Quarters size={20} className="animate-spin" />
            ) : (
              <>
                {`${methods}`} <LuDownload size={20} />
              </>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
