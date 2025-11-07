import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";
import { DummyCertificade } from "./DummyCertificate";
import { Download } from "@/utils/Download";

export const DownloadButton = () => {
  const { activeMethod, loadingMethods, printRef, setActiveMethod } = Download({
    fileName: "certificado_dev_insights",
  });

  return (
    <>
      {activeMethod && <DummyCertificade printRef={printRef} />}
      {(["PDF", "PNG"] as const).map((method) => (
        <button
          key={method}
          type="button"
          title={`Fazer download do certificado em ${method}`}
          disabled={loadingMethods[method]}
          onClick={() => setActiveMethod(method)}
          className="flex items-center gap-2 py-2 bg-[#3925DD] w-26 justify-center text-white text-xl rounded cursor-pointer duration-300 transition-transform md:w-48 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105"
        >
          {loadingMethods[method] ? (
            <AiOutlineLoading3Quarters size={28} className="animate-spin" />
          ) : (
            <>
              {method} <LuDownload size={20} />
            </>
          )}
        </button>
      ))}
    </>
  );
};
