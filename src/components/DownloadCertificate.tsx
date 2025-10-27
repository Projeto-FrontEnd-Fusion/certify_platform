import { LuDownload } from "react-icons/lu";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export const DownloadCertificate = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("DevInsigths");
  };

  const handleDownloadPng = async () => {
    if (!printRef.current || !linkRef.current) return;

    const canvas = await html2canvas(printRef.current);

    canvas.toBlob((blob) => {
      if (!blob || !linkRef.current) return;

      const url = URL.createObjectURL(blob);
      linkRef.current.href = url;
      linkRef.current.download = "DevInsigths";
      linkRef.current.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

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
        {["PDF", "PNG"].map((methods) => (
          <a
            ref={methods === "PNG" ? linkRef : null}
            onClick={methods === "PDF" ? handleDownloadPdf : handleDownloadPng}
            key={methods}
            className="flex items-center gap-2 py-2 bg-[#3925DD] w-26 justify-center text-white text-xl rounded cursor-pointer duration-300 transition-transform hover:scale-105"
          >
            {methods} <LuDownload size={20} />
          </a>
        ))}
      </div>
    </section>
  );
};
