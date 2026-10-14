import type { CertificateFormData } from "@/schemas/CertificateSchema";
import { Controller, useFormContext } from "react-hook-form";
import { Field } from "./Field";
import { CustomSelect } from "../CustomSelect";

type SelectFieldProps = {
  name: "activityType" | "description" | "modality" | "validity";
  options: string[];
  placeholder: string;
  label?: string;
};

export function SelectField({ name, options, placeholder, label }: SelectFieldProps) {
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