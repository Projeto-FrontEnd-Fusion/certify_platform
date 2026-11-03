import type { UploadedImage } from "@/schemas/CertificateSchema";
import { formatFileSize } from "@/utils/formatFileSize";
import { FaCheckCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

type SentFileProps = {
  label: string;
  image?: UploadedImage;
};

export function SentFile({ label, image }: SentFileProps) {
  const isSent = Boolean(image);

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-[#262626] font-semibold text-xs">{label}</label>
        <FaCheckCircle className={`w-4 h-4 ${isSent ? "text-[#10B981]" : "text-[#D4D4D4]"}`} />
      </div>

      <div className="flex items-center justify-between border border-[#E2E8F0] p-3 rounded-xl mt-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2 w-max rounded-lg ${isSent ? "bg-[#ECFDF5]" : "bg-[#F5F5F5]"}`}>
            <FiFileText className={`w-5 h-5 ${isSent ? "text-[#059669]" : "text-[#A1A1A1]"}`} />
          </div>

          <div className="flex flex-col min-w-0">
            <p className="text-[#262626] font-medium text-xs truncate">
              {image ? image.name : "Nenhum arquivo enviado"}
            </p>

            {image && (
              <p className="text-[#A1A1A1] font-normal text-[10px]">
                {image.type} • {formatFileSize(image.size)}
              </p>
            )}
          </div>
        </div>

        <p className={`font-medium text-xs shrink-0 ml-3 ${isSent ? "text-[#059669]" : "text-[#A1A1A1]"}`}>
          {isSent ? "Enviado com sucesso" : "Não enviado"}
        </p>
      </div>
    </div>
  );
}