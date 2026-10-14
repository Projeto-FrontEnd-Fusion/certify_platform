import type { CertificateFormData } from "@/schemas/CertificateSchema";
import type { ChangeEvent } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MAX_IMAGE_SIZE } from "../constants";
import { toast } from "react-toastify";
import { fileToDataUrl } from "@/utils/fileToDataUrl";
import { IoDocumentTextOutline } from "react-icons/io5";
import { formatFileSize } from "@/utils/formatFileSize";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

type ImageFieldProps = {
  name: "logo" | "signature";
  label: string;
  hint: string;
  accept: string;
};

export function ImageField({ name, label, hint, accept }: ImageFieldProps) {
  const { control, setValue } = useFormContext<CertificateFormData>();
  const image = useWatch({ control, name });

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("A imagem deve ter até 200KB");
      return;
    }

    setValue(
      name,
      {
        dataUrl: await fileToDataUrl(file),
        name: file.name,
        type: file.type.split("/")[1].toUpperCase(),
        size: file.size,
      },
      { shouldDirty: true },
    );
  }

  function handleRemove() {
    setValue(name, undefined, { shouldDirty: true });
  }

  if (image) {
    return (
      <div
        onClick={handleRemove}
        className="flex flex-col gap-1.5 flex-1 cursor-pointer">
        <span className="text-sm font-semibold">{label}</span>

        <div className="flex justify-between items-center bg-[#F8FAFC80] border border-[#E2E8F0] rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 p-2.5 bg-[#F0FDFA] border border-[#00BBA7] rounded-lg flex justify-center items-center">
              <IoDocumentTextOutline className="text-[#00786F]" />
            </div>

            <div className="flex flex-col">
              <p className="text-[#334155] font-medium text-xs">{image.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-[#94A3B8] font-normal text-[10px]">{image.type}</span>
                <div className="w-0.5 h-0.5 bg-[#94A3B8] rounded-full"></div>
                <span className="text-[#94A3B8] font-normal text-[10px]">{formatFileSize(image.size)}</span>
              </div>
            </div>
          </div>

          <FaCheckCircle className="text-[#10B981]" />
        </div>

        <input type="file" accept={accept} className="hidden" onChange={handleChange} />
      </div>
    );
  }

  return (
    <label className="flex flex-col gap-1.5 flex-1 cursor-pointer">
      <span className="text-sm font-semibold">{label}</span>

      <div className="flex flex-col justify-center items-center w-full border border-dashed border-[#CBD5E1] h-[90px]">
        <MdOutlineFileUpload className="text-[#0069A8] w-3.5 h-3.5" />
        <p className="text-[#0069A8] text-xs font-medium">Clique para enviar</p>
        <p className="text-[#737373] text-[10px] font-normal">{hint}</p>
      </div>

      <input type="file" accept={accept} className="hidden" onChange={handleChange} />
    </label>
  );
}