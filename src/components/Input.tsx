import { formatCNPJ } from "@/utils/formatCnpj";
import { formatCPF } from "@/utils/formatCpf";
import { formatPhone } from "@/utils/formatPhone";
import { useState } from "react";
import { Controller, type Control, type FieldErrors, type FieldValues, type Path } from "react-hook-form";
import { BiCheck } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { LuEyeClosed } from "react-icons/lu";
import { VscError } from "react-icons/vsc";

type MaskType = "cpf" | "cnpj" | "phone";
interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  typeInput?: string;
  label?: string;
  placeholderText: string;
  isOptional?: boolean;
  mask?: MaskType;
  rules?: PasswordRule[];
}

interface PasswordRule {
  label: string;
  valid: boolean;
}


export function Input<T extends FieldValues>({
  name,
  control,
  errors,
  typeInput = 'text',
  label,
  placeholderText,
  isOptional = false,
  mask,
  rules = []
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = typeInput === 'password';
  const formattedType = isPassword ? (showPassword ? 'text' : 'password') : typeInput;

  const hasInvalidRule = rules.some((rule) => !rule.valid);

  const isPasswordValid =
    isPassword &&
    rules.length > 0 &&
    !hasInvalidRule;

  function applyMask(value: string, mask?: MaskType) {
    switch (mask) {
      case "cpf":
        return formatCPF(value);
      case "cnpj":
        return formatCNPJ(value);
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
              {label && (
                <label className="text-[#171717]">
                  {label}
                  {!isOptional && <span className="text-[#F73B3B]">*</span>}
                </label>
              )}
              <div className="relative mt-2">
                <input
                  {...field}
                  name={name}
                  type={formattedType}
                  placeholder={isOptional ? placeholderText : `${placeholderText}`}
                  onChange={(e) =>
                    handleInputChange(e.target.value, field.onChange, mask)
                  }
                  className={`w-full p-5 font-normal rounded-[10px] outline-none h-[52px]
                  placeholder:text-[#99A1AF]

                  ${errors?.[name]
                      ? "border border-[#C10007] bg-[#FEF2F2] text-[#C10007]"
                      : isPasswordValid
                        ? "border border-[#008235] bg-[#F0FDF4]"
                        : "border border-[#E5E7EB] bg-[#F3F4F6] focus:border-[#0069A8]"
                    }
      `}
                />

                {isPassword && (
                  <button
                    type="button"
                    data-testid="toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <LuEyeClosed size={24} color="#66666E" />
                    ) : (
                      <IoEyeOutline size={24} color="#66666E" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {errors?.[name] && (!isPassword || rules.length === 0) && (
              <span className="text-[#C10007] font-normal text-base">
                {errors[name]?.message as string}
              </span>
            )}

            {isPassword && hasInvalidRule && (
              <div className="flex flex-col gap-2 text-[19px]">
                <span className="text-[#C10007]">Sua senha deve conter:</span>
                {rules.map((rule) => (
                  <div key={rule.label} className="flex items-center gap-2">
                    {rule.valid
                      ? <BiCheck className="text-primary-blue-700 w-5 h-5" />
                      : <VscError className="text-[#C10007] w-5 h-5" />
                    }
                    <span className="text-[#111111D9] text-sm">
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {isPasswordValid && (
              <span className="text-[#008235] font-medium text-base">
                Senha forte
              </span>
            )}
          </div>
        )}
      />


    </div>
  )
}