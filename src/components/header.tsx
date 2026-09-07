import Logo from "@/assets/Logo.svg";


export function Header() {
  return (
    <header className="flex justify-between items-center px-12 md:px-24 py-[30px] bg-[#F9FAFB] h-[112px] sticky top-0 z-50">
      <img src={Logo} alt="Logo Certify" className="w-[155px] h-[46px]" />

      <div>
        <button className="w-12 h-12 bg-[#2571B8] text-[#F9FAFB] text-lg rounded-full flex items-center justify-center">
          AB
        </button>
      </div>
    </header>
  )
}