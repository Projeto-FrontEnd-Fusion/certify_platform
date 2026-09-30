import type { ChangeEvent, ReactNode } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { CertificateTemplate } from "@/components/certificates/CertificateTemplate";
import { CustomSelect } from "@/components/certificates/CustomSelect";
import { ToggleSwitch } from "@/components/certificates/ToggleSwitch";
import {
  MAX_IMAGE_SIZE,
  activityOptions,
  descriptionOptions,
  modalityOptions,
  validityOptions,
  variantLabels,
} from "@/components/certificates/constants";
import type { CertificateFormData } from "@/schemas/CertificateSchema";
import { fileToDataUrl } from "@/utils/fileToDataUrl";
import { formatFileSize } from "@/utils/formatFileSize";
import { FaCheckCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";


type CertificateStepOneProps = {
  onNext: () => void;
  onChangeTemplate: () => void;
};

type FieldProps = {
  label?: string;
  error?: string;
  children: ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold">{label}</label>}
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

type SelectFieldProps = {
  name: "activityType" | "description" | "modality" | "validity";
  options: string[];
  placeholder: string;
  label?: string;
};

function SelectField({ name, options, placeholder, label }: SelectFieldProps) {
  const { control, formState: { errors } } = useFormContext<CertificateFormData>();

  return (
    <Field label={label} error={errors[name]?.message}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CustomSelect
            options={options}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </Field>
  );
}

type ToggleRowProps = {
  name: "modalityEnabled" | "validityEnabled" | "syllabusEnabled";
  label: string;
};

function ToggleRow({ name, label }: ToggleRowProps) {
  const { control } = useFormContext<CertificateFormData>();

  return (
    <div className="flex items-center gap-2">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ToggleSwitch checked={field.value} onChange={field.onChange} aria-label={label} />
        )}
      />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

type ImageFieldProps = {
  name: "logo" | "signature";
  label: string;
  hint: string;
  accept: string;
};

function ImageField({ name, label, hint, accept }: ImageFieldProps) {
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

export function CertificateStepOne({ onNext, onChangeTemplate }: CertificateStepOneProps) {
  const { register, control, formState: { errors } } = useFormContext<CertificateFormData>();

  const variant = useWatch({ control, name: "variant" });
  const modalityEnabled = useWatch({ control, name: "modalityEnabled" });
  const validityEnabled = useWatch({ control, name: "validityEnabled" });
  const syllabusEnabled = useWatch({ control, name: "syllabusEnabled" })

  return (
    <section className="mt-8 flex gap-6">
      <div className="w-full max-w-[322px] flex flex-col gap-8">
        <div className="bg-white border border-[#E2E8F0] rounded-md flex justify-between px-5 py-3.5">
          <div className="flex flex-col gap-0.5">
            <p className="text-[#94A3B8] text-xs font-normal">Modelo escolhido</p>
            <p className="text-[#0066B2] text-sm font-semibold">{variantLabels[variant]}</p>
          </div>

          <button
            type="button"
            onClick={onChangeTemplate}
            className="bg-white border border-[#0069A84D] rounded-md px-3 py-2 text-[#030712] font-semibold text-xs cursor-pointer"
          >
            Trocar modelo
          </button>
        </div>

        <CertificateTemplate variant={variant} />
      </div>

      <div className="flex-1 bg-white p-6 flex flex-col gap-4 rounded-md">
        <SelectField
          name="activityType"
          label="Tipo de atividade"
          options={activityOptions}
          placeholder="Selecione o tipo de atividade"
        />

        <SelectField
          name="description"
          label="Descrição da certificação"
          options={descriptionOptions}
          placeholder="Selecione a descrição de certificação"
        />

        <Field label="Nome da atividade" error={errors.activityName?.message}>
          <input
            {...register("activityName")}
            className="h-10 w-full rounded-sm border border-[#A1A1A133] bg-white px-3 text-xs text-[#404040] outline-none"
            placeholder="Ex: Introdução ao React"
          />
        </Field>

        <Field label="Carga horária" error={errors.workload?.message}>
          <input
            {...register("workload")}
            className="h-10 w-full rounded-sm border border-[#A1A1A133] bg-white px-3 text-xs text-[#404040] outline-none"
            placeholder="Ex: 40h"
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <ToggleRow name="modalityEnabled" label="Local ou modalidade" />
          {modalityEnabled && (
            <SelectField name="modality" options={modalityOptions} placeholder="Selecione a modalidade" />
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <ToggleRow name="validityEnabled" label="Validade" />
          {validityEnabled && (
            <SelectField name="validity" options={validityOptions} placeholder="Selecione a validade" />
          )}
        </div>

        <ToggleRow name="syllabusEnabled" label="Conteúdo programático" />
        {syllabusEnabled && (
          <Field error={errors.syllabus?.message}>
            <textarea
              {...register("syllabus")}
              className="h-10 w-full rounded-sm border border-[#A1A1A133] bg-white p-2.5 text-xs text-[#404040] outline-none"
              placeholder="Descreva o conteúdo programático da atividade"
            />
          </Field>
        )

        }

        <div className="flex gap-3.5">
          <ImageField name="logo" label="Upload do logo" hint="PNG ou JPG até 200KB" accept="image/png,image/jpeg" />
          <ImageField name="signature" label="Upload da assinatura" hint="PNG até 200KB" accept="image/png" />
        </div>

        <div className="h-0.5 w-full bg-[#F1F5F9] my-4" />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-white border border-[#0069A84D] rounded-md px-3 py-2 text-[#030712] font-semibold text-xs cursor-pointer h-12"
          >
            Salvar rascunho
          </button>
          <button
            type="button"
            onClick={onNext}
            className="bg-[#0069A8] text-[#F9FAFB] rounded-md px-3 py-2 font-semibold text-xs cursor-pointer h-12"
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
}