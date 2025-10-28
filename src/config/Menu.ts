import { LiaUserEditSolid } from "react-icons/lia";
import { LuQrCode } from "react-icons/lu";
import { PiCreditCard } from "react-icons/pi";
import { RxExit } from "react-icons/rx";

export const menuItems = [
  {
    Icon: LiaUserEditSolid,
    label: "Meus Dados",
    path: "/",
  },
  {
    Icon: PiCreditCard,
    label: "Meus Certificados",
    path: "/meus-certificados",
  },
  {
    Icon: LuQrCode,
    label: "Validação",
    path: "/",
  },
  {
    Icon: RxExit,
    label: "Sair",
    path: "/",
  },
];
