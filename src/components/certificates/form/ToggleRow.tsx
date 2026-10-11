import type { CertificateFormData } from "@/schemas/CertificateSchema";
import { Controller, useFormContext } from "react-hook-form";
import { ToggleSwitch } from "../ToggleSwitch";

type ToggleRowProps = {
  name: "modalityEnabled" | "validityEnabled" | "syllabusEnabled";
  label: string;
};

export function ToggleRow({ name, label }: ToggleRowProps) {
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