import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query';
import { authServiceInstance } from '@/api/implements';
import { useAuthStoreData } from '@/stores/useAuthStore';
import { certificateDate, type PublicCertificate } from '@/lib/certificate-display';
import type { CertificateFormData } from '@/schemas/CertificateSchema';
import type { DeepPartial } from 'react-hook-form';
import type { CertificateVariant } from './types';
import ornamentalFrame from '@/assets/certification-decoration.svg'

const VARIANTS: Record<
  CertificateVariant,
  { frame: string; decoration?: ReactNode }
> = {
  classico: {
    frame:
      'border-8 border-transparent [border-image:linear-gradient(90deg,#1A2856_0%,#334EA9_100%)_1]',
  },

  moderno: {
    frame: 'border-4 border-[#0069A8]',
    decoration: (
      <>
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-14 w-14 bg-[#0069A8] [clip-path:polygon(0_0,100%_0,0_100%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-5 w-5 bg-[#5DB4FF] [clip-path:polygon(0_0,100%_0,0_100%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 bg-[#0069A8] [clip-path:polygon(100%_100%,100%_0,0_100%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 bg-[#5DB4FF] [clip-path:polygon(100%_100%,100%_0,0_100%)]"
        />
      </>
    ),
  },
  ornamental: {
    frame: '',
    decoration: (
      <>
        <img
          src={ornamentalFrame}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-auto w-full"
        />
        {/* fecha a linha inferior, alinhada à linha externa do SVG (x ≈ 0,8%) */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[0.8%] right-[0.8%] h-px bg-[#0069A8]"
        />
      </>
    ),
  },
  'sem-borda': {
    frame: 'border border-[#E5E5E5]',
  },
}

interface CertificateTemplateProps {
  variant?: CertificateVariant
  data?: DeepPartial<CertificateFormData>;
  certificate?: PublicCertificate;
}

export function CertificateTemplate({ variant = 'classico', data, certificate }: CertificateTemplateProps) {
  const { frame, decoration } = VARIANTS[variant]
  const {auth, accessToken} = useAuthStoreData();
  const profile = useQuery({queryKey: ['account-profile', auth?._id],
    enabled: !!accessToken && !!auth?._id && !certificate,
    queryFn: () => authServiceInstance.getProfile(), staleTime: 60_000, retry: false});
  const institution = certificate?.institution_name || profile.data?.razao_social || profile.data?.fullname;
  const logo = certificate?.design?.logo?.dataUrl || data?.logo?.dataUrl;
  const signature = certificate?.design?.signature?.dataUrl || data?.signature?.dataUrl;
  const participant = certificate?.participant_name || data?.participants?.[0]?.name;
  const activity = certificate?.event_name || data?.activityName;
  const workload = certificate?.workload || data?.workload;
  const endDate = certificate?.event_end || (data?.endDate ? `${data.endDate}T12:00:00` : undefined);

  return (
    <div
      role="region"
      aria-label="Prévia do certificado"
      className={`relative w-full overflow-hidden bg-white flex flex-col items-center px-6 py-3.5 ${frame}`}
    >
      {decoration}
      {!certificate && <p className="text-[8px] text-gray-500">{data ? 'Prévia — certificado ainda não emitido' : 'Prévia do modelo'}</p>}

      <p className="tracking-[11px] text-[#0069A8] font-bold text-xs">CERTIFICADO</p>
      <p className="font-normal text-[8px]">{certificate?.description || data?.description || 'Descrição da certificação'}</p>
      <p className="font-normal text-[10px]">Certificamos que</p>
      <p className="font-normal text-lg text-[#0069A8] font-playwrite">{participant || 'Participante a definir'}</p>
      <div className="h-0.5 w-full bg-black mb-1.5"></div>

      <p className="font-normal text-[6px]">{data?.activityType}{data?.modalityEnabled && data.modality ? ` · ${data.modality}` : ''}</p>
      <p className="font-bold text-[8px] text-[#0069A8]">{activity || 'Atividade a definir'}</p>
      <p className="font-normal text-[6px]">
        Carga horária: <b>{workload ? `${workload} horas` : 'A definir'}</b> · Término: <b>{certificateDate(endDate)}</b>
      </p>

      <div className="flex justify-between items-end w-full">
        <div>
          {logo && <img src={logo} alt="Logo da instituição emissora" className="w-10 h-8 object-contain" />}
          <p className="font-normal text-[8px] text-black">
            {institution || (profile.isError ? 'Não foi possível carregar a instituição' : profile.isFetching ? 'Carregando instituição...' : 'Instituição a definir')}
          </p>
        </div>

        <div>
          {signature && <img src={signature} alt="Assinatura da instituição emissora" className="h-8 max-w-24 object-contain" />}
          <div className="h-0.5 w-full bg-black"></div>
          <div className="p-2">
            <p className="font-normal text-[8px]">{institution || 'Instituição emissora'}</p>
          </div>
        </div>
      </div>

      <p className="font-normal text-[8px]">
        Código de autenticidade: <b>{certificate?.access_key || 'Disponível após a emissão'}</b>
      </p>
      <p className="font-normal text-[8px]">Esse certificado foi gerado pela Certify</p>
    </div>
  )
}
