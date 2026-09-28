'use client'

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { CiBellOn } from "react-icons/ci";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { LogoCertify } from "@/components/LogoCertify";
import { Logo } from "@/components/Logo";
import { menuLinks } from "./menuLinks";
import { SidebarLink } from "./SidebarLink";

export const CompanyLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <header
        className="flex justify-between items-center px-4 py-7 md:hidden bg-[#0F2441] rounded-b-2xl"
      >
        <LogoCertify
          iconColor="#2571B8"
          certiColor="white"
          fyColor="white"
          className="h-8 w-[108px]"
        />

        <div className="flex items-center gap-3">
          <button className="p-2 border border-white/10 rounded-full ">
            <CiBellOn className="text-white w-5 h-5" />
          </button>

          <button className="p-2 border border-white/10 rounded-full ">
            <CiSettings className="text-white w-5 h-5" />
          </button>

          <button className="p-2 border border-white/10 rounded-full ">
            <LuLogOut className="text-[#FF0000]" />
          </button>
        </div>

      </header>

      <aside
        className={`
        hidden
        h-full
        md:flex
        flex-col
        justify-between
        bg-gradient-to-b
        from-[#073D60]
        to-[#102A45]
        px-4
        py-6
        transition-all
        duration-300
        ${isMenuOpen ? "w-60" : "w-20"}
      `}
      >
        <div>
          <header
            className={`
              flex items-center
              ${isMenuOpen
                ? "justify-between"
                : "flex-col justify-center gap-3"
              }
  `}
          >
            {isMenuOpen ? (
              <LogoCertify
                iconColor="#2571B8"
                certiColor="white"
                fyColor="white"

                className="h-8 w-[108px]"
              />
            ) : (
              <Logo className="text-[#2571B8] w-8 h-8 mb-2" />

            )}


            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              className="text-white"
            >
              {isMenuOpen ? (
                <FiChevronsLeft className="w-5 h-5 cursor-pointer" />
              ) : (
                <FiChevronsRight className="w-5 h-5 cursor-pointer" />
              )}
            </button>
          </header>


          <nav className="mt-9">
            {isMenuOpen && (
              <h2 className="mb-3 text-sm font-bold text-white/45">
                Principal
              </h2>
            )}

            <div className="flex flex-col gap-3">
              {menuLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  link={link}
                  isMenuOpen={isMenuOpen}
                />
              ))}
            </div>
          </nav>
        </div>

        <div
          className={`
          flex
          items-center
          rounded-md
          bg-white/5
          px-3
          py-3.5
          ${isMenuOpen ? "gap-3" : "justify-center"}
        `}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#EDF8FF]/45 bg-[#0069A8]">
            IT
          </div>

          {isMenuOpen && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  Instituto Tech
                </p>

                <span className="text-xs font-bold text-[#9CA3AF]">
                  Empresa
                </span>
              </div>

              <button type="button">
                <CiSettings className="h-5 w-5 text-white/45" />
              </button>

              <button type="button">
                <LuLogOut className="h-5 w-5 text-[#FF0000]" />
              </button>
            </>
          )}
        </div>
      </aside>

      <main className="flex-1 p-6 bg-[#EFEFEF]">
        <Outlet />
      </main>
    </div>
  );
};
