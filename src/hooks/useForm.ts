import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v3";

export const useFormValidation = <T extends FieldValues>(
  schema: z.ZodType<T, z.ZodTypeDef & { typeName: string }, T>,
  defaultValues?: DefaultValues<T>
) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  return { register, handleSubmit, errors, reset, control, watch, isValid };
};
