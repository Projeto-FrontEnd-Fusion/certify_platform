"use client";
import { Logo } from "./Logo";
import { SlMenu } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "@/config/Menu";
import { motion, AnimatePresence } from "framer-motion";
import { smoothSlideDownVariant } from "@/config/Variants";
import { Scroll } from "@/utils/Scroll";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? IoCloseOutline : SlMenu;
  const Scrolled = Scroll();

  useEffect(() => {
    if (Scrolled) setIsOpen(false);
  }, [Scrolled]);

  return (
    <header className="flex justify-between sticky top-0 px-4 py-5 items-center z-99 bg-white">
      <div className="flex gap-1 cursor-default">
        <Logo
          width={32}
          height={32}
          role="img"
          aria-label="Logo Certify"
          className="text-[#3925DD]"
        />
        <h1 className="font-lato text-[1.25rem] font-black text-[#3925DD]">
          Certi<span className="font-light">fy</span>
        </h1>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        className="active:scale-90 transition duration-100"
      >
        <Icon
          className={`${
            Icon === IoCloseOutline ? "text-3xl -mr-1" : "text-xl"
          } cursor-pointer text-[#3925DD]`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="mobile-menu"
            variants={smoothSlideDownVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-18  w-full left-0  bg-white "
          >
            <ul className="font-inter text-[#1A1551] space-y-2 px-4 py-4 ">
              {menuItems.map(({ Icon, label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="flex items-center gap-2 text-lg hover:text-[#3925DD] transition group py-3 "
                    onClick={() => setIsOpen(false)}
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
    </header>
  );
};
