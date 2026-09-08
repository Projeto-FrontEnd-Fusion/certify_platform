'use client'

import { PrimaryButton } from "@/components/ButtonPrimary";
import { CertificateFilters } from "@/components/certificates/CertificateFilters";
import { CertificateTable } from "@/components/certificates/CertificateTable";
import { certificates } from "@/components/certificates/data/certificates.data";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import type {
  CertificateFilters as CertificateFiltersType,
} from "@/components/certificates/types";

export const CertificateCompany = () => {
  const filterOptions = ['Todos', 'Rascunhos', 'Emitidos', 'Expirados', 'Cancelados'];
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  function handleCreateCertificate() {
    console.log("Criar certificado");
  }

  function handleApplyFilters(
    filters: CertificateFiltersType,
  ) {
    console.log("Filtros aplicados:", filters);
  }

  return (
    <div>
      <header className="flex justify-between">
        <div>
          <h1 className="text-black font-bold text-[30px] mb-1">Certificados</h1>
          <p className="text-black/45 font-normal text-sm">Visualize, gerencie e compartilhe todos os certificados emitidos.</p>
        </div>

        <div className="flex items-center">
          <button>
            <CiBellOn className="text-black/45 w-5 h-5" />
          </button>

          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0069A833] text-[#0069A8] font-bold text-sm border border-[#0069A84D] ml-6 mr-3">
            AS
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-semibold text-black text-sm">Ana Silva</p>
            <span className="font-normal text-black/45 text-xs">Administrador</span>
          </div>
        </div>
      </header>

      <section className="mt-9">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3 h-[52px] bg-white px-3 py-3.5 w-[402px] rounded-lg border border-[#E5E7EB] text-black/65">
              <CiSearch />

              <input
                placeholder="Buscar certificado, aluno ou ID..."
                className="w-full outline-none"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 h-[52px] px-4 py-[18px] bg-white rounded-lg text-black/65 cursor-pointer">
              <CiFilter />
              Filtros
            </button>
          </div>

          <div className="h-12 w-[218px]">
            <PrimaryButton>
              <div className="flex items-center justify-center gap-3">
                <MdAdd size={20} />
                Novo Certificado
              </div>
            </PrimaryButton>
          </div>
        </div>

        <nav
          className="
                flex
                w-max
                items-center
                gap-1
                rounded-xl
                bg-[#0069A8]/10
                p-2
                mt-1.5
              "
        >
          {filterOptions.map((tab) => {
            const isActive = activeFilter === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`
                      flex
                      h-11
                      px-5
                      flex-1
                      items-center
                      justify-center
                      rounded-lg
                      text-sm
                      font-normal
                      transition-all
                      duration-200
                      cursor-pointer
                      ${isActive
                    ? "bg-[#FFFFFF] text-[#0069A8] shadow-sm"
                    : "bg-transparent text-[#111111]/40 hover:bg-white/50"
                  }
                    `}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </section>

      <section className="mt-3">
        <CertificateTable
          certificates={certificates}
          onCreate={handleCreateCertificate}
        />
      </section>

      <CertificateFilters
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  )
}