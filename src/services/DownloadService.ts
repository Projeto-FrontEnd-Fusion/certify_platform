import html2canvas from "html2canvas-pro";
import type { IDownload } from "@/types/Download";
import jsPDF from "jspdf";

export class DownloadService {
  async generatePDF({ element, fileName }: IDownload) {
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 4 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  }

  async generatePNG({ element, fileName }: IDownload) {
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 4 });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }
}
