import html2canvas from "html2canvas-pro";
import type { IDownload } from "@/types/Download";
import jsPDF from "jspdf";

export class DownloadService {
  async generatePDF({ element, fileName }: IDownload) {
    if (!element) return alert("Elemento não encontrado!");

    const canvas = await html2canvas(element, { scale: 10 });
    const imgData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF("l", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  }

  /* canvas.toBlob uses a callback and is asynchronous,
     so we wrap it in a Promise to use await and handle errors properly */
  async generatePNG({ element, fileName }: IDownload) {
    if (!element) return alert("Elemento não encontrado!");
    const canvas = await html2canvas(element, { scale: 4 });
    await new Promise<void>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error());
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.png`;
        a.click();
        URL.revokeObjectURL(url);
        resolve();
      }, "image/png");
    });
  }
}
