import Logo from "@/assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { authServiceInstance } from "@/api/implements";
import { useAuthStoreData } from "@/stores/useAuthStore";


export function Header() {
  const navigate = useNavigate();
  const { auth, refreshToken, authLogout } = useAuthStoreData();
  const initials = (auth?.fullname || auth?.razao_social || auth?.email || "")
    .split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const handleLogout = async () => {
    try {
      if (refreshToken) await authServiceInstance.logout(refreshToken);
    } catch {
      // The local session must still be cleared if revocation is unavailable.
    } finally {
      authLogout();
      navigate("/login", { replace: true });
    }
  };
  return (
    <header className="flex justify-between items-center px-12 md:px-24 py-[30px] bg-[#F9FAFB] h-[112px] sticky top-0 z-50">
      <img src={Logo} alt="Logo Certify" className="w-[155px] h-[46px]" />

      <div>
        <button type="button" onClick={handleLogout} aria-label="Sair da conta" title="Sair" className="w-12 h-12 bg-[#2571B8] text-[#F9FAFB] text-lg rounded-full flex items-center justify-center">
          {initials}
        </button>
      </div>
    </header>
  )
}
