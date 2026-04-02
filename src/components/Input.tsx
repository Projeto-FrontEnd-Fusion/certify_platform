import { formatCPF } from "@/utils/formatCpf";
import { formatPhone } from "@/utils/formatPhone";
import { useState } from "react";
import { Controller, type Control, type FieldErrors, type FieldValues, type Path } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { LuEyeClosed } from "react-icons/lu";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  typeInput?: string;
  placeholderText: string;
  isOptional?: boolean;
  mask?: "cpf" | "phone";
}

export function Input<T extends FieldValues>({
  name,
  control,
  errors,
  typeInput = 'text',
  placeholderText,
  isOptional = false,
  mask
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = typeInput === 'password';
  const formattedType = isPassword ? (showPassword ? 'text' : 'password') : typeInput;

  type MaskType = "cpf" | "phone" | "none";

  function applyMask(value: string, mask?: MaskType) {
    switch (mask) {
      case "cpf":
        return formatCPF(value);
      case "phone":
        return formatPhone(value);
      default:
        return value;
    }
  }

  function handleInputChange(
    value: string,
    onChange: (value: string) => void,
    mask?: MaskType
  ) {
    const formattedValue = applyMask(value, mask);
    onChange(formattedValue);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <div className="relative">
              <input
                {...field}
                name={name}
                type={formattedType}
                placeholder={isOptional ? placeholderText : `${placeholderText} *`}
                onChange={(e) => handleInputChange(e.target.value, field.onChange, mask)}
                className="w-full p-5 bg-primary-gray-100 text-primary-gray-base font-normal placeholder:text-[27px] text-[27px] rounded-[20px] outline-none border-2 border-transparent
              focus:border-primary-blue-300"
              />

              {isPassword && (
                <button
                  type="button"
                  data-testid="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <LuEyeClosed size={24} color="#62748E" />
                  ) : (
                    <IoEyeOutline size={24} color="#62748E" />
                  )}
                </button>
              )}
            </div>

            {errors?.[name] && (
              <span className="text-[#CF1A0F] font-normal text-base">
                {errors[name]?.message as string}
              </span>
            )}
          </div>
        )}
      />


    </div>
  )
}