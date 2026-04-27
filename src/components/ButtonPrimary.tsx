import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function PrimaryButton({ children, isDisabled = false, onClick }: PrimaryButtonProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="w-full py-5 px-12 text-white bg-primary-blue-base font-bold text-[27px] rounded-[20px] cursor-pointer outline-none flex justify-center items-center gap-4
      hover:bg-primary-blue-300 transition-colors duration-300 
      active:bg-primary-blue-500
      disabled:border-3 disabled:border-primary-gray-100 disabled:text-primary-gray-100 disabled:cursor-not-allowed disabled:hover:bg-primary-blue-base
    ">
      {children}
    </button>
  )
}