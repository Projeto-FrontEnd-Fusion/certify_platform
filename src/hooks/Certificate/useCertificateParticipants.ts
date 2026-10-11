import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { CertificateFormData, ParticipantFormData } from "@/schemas/CertificateSchema";

const withoutId = (ids: Set<string>, id: string) => {
  const next = new Set(ids);
  next.delete(id);
  return next;
};

export function useCertificateParticipants() {
  const { control } = useFormContext<CertificateFormData>();
  const { fields: participants, append, remove } = useFieldArray({
    control,
    name: "participants",
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allSelected = participants.length > 0 && selectedIds.size === participants.length;
  const hasSelectedParticipants = selectedIds.size > 0;

  const hasParticipantWithCpf = (cpf: string) =>
    participants.some((participant) => participant.cpf === cpf);

  const addParticipant = (participant: ParticipantFormData) => append(participant);

  const toggleSelection = (id: string) => {
    setSelectedIds((current) =>
      current.has(id) ? withoutId(current, id) : new Set(current).add(id),
    );
  };

  const toggleAllSelection = () => {
    setSelectedIds(allSelected ? new Set() : new Set(participants.map(({ id }) => id)));
  };

  const removeParticipant = (id: string) => {
    const index = participants.findIndex((participant) => participant.id === id);
    if (index === -1) return;

    remove(index);
    setSelectedIds((current) => withoutId(current, id));
  };

  const removeSelectedParticipants = () => {
    const selectedIndexes = participants.flatMap((participant, index) =>
      selectedIds.has(participant.id) ? [index] : [],
    );

    remove(selectedIndexes);
    setSelectedIds(new Set());
  };

  return {
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
  };
}