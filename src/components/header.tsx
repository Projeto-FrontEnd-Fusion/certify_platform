import { Logo } from "./Logo";
import { SlMenu } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "@/config/Menu";
import { motion, AnimatePresence } from "framer-motion";
import { smoothSlideDownVariant } from "@/config/Variants";
import { Scroll } from "@/utils/Scroll";
import { useAuthStoreData } from "@/stores/useAuthStore";

export const Header = () => {
  const { authLogout } = useAuthStoreData();
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? IoCloseOutline : SlMenu;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  Scroll(setIsOpen);

  const handleClick = (label: string) => {
    setIsOpen(false);
    if (label === "Sair") {
      authLogout();
      navigate("/login");
    }
  };

  return (
    <header className="flex justify-between sticky top-0 px-4 py-5 items-center z-50 bg-white 2xl:max-w-[1440px] mx-auto w-full xl:max-w-[78rem] min-[900px]:max-w-4xl min-[1120px]:max-w-[68rem]">
      {/* LOGO */}
      <div className="flex gap-1 cursor-default items-center">
        <Logo
          role="img"
          aria-label="Logo Certify"
          className="text-[#3925DD] w-8 h-8 lg:w-10 lg:h-10"
        />
        <h1 className="font-lato text-xl font-black text-[#3925DD] lg:text-2xl">
          Certi<span className="font-light">fy</span>
        </h1>
      </div>

      {/* BOTÃO MOBILE */}
      {pathname !== "/login" && pathname !== "/signup" && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="active:scale-90 transition duration-100 min-[900px]:hidden"
        >
          <Icon
            className={`${
              Icon === IoCloseOutline ? "text-3xl -mr-1" : "text-xl"
            } cursor-pointer text-[#3925DD]`}
          />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="mobile-menu"
            variants={smoothSlideDownVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-18 w-full left-0 bg-white min-[900px]:hidden"
          >
            <ul className="font-inter text-[#1A1551] space-y-2 px-4 py-4">
              {menuItems.map(({ Icon, label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="flex items-center gap-2 text-lg hover:text-[#3925DD] transition group py-3"
                    onClick={() => handleClick(label)}
                  >
                    <Icon
                      size={24}
                      className="group-active:scale-95 duration-100"
                    />
                    <span className="group-active:scale-95 duration-100">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <nav className="max-[900px]:hidden">
        <ul className="flex font-inter space-x-3">
          {menuItems.map(({ label, path }) => (
            <li key={label}>
              <Link
                to={path}
                className={`relative py-2 px-2 font-semibold rounded transition-transform duration-150 active:scale-95 text-[#1A1551]  
                ${pathname === path && "bg-[#1a15511c]"}
                ${pathname !== path && "group"} xl:text-lg`}
                onClick={() => handleClick(label)} 
              >
                <span
                  className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:bg-[#1A1551] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:rounded-full will-change-transform"
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
