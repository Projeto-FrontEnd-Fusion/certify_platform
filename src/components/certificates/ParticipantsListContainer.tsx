import { useCertificateParticipants } from "@/hooks/Certificate/useCertificateParticipants";
import { FaRegTrashAlt } from "react-icons/fa";
import { ReviewParticipantsTable } from "./ReviewParticipantsTable";
import { FiUsers } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import { useSaveCertificateDraft } from "@/hooks/Certificate/useSaveCertificateDraft";
import { useState } from "react";
import { CertificateGenerateModal } from "./CertificateGenerateModal";

export function ParticipantsListContainer({ onBack }: { onBack: () => void }) {
  const {
    participants: manualParticipants,
    selectedIds,
    allSelected,
    hasSelectedParticipants,
    removeParticipant,
    removeSelectedParticipants,
    toggleSelection,
    toggleAllSelection,
  } = useCertificateParticipants();

  const { saveCurrentFormAsDraft } = useSaveCertificateDraft();

  const [showGenerateModal, setShowGenerateModal] = useState(false)

  return (
    <div className="mt-3 rounded-md border border-[#E2E8F0CC] bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-[#262626]">
            Participantes adicionados
          </h2>

          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F1F5F9] text-sm font-medium text-[#525252]">
            {manualParticipants.length}
          </div>
        </div>

        <button
          type="button"
          disabled={!hasSelectedParticipants}
          className="flex items-center gap-1.5 text-sm font-medium text-[#A1A1A1] enabled:cursor-pointer enabled:text-[#DC2626]"
          onClick={removeSelectedParticipants}
        >
          <FaRegTrashAlt />
          Remover selecionados
        </button>
      </div>

      <div className="my-4 flex items-center gap-3.5">
        <div className="flex items-center gap-3 p-3 bg-[#F8FAFC80] border border-[#F1F5F9] rounded-xl flex-1">
          <div className="p-2 rounded-lg bg-[#E0F2FE]">
            <FiUsers className="w-5 h-5 text-[#0066CC]" />
          </div>

          <div>
            <p className="text-[#262626] font-bold text-base">120</p>
            <p className="text-[#525252] font-normal text-xs">importados</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#ECFDF566] border border-[#A7F3D0] rounded-xl flex-1">
          <div className="p-2 rounded-lg bg-[#D1FAE5]">
            <BiCheck className="w-5 h-5 text-[#059669]" />
          </div>

          <div>
            <p className="text-[#047857] font-bold text-base">112</p>
            <p className="text-[#047857CC] font-normal text-xs">válidos</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#FFF1F266] border border-[#FECDD3] rounded-xl flex-1">
          <div className="p-2 rounded-lg bg-[#FFE4E6]">
            <FiUsers className="w-5 h-5 text-[#F43F5E]" />
          </div>

          <div>
            <p className="text-[#E11D48] font-bold text-base">8</p>
            <p className="text-[#F43F5ECC] font-normal text-xs">com erro</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ReviewParticipantsTable
          participants={manualParticipants}
          selectedIds={selectedIds}
          allSelected={allSelected}
          onToggleSelection={toggleSelection}
          onToggleAllSelection={toggleAllSelection}
          onRemoveParticipant={removeParticipant}
        />
      </div>

      <div className="flex items-center justify-end mt-4 ">
        <div className="mt-4 flex justify-end items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-white text-sm border border-[#0069A84D] rounded-md px-5 py-2.5 cursor-pointer"
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={saveCurrentFormAsDraft}
            className="bg-white text-sm border border-[#0069A84D] rounded-md px-5 py-2.5 cursor-pointer"
          >
            Salvar rascunho
          </button>
          <button
            type="button"
            onClick={() => setShowGenerateModal(true)}
            className="text-white text-sm bg-[#0069A8] rounded-md px-5 py-2.5 cursor-pointer"
          >
            Gerar certificados
          </button>
        </div>
      </div>

      {showGenerateModal && (
        <CertificateGenerateModal onCancel={() => setShowGenerateModal(false)} />
      )}
    </div>
  )
}