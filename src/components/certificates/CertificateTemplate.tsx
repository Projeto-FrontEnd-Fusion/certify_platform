import type { ReactNode } from 'react'
import techLogo from '@/assets/tech-logo.png'
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
}

export function CertificateTemplate({ variant = 'classico' }: CertificateTemplateProps) {
  const { frame, decoration } = VARIANTS[variant]

  return (
    <div
      className={`relative w-full overflow-hidden bg-white flex flex-col items-center px-6 py-3.5 ${frame}`}
    >
      {decoration}

      <p className="tracking-[11px] text-[#0069A8] font-bold text-xs">CERTIFICADO</p>
      <p className="font-normal text-[8px]">de Conclusão de Curso</p>
      <p className="font-normal text-[10px]">Certificamos que</p>
      <p className="font-normal text-lg text-[#0069A8] font-playwrite">Nome do aluno</p>
      <div className="h-0.5 w-full bg-black mb-1.5"></div>

      <p className="font-normal text-[6px]">Concluiu com êxito o curso online</p>
      <p className="font-bold text-[8px] text-[#0069A8]">Desenvolvimento Web Full Stack</p>
      <p className="font-normal text-[6px]">
        com carga horária de <b>160 horas</b>: realizado dia <b>08 de março de 2026</b>.
      </p>

      <div className="flex justify-between items-end w-full">
        <div>
          <img src={techLogo} alt="logo tech" className="w-10 h-8" />
          <p className="font-normal text-[8px] text-black">
            Instituto de Tecnologia e <br /> Desenvolvimento
          </p>
        </div>

        <div>
          <div className="h-0.5 w-full bg-black"></div>
          <div className="p-2">
            <p className="font-normal text-[8px]">Nome do responsável</p>
            <p className="font-normal text-[8px]">Descrição do cargo</p>
          </div>
        </div>
      </div>

      <p className="font-normal text-[8px]">
        Código de autenticidade: <b>DJFEJ338-94320</b>
      </p>
      <p className="font-normal text-[8px]">Esse certificado foi gerado pela Certify</p>
    </div>
  )
}