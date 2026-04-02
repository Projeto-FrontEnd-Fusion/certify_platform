import type { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
}

export function PrimaryButton({ children, isDisabled = false }: SecondaryButtonProps) {
  return (
    <button
      disabled={isDisabled}
      className="py-5 px-12 text-white bg-primary-blue-base font-bold text-[27px] rounded-[20px] cursor-pointer outline-none
      hover:bg-primary-blue-300 transition-colors duration-300 
      active:bg-primary-blue-500
      disabled:border-3 disabled:border-primary-gray-100 disabled:text-primary-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent
    ">
      {children}
    </button>
  )
}