import { Logo } from "./Logo";
import { SlMenu } from "react-icons/sl";

export const Header = () => {
  return (
    <header className="flex justify-between px-4 py-5 items-center">
      <div className="flex gap-1">
        <Logo width={32} height={32} role="img" aria-label="Logo Certify" />
        <h1 className="font-lato text-[1.25rem] font-black">
          Certi<span className="font-light">fy</span>
        </h1>
      </div>

      <SlMenu className="text-2xl cursor-pointer" />
    </header>
  );
};
