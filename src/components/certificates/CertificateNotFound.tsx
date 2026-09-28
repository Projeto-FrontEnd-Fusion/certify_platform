import NotFoundCertificateIcon from '@/assets/NotFoundCertificateIcon.svg'

interface CertificateNotFoundProps {
  query: string;
}

export function CertificateNotFound({ query }: CertificateNotFoundProps) {
  return (
    <div className="flex min-h-[570px] flex-col items-center justify-center">
      <div className="mb-4 flex h-48 w-64 items-center justify-center">
        <img src={NotFoundCertificateIcon} />
      </div>

      <h3 className="text-base font-semibold text-[#111111]">
        Nenhum certificado encontrado
      </h3>

      <p className="mt-1 text-sm text-[#111111]/40">
        Não encontramos resultados para "{query}".
      </p>
    </div>
  )
}