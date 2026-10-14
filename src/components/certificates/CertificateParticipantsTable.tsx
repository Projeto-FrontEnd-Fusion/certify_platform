import { BsThreeDotsVertical } from "react-icons/bs";
import type { ParticipantFormData } from "@/schemas/CertificateSchema";
import { formatCPF } from "@/utils/formatCpf";

export type ParticipantRow = ParticipantFormData & { id: string };

type CertificateParticipantsTableProps = {
  participants: ParticipantRow[];
  selectedIds: Set<string>;
  allSelected: boolean;
  onToggleSelection: (id: string) => void;
  onToggleAllSelection: () => void;
  onRemoveParticipant: (id: string) => void;
};

const COLUMN_HEADERS = ["Nome do aluno", "E-mail", "CPF", "Status", "Ação"];
const HEADER_CELL_CLASS_NAME = "text-[#404040] font-bold text-xs p-2";
const CHECKBOX_CLASS_NAME = "h-3.5 w-3.5 cursor-pointer accent-[#0069A8]";

export function CertificateParticipantsTable({
  participants,
  selectedIds,
  allSelected,
  onToggleSelection,
  onToggleAllSelection,
}: CertificateParticipantsTableProps) {
  const total = participants.length;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th scope="col" className="p-2">
              <input
                type="checkbox"
                className={CHECKBOX_CLASS_NAME}
                aria-label="Selecionar todos os participantes"
                checked={allSelected}
                disabled={total === 0}
                onChange={onToggleAllSelection}
              />
            </th>
            {COLUMN_HEADERS.map((header) => (
              <th key={header} scope="col" className={HEADER_CELL_CLASS_NAME}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {total === 0 && (
            <tr>
              <td colSpan={COLUMN_HEADERS.length + 1} className="p-6 text-center text-xs text-[#A1A1A1]">
                Nenhum participante adicionado ainda.
              </td>
            </tr>
          )}

          {participants.map((participant) => (
            <tr key={participant.id}>
              <td className="p-2">
                <input
                  type="checkbox"
                  className={CHECKBOX_CLASS_NAME}
                  aria-label={`Selecionar ${participant.name}`}
                  checked={selectedIds.has(participant.id)}
                  onChange={() => onToggleSelection(participant.id)}
                />
              </td>
              <td className="font-semibold text-[#262626] text-xs p-2">{participant.name}</td>
              <td className="font-normal text-[#737373] text-xs p-2">{participant.email}</td>
              <td className="font-normal text-[#737373] text-xs p-2">{formatCPF(participant.cpf)}</td>
              <td className="p-2">
                <span className="font-medium text-[#059669] text-xs bg-[#ECFDF5] border border-[#A7F3D0] rounded-sm px-2 py-0.5 inline-block">
                  Pronto
                </span>
              </td>
              <td className="p-2">
                <button
                  type="button"
                  className="flex items-center justify-center text-[#A1A1A1] hover:text-[#DC2626]"
                  onClick={() => console.log('Clicar em ação')}
                >
                  <BsThreeDotsVertical />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {total > 0 && (
        <div className="mt-9 pt-2 w-full border-t border-[#F1F5F9]">
          <p className="text-xs text-[#A1A1A1] font-normal">
            Mostrando 1 a {total} de {total} {total === 1 ? "participante" : "participantes"}
          </p>
        </div>
      )}
    </div>
  );
}