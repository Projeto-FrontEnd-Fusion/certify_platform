import { Certificate } from "@/components/Certificate";
import { DownloadButton } from "@/components/DownloadButton";
import { useCertificateStoreData } from "@/stores/useCertificateStore";
import { Navigate } from "react-router-dom";

export const DownloadCertificate = () => {
  const { Access } = useCertificateStoreData();

  if (Access.status === "pending")
    return <Navigate replace to={"/meus-certificados"} />;
  return (
    <section className="bg-[#F2F2F9] h-600px font-inter flex flex-col items-center  py-13 gap-4 relative">
      <div className="space-y-2 text-center max-w-[20rem] md:max-w-[30rem]">
        <h2 className="text-xl font-semibold text-[#1A1551] md:text-3xl">
          Seu certificado está pronto!!
        </h2>
        <p className="text-[#1a1551cc] md:text-lg">
          Parabéns pela conquista! Agora você pode baixar e compartilhar seu
          reconhecimento.
        </p>
      </div>
      <Certificate />

      {/* max-[370px]:scale-[0.2] min-[370px]:scale-[0.3] min-[500px]:scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.8] 
        xl:scale-100 */}

      <div className="flex gap-3 absolute top-[25rem] min-[370px]:top-[27rem] min-[500px]:top-[32rem]  min-[500px]:gap-6 sm:gap-10 sm:top-[37rem] md:top-[41.5rem] lg:top-[51.5rem] xl:static">
        <DownloadButton />
      </div>
    </section>
  );
};
