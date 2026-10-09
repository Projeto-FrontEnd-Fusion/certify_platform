import Logo from "@/assets/Logo.svg";
import { useAccountNavigation } from "@/hooks/useAccountNavigation";


export function Header() {
  const { initials, openProfile, logout, home } = useAccountNavigation();
  return (
    <header className="flex justify-between items-center px-12 md:px-24 py-[30px] bg-[#F9FAFB] h-[112px] sticky top-0 z-50">
      <a href={home} aria-label="Ir para meus certificados"><img src={Logo} alt="Logo Certify" className="w-[155px] h-[46px]" /></a>

      <div className="flex items-center gap-4">
        <button type="button" onClick={openProfile}>Meu perfil</button>
        <button type="button" onClick={logout} aria-label="Sair da conta" title="Sair" className="w-12 h-12 bg-[#2571B8] text-[#F9FAFB] text-lg rounded-full flex items-center justify-center">
          {initials}
        </button>
      </div>
    </header>
  )
}
