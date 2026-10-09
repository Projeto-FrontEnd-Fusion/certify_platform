import { BsPeople } from "react-icons/bs";
import type { IconType } from "react-icons/lib";
import { PiCertificateBold } from "react-icons/pi";
import { RiPieChart2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

interface MenuLink {
  icon: IconType;
  label: string;
  href: string;
  available?: boolean;
}

export const menuLinks: MenuLink[] = [
  {
    icon: RxDashboard,
    label: "Dashboard",
    href: "/empresa/dashboard",
    available: false,
  },
  {
    icon: PiCertificateBold,
    label: "Certificados",
    href: "/empresa/certificados",
  },
  {
    icon: BsPeople,
    label: "Alunos",
    href: "/empresa/alunos",
    available: false,
  },
  {
    icon: RxDashboard,
    label: "Modelos",
    href: "/empresa/modelos",
  },
  {
    icon: RiPieChart2Line,
    label: "Relatórios",
    href: "/empresa/relatorios",
    available: false,
  },
];