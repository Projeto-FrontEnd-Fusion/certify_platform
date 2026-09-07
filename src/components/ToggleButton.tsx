import type { ReactNode } from "react";

interface ToggleButtonProps {
  children: ReactNode;
  isActive: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function ToggleButton({ children, isActive, isDisabled = false, onClick }: ToggleButtonProps) {
  const activeStyle = "bg-[#0069A8] hover:bg-[#052F4A] text-white shadow-sm";
  const inactiveStyle = "bg-transparent hover:bg-[#F3F4F6] text-[#6B7280]";

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`w-full h-full font-medium text-sm py-2 rounded-md cursor-pointer transition-colors duration-300 disabled:bg-[#E5E7EB] disabled:text-[#99A1AF] ${isActive ? activeStyle : inactiveStyle
        }`}
    >
      {children}
    </button>
  );
}