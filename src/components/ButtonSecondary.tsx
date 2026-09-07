import type { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function SecondaryButton({ children, isDisabled = false, onClick }: SecondaryButtonProps) {

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`w-full bg-transparent hover:bg-[#F3F4F6] transition-colors duration-300 text-[#6B7280] font-medium text-sm py-2 rounded-md cursor-pointer
      `}>
      {children}
    </button>
  )
}