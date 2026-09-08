import { useEffect, useState } from "react";
import {
  MdClose,
  MdKeyboardArrowDown,
} from "react-icons/md";

import type {
  CertificateFilters as CertificateFiltersType,
  CertificateModel,
  CertificateStatus,
} from "./types";

interface CertificateFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: CertificateFiltersType) => void;
}

const initialFilters: CertificateFiltersType = {
  status: "all",
  model: null,
  startDate: "",
  endDate: "",
  student: "",
};

const statusOptions: {
  label: string;
  value: CertificateStatus;
}[] = [
    {
      label: "Todos",
      value: "all",
    },
    {
      label: "Emitido",
      value: "issued",
    },
    {
      label: "Enviado",
      value: "sent",
    },
    {
      label: "Rascunho",
      value: "draft",
    },
  ];

const modelOptions: {
  label: string;
  value: CertificateModel;
}[] = [
    {
      label: "Sem borda",
      value: "no-border",
    },
    {
      label: "Clássico",
      value: "classic",
    },
    {
      label: "Moderno",
      value: "modern",
    },
    {
      label: "Ornamental",
      value: "ornamental",
    },
  ];

export function CertificateFilters({
  isOpen,
  onClose,
  onApply,
}: CertificateFiltersProps) {
  const [filters, setFilters] =
    useState<CertificateFiltersType>(initialFilters);

  /**
   * Fecha o modal com a tecla ESC.
   */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  /**
   * Impede o scroll da página enquanto o modal está aberto.
   */
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function updateFilter<K extends keyof CertificateFiltersType>(
    key: K,
    value: CertificateFiltersType[K],
  ) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleClear() {
    setFilters(initialFilters);
  }

  function handleApply() {
    onApply(filters);
    onClose();
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-6
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-filters-title"
    >
      <div
        className="
          relative
          w-full
          max-w-[420px]
          rounded-[18px]
          bg-white
          px-9
          py-8
          shadow-xl
        "
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar filtros"
          className="
            absolute
            right-5
            top-5
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-[#111111]/40
            transition-colors
            hover:bg-[#0069A8]/10
            hover:text-[#0069A8]
          "
        >
          <MdClose size={22} />
        </button>

        <div className="space-y-8">
          <section>
            <h2
              id="certificate-filters-title"
              className="
                mb-4
                text-sm
                font-semibold
                text-[#171717]
              "
            >
              Status
            </h2>

            <div className="grid grid-cols-4 gap-3">
              {statusOptions.map((option) => {
                const isSelected =
                  filters.status === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      updateFilter("status", option.value)
                    }
                    className={`
                      h-[34px]
                      rounded-sm
                      border
                      text-xs
                      font-medium
                      transition-colors
                      ${isSelected
                        ? "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]"
                        : "border-[#111111]/10 bg-white text-[#111111]/60 hover:border-[#0069A8]/30 hover:text-[#0069A8]"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h2
              className="
                mb-4
                text-sm
                font-semibold
                text-[#111111]
              "
            >
              Modelo
            </h2>

            <div className="grid grid-cols-4 gap-3">
              {modelOptions.map((option) => {
                const isSelected =
                  filters.model === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      updateFilter(
                        "model",
                        isSelected ? null : option.value,
                      )
                    }
                    className={`
                      h-[34px]
                      rounded-sm
                      border
                      text-xs
                      font-medium
                      transition-colors
                      ${isSelected
                        ? "border-[#0069A8]/30 bg-[#0069A8]/10 text-[#0069A8]"
                        : "border-[#111111]/10 bg-white text-[#111111]/60 hover:border-[#0069A8]/30 hover:text-[#0069A8]"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h2
              className="
                mb-4
                text-sm
                font-semibold
                text-[#111111]
              "
            >
              Período de emissão
            </h2>

            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(event) =>
                    updateFilter(
                      "startDate",
                      event.target.value,
                    )
                  }
                  className="
                    h-10
                    w-full
                    p-2
                    rounded-md
                    border
                    border-[#111111]/10
                    bg-white
                    text-base
                    text-[#111111]
                    outline-none
                    transition
                    focus:border-[#0069A8]
                    focus:ring-2
                    focus:ring-[#0069A8]/10
                  "
                />
              </div>

              <span className="text-[#111111]/40">
                -
              </span>

              <div className="relative flex-1">
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(event) =>
                    updateFilter(
                      "endDate",
                      event.target.value,
                    )
                  }
                  className="
                    h-10
                    w-full
                    p-2
                    rounded-md
                    border
                    border-[#111111]/10
                    bg-white
                    text-base
                    text-[#111111]
                    outline-none
                    transition
                    focus:border-[#0069A8]
                    focus:ring-2
                    focus:ring-[#0069A8]/10
                  "
                />
              </div>
            </div>
          </section>

          <section>
            <h2
              className="
                mb-4
                text-sm
                font-semibold
                text-[#111111]
              "
            >
              Aluno
            </h2>

            <div className="relative">
              <input
                type="text"
                value={filters.student}
                onChange={(event) =>
                  updateFilter(
                    "student",
                    event.target.value,
                  )
                }
                placeholder="Buscar aluno..."
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-[#111111]/10
                  bg-white
                  px-4
                  pr-12
                  text-base
                  text-[#111111]
                  outline-none
                  placeholder:text-[#111111]/40
                  focus:border-[#0069A8]
                  focus:ring-2
                  focus:ring-[#0069A8]/10
                "
              />

              <MdKeyboardArrowDown
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[#111111]/60
                "
                size={26}
              />
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-1">
            <button
              type="button"
              onClick={handleClear}
              className="
                h-12
                min-w-[128px]
                rounded-lg
                border-2
                border-[#111111]/5
                bg-white
                px-6
                text-sm
                font-semibold
                text-[#111111]
                transition-colors
                hover:border-[#0069A8]/20
                hover:bg-[#0069A8]/5
              "
            >
              Limpar filtros
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="
                h-12
                min-w-[128px]
                rounded-lg
                bg-[#0069A8]
                px-6
                text-sm
                font-medium
                text-white
                transition-colors
                hover:bg-[#0069A8]/90
                focus:outline-none
                focus:ring-2
                focus:ring-[#0069A8]/30
                focus:ring-offset-2
              "
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}