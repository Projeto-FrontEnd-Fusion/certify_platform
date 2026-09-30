import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CertificateSelectTemplate } from "@/components/certificates/CertificateSelectTemplate";
import { createDraft } from "@/lib/certificate-draft";
import { selectTemplateSchema, variantSchema, type SelectTemplateData } from "@/schemas/CertificateSchema";

type SelectTemplateModalProps = {
  onClose: () => void;
  defaultVariant?: SelectTemplateData["variant"];
  onConfirm?: (variant: SelectTemplateData["variant"]) => void;
};

export function SelectTemplateModal({
  onClose,
  defaultVariant = "classico",
  onConfirm,
}: SelectTemplateModalProps) {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<SelectTemplateData>({
    resolver: zodResolver(selectTemplateSchema),
    defaultValues: { variant: defaultVariant },
  });

  function onSubmit({ variant }: SelectTemplateData) {
    if (onConfirm) {
      onConfirm(variant);
      onClose();
      return;
    }

    const id = createDraft(variant);
    navigate(`/empresa/certificados/criar/${id}`);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-[920px] bg-white shadow-xl px-4 py-6"
      >
        <div className="flex justify-between items-start mb-9">
          <div>
            <h2 className="font-bold text-lg text-[#171717]">Escolher modelo</h2>
            <p className="text-[#64748B] text-xs font-normal">
              Selecione um modelo para iniciar a criação do certificado.
            </p>
          </div>

          <button type="button" onClick={onClose}>
            <IoMdClose className="w-5 h-5 text-[#64748B] hover:opacity-50 cursor-pointer" />
          </button>
        </div>

        <Controller
          control={control}
          name="variant"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              {variantSchema.options.map((variant) => (
                <CertificateSelectTemplate
                  key={variant}
                  variant={variant}
                  selected={field.value === variant}
                  onSelect={field.onChange}
                />
              ))}
            </div>
          )}
        />

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-sm border-2 border-[#F3F4F6] rounded-md px-5 py-3 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="font-semibold text-sm bg-[#0069A8] px-5 py-3 text-white rounded-md cursor-pointer"
          >
            Usar modelo
          </button>
        </div>
      </form>
    </div>
  );
}