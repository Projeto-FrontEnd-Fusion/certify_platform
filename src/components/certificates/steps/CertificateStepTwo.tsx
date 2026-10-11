import { FiUpload, FiUser } from "react-icons/fi";
import type { CertificateFormData } from "@/schemas/CertificateSchema";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCertificateParticipants } from "@/hooks/Certificate/useCertificateParticipants";
import { AddParticipantForm } from "../AddParticipantForm";
import { CertificateParticipantsTable } from "../CertificateParticipantsTable";
import { CertificateResume } from "../CertificateResume";


type CertificateStepTwoProps = {
  onNext: () => void;
  onBack: () => void;
};

type ParticipantInputMode = "manual" | "upload";

const INPUT_MODE_OPTIONS = [
  { mode: "manual", label: "Manual", Icon: FiUser },
  { mode: "upload", label: "Upload de Arquivo", Icon: FiUpload },
] as const;

const INPUT_MODE_STYLE = {
  active: "bg-white text-[#0069A8] border border-[#E2E8F099] rounded-lg",
  inactive: "bg-transparent text-[#737373] border-none",
};

export function CertificateStepTwo({ onNext, onBack }: CertificateStepTwoProps) {
  const {
    formState: { errors },
  } = useFormContext<CertificateFormData>();
  const [inputMode, setInputMode] = useState<ParticipantInputMode>("manual");

  const {
    participants,
    selectedIds,
    allSelected,
    hasSelectedParticipants,
    hasParticipantWithCpf,
    addParticipant,
    removeParticipant,
    removeSelectedParticipants,
    toggleSelection,
    toggleAllSelection,
  } = useCertificateParticipants();

  return (
    <div className="flex gap-3 mt-8">
      <div className="w-2/3">
        <div className="bg-white p-6 border border-[#E2E8F0CC] rounded-md">
          <h2 className="text-[#262626] font-bold text-base">Adicionar participantes</h2>
          <p className="text-[#737373] font-normal text-xs">
            Adicione os alunos que receberão e ste certificado.
          </p>

          <div className="flex items-center p-1 h-11 w-full max-w-[448px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl mt-5">
            {INPUT_MODE_OPTIONS.map(({ mode, label, Icon }) => (
              <button
                key={mode}
                type="button"
                aria-pressed={inputMode === mode}
                className={`flex justify-center items-center gap-2 cursor-pointer flex-1 h-full text-xs ${inputMode === mode ? INPUT_MODE_STYLE.active : INPUT_MODE_STYLE.inactive
                  }`}
                onClick={() => setInputMode(mode)}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>

          <AddParticipantForm
            onAddParticipant={addParticipant}
            hasParticipantWithCpf={hasParticipantWithCpf}
          />
        </div>

        <div className="mt-3 bg-white p-6 border border-[#E2E8F0CC] rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-[#262626] font-bold text-base">Participantes adicionados</h2>
              <div className="text-[#525252] font-medium text-sm bg-[#F1F5F9] border border-[#E2E8F0] h-5 w-5 flex justify-center items-center rounded-full">
                {participants.length}
              </div>
            </div>

            <button
              type="button"
              disabled={!hasSelectedParticipants}
              className="flex items-center gap-1.5 font-medium text-sm text-[#A1A1A1] enabled:cursor-pointer enabled:text-[#DC2626]"
              onClick={removeSelectedParticipants}
            >
              <FaRegTrashAlt />
              Remover selecionados
            </button>
          </div>

          <div className="mt-4 ">
            <CertificateParticipantsTable
              participants={participants}
              selectedIds={selectedIds}
              allSelected={allSelected}
              onToggleSelection={toggleSelection}
              onToggleAllSelection={toggleAllSelection}
              onRemoveParticipant={removeParticipant}
            />
          </div>
        </div>
      </div>

      <div className="w-1/3">
        <CertificateResume />
      </div>
    </div>
  )
}