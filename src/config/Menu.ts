import { LiaUserEditSolid } from "react-icons/lia";
import { LuQrCode } from "react-icons/lu";
import { PiCreditCard } from "react-icons/pi";
import { RxExit } from "react-icons/rx";

export const menuItems = [
  {
    Icon: LiaUserEditSolid,
    label: "Meus Dados",
    path: "/meus-dados",
  },
  {
    Icon: PiCreditCard,
    label: "Meus Certificados",
    path: "/meus-certificados",
  },
  {
    Icon: LuQrCode,
    label: "Validação",
    path: "/validar-certificados",
  },
  {
    Icon: RxExit,
    label: "Sair",
    path: "/",
  },
];
