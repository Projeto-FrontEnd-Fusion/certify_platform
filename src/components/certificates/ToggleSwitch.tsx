import { useId } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ToggleSwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function ToggleSwitch({
  checked = false,
  onChange,
  disabled = false,
  ...props
}: ToggleSwitchProps) {
  const id = useId();

  return (
    <button
      {...props}
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`
        relative
        h-4
        w-7
        rounded-full
        border
        transition-colors
        duration-200

        ${checked
          ? "border-[#92B0FF] bg-[#0069A8]"
          : "border-[#CBD5E1] bg-[#E2E8F0]"
        }

        disabled:cursor-not-allowed
        disabled:opacity-50
      `}
    >
      <span
        className={`
          absolute
          top-1/2
          left-0
          h-3
          w-3
          -translate-y-1/2
          rounded-full
          bg-white
          transition-transform
          duration-200
          ease-in-out

          ${checked
            ? "translate-x-[14px]"
            : "translate-x-[1px]"
          }
        `}
      />
    </button>
  );
}