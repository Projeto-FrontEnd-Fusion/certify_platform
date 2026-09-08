'use client'

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
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
    <div className="flex h-screen">
      <aside
        className={`
        h-full
        flex
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
