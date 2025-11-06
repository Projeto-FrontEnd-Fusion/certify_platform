import { Certificate } from "@/components/Certificate";
import { DownloadButton } from "@/components/DownloadButton";


export const DownloadCertificate = () => {
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
      <Certificate />

      <div className="flex gap-20">
        <DownloadButton />
      </div>
    </section>
  );
};
