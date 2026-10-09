import type { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";

interface MenuLink {
  icon: IconType;
  label: string;
  href: string;
  available?: boolean;
}

interface SidebarLinkProps {
  link: MenuLink;
  isMenuOpen: boolean;
}

export const SidebarLink = ({ link, isMenuOpen }: SidebarLinkProps) => {
  const Icon = link.icon;

  if (link.available === false) return <div aria-disabled="true" title="Ainda não disponível" className="flex items-center gap-2 rounded-md px-3 py-2 text-white/40"><Icon className="h-5 w-5 shrink-0" />{isMenuOpen && <span>{link.label}</span>}</div>;

  return (
    <NavLink
      to={link.href}
      title={!isMenuOpen ? link.label : undefined}
      className={({ isActive }) => `
        flex
        items-center
        rounded-md
        border-2
        py-2
        px-3
        transition-colors
        ${isMenuOpen ? "gap-2" : "justify-center"}
        ${isActive
          ? "border-[#2571B8] bg-[#2571B8]"
          : "border-[#F3F4F61A] hover:bg-white/10"
        }
      `}
    >
      <Icon className="h-5 w-5 shrink-0 text-[#F3F4F6]" />

      {isMenuOpen && (
        <span className="text-sm font-semibold text-[#F3F4F6]">
          {link.label}
        </span>
      )}
    </NavLink>
  );
};