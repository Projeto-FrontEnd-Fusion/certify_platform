import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodTypeAny, z } from "zod/v3";

export const useFormValidation = <T extends ZodTypeAny>(
  schema: T,
  defaultValues: z.infer<T>
) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return { register, handleSubmit, errors, reset, control };
};
