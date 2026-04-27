import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodTypeAny, z } from "zod/v3";

export const useFormValidation = <T extends ZodTypeAny>(
  schema: T,
  defaultValues?: z.infer<T>
) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  return { register, handleSubmit, errors, reset, control, watch, isValid };
};
