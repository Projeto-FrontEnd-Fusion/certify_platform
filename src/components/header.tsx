import Logo from "@/assets/Logo.svg";
import { FiUser } from "react-icons/fi";


export function Header() {
  return (
    <header className="flex justify-between items-center px-24 py-[30px] bg-white h-[112px] sticky top-0 z-50">
      <img src={Logo} alt="Logo Certify" className="w-[155px] h-[46px]" />

      <div className="flex items-center gap-10">
        <h2 className="text-2xl text-primary-blue-700">Meus Certificados</h2>

        <button className="w-12 h-12 bg-[#D8D8DA] rounded-full flex items-center justify-center">
          <FiUser className="w-5 h-[30px]" color="#03014C" />
        </button>
      </div>
    </header>
  )
}