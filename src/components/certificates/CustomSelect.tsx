import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface CustomSelectProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function CustomSelect({
  options,
  placeholder = "Selecione",
  value = "",
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-full items-center justify-between rounded-sm border border-[#A1A1A133] bg-white px-3 text-xs text-[#404040]"
      >
        <span className={value ? "text-gray-900" : "text-[#404040]"}>
          {value || placeholder}
        </span>

        <FaAngleDown />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-sm border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange?.(option);
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-sm text-[#525252] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}