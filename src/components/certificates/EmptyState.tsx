import { MdAdd } from "react-icons/md";
import EmptyCertificateIcon from '@/assets/EmptyCertificateIcon.svg'

interface EmptyStateProps {
  onCreate?: () => void;
}

export function EmptyState({
  onCreate,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[570px] flex-col items-center justify-center">
      <div
        className="
          mb-4
          flex
          h-28
          w-28
          items-center
          justify-center
        "
      >
        <img
          src={EmptyCertificateIcon}
        />
      </div>

      <h3 className="text-base font-semibold text-[#111111]">
        Nenhum certificado criado ainda
      </h3>

      <p className="mt-1 text-sm text-[#111111]/40">
        Crie seu primeiro certificado para começar
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="
          mt-5
          inline-flex
          items-center
          gap-2
          rounded-md
          bg-[#0069A8]
          px-5
          py-2.5
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
        <MdAdd size={20} />
        Novo certificado
      </button>
    </div>
  );
}