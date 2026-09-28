import ErrorCertificateIcon from '@/assets/ErrorCertificateIcon.svg'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface CertificateErrorProps {
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function CertificateError({ onRetry, isRetrying = false }: CertificateErrorProps) {
  return (
    <div className="flex min-h-[570px] flex-col items-center justify-center">
      <div
        className="
          mb-4
          flex
          h-48
          w-64
          items-center
          justify-center
        "
      >
        <img
          src={ErrorCertificateIcon}
        />
      </div>

      <h3 className="text-base font-semibold text-[#111111]">
        Não foi possível carregar os certificados
      </h3>

      <p className="mt-1 text-sm text-[#111111]/40">
        Tente novamente em alguns instantes
      </p>

      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
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
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >
        {isRetrying && (
          <AiOutlineLoading3Quarters size={20} className="animate-spin" />
        )}
        Tente novamente
      </button>
    </div>
  )
}