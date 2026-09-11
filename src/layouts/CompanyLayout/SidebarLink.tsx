import type { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";

interface MenuLink {
  icon: IconType;
  label: string;
  href: string;
}

interface SidebarLinkProps {
  link: MenuLink;
  isMenuOpen: boolean;
}

export const SidebarLink = ({ link, isMenuOpen }: SidebarLinkProps) => {
  const Icon = link.icon;

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