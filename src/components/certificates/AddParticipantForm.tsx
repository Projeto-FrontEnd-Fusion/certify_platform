import type { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus } from "react-icons/fa6";
import { PrimaryButton } from "@/components/ButtonPrimary";
import { participantSchema, type ParticipantFormData } from "@/schemas/CertificateSchema";
import { formatCPF } from "@/utils/formatCpf";
import { Field } from "./form/Field";

type AddParticipantFormProps = {
  onAddParticipant: (participant: ParticipantFormData) => void;
  hasParticipantWithCpf: (cpf: string) => boolean;
};

const INPUT_CLASS_NAME =
  "h-10 w-full rounded-sm border border-[#A1A1A133] bg-white px-3 text-xs text-[#404040] outline-none";

export function AddParticipantForm({
  onAddParticipant,
  hasParticipantWithCpf,
}: AddParticipantFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<ParticipantFormData>({
    resolver: zodResolver(participantSchema),
    defaultValues: { name: "", email: "", cpf: "" },
  });

  const submitParticipant = handleSubmit((participant) => {
    if (hasParticipantWithCpf(participant.cpf)) {
      setError("cpf", { message: "Este CPF já foi adicionado" });
      return;
    }

    onAddParticipant(participant);
    reset();
    setFocus("name");
  });

  // Enter adiciona o participante sem submeter o formulário do certificado (pai).
  const handleEnterKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    submitParticipant();
  };

  return (
    <div onKeyDown={handleEnterKey}>
      <div className="grid grid-cols-2 gap-x-4 mt-6">
        <Field label="Nome do aluno" error={errors.name?.message}>
          <input
            {...register("name")}
            className={INPUT_CLASS_NAME}
            placeholder="Digite o nome completo do aluno"
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            className={INPUT_CLASS_NAME}
            placeholder="Digite o e-mail do aluno"
          />
        </Field>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="w-full max-w-[420px]">
          <Field label="CPF" error={errors.cpf?.message}>
            <input
              {...register("cpf", {
                onChange: (event) => {
                  event.target.value = formatCPF(event.target.value);
                },
              })}
              inputMode="numeric"
              maxLength={14}
              className={INPUT_CLASS_NAME}
              placeholder="Digite o CPF do aluno"
            />
          </Field>
        </div>

        <div className="h-10 w-[140px]">
          <PrimaryButton onClick={submitParticipant}>
            <div className="flex justify-center items-center gap-2">
              <FaPlus />
              Adicionar aluno
            </div>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}