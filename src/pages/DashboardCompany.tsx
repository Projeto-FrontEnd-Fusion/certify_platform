import { CertificateStatusChart } from "@/components/dashboard/charts/CertificateStatusChart";
import { EmissionsChart } from "@/components/dashboard/charts/EmissionsChart";
import { FastActions } from "@/components/dashboard/FastActions";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { useAccountNavigation } from "@/hooks/useAccountNavigation";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { FiEdit, FiUsers } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import type { IconType } from "react-icons/lib";
import { LuFileText } from "react-icons/lu";

interface DashboardDataProps {
  name: string;
  value: number;
  icon: IconType;
  iconColor: string;
  iconBackgroundColor: string;
}

export function DashboardCompany() {
  const { name, initials, openProfile } = useAccountNavigation();
  const [isWarning, setIsWarning] = useState(true)

  const dashboardData: DashboardDataProps[] = [
    {
      name: "Certificados emitidos",
      value: 0,
      icon: LuFileText,
      iconColor: "#286DC7",
      iconBackgroundColor: "#EFF6FF",
    },
    {
      name: "Pendentes de envio",
      value: 0,
      icon: FaRegClock,
      iconColor: "#F59E0B",
      iconBackgroundColor: "#FFFBEB",
    },
    {
      name: "Rascunhos",
      value: 0,
      icon: FiEdit,
      iconColor: "#F97316",
      iconBackgroundColor: "#FFF7ED",
    },
    {
      name: "Alunos cadastrados",
      value: 0,
      icon: FiUsers,
      iconColor: "#10B981",
      iconBackgroundColor: "#ECFDF5",
    }
  ]

  const emissionsData = [
    { month: 'Jan', emissions: 4200 },
    { month: 'Fev', emissions: 5800 },
    { month: 'Mar', emissions: 7200 },
    { month: 'Abr', emissions: 6100 },
    { month: 'Mai', emissions: 8900 },
    { month: 'Jun', emissions: 7400 },
  ];

  const certificateStatusData = [
    { name: 'Emitido', value: 198, color: '#52e3ac' },
    { name: 'Enviado', value: 36, color: '#538bf8' },
    { name: 'Rascunho', value: 14, color: '#ffb375' },
  ];

  const recentActivities = [
    {
      name: 'Certificado ux/ui',
      student: 'Pedro Santos',
      time: '2 min atrás',
      icon: BiCheck,
      iconColor: '#22C55E',
      bgIcon: '#F0FDF4'
    },
    {
      name: 'Certificado ux/ui',
      student: 'Pedro Santos',
      time: '2 min atrás',
      icon: BiCheck,
      iconColor: '#22C55E',
      bgIcon: '#F0FDF4'
    },
  ]

  return (
    <div>
      <header className="flex justify-between">
        <div>
          <h1 className="text-black font-bold text-2xl md:text-[30px] mb-1">Dashboard</h1>
          <p className="text-black/45 font-normal text-xs md:text-sm">Acompanhe a visão geral da emissão e gestão de certificados.</p>
        </div>

        <div className="hidden md:flex items-center">
          <button disabled aria-label="Notificações indisponíveis" title="Notificações ainda não disponíveis" className="opacity-40">
            <CiBellOn className="text-black/45 w-5 h-5" />
          </button>

          <button type="button" onClick={openProfile} aria-label="Abrir meu perfil" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0069A833] text-[#0069A8] font-bold text-sm border border-[#0069A84D] ml-6 mr-3">
            {initials}
          </button>

          <div className="flex flex-col justify-center">
            <p className="font-semibold text-black text-sm">{name}</p>
            <span className="font-normal text-black/45 text-xs">Administrador</span>
          </div>
        </div>
      </header>

      {isWarning && (
        <div className="bg-[#FEF1F0] rounded-lg border border-[#FBCFCB] px-4 py-3 flex flex-col items-end gap-3 md:gap-0 md:flex-row md:justify-between md:items-center my-3">
          <div className="flex items-center gap-4">
            <IoWarningOutline className="w-6 h-6 text-[#EB5757]" />

            <div>
              <p className="text-[#171717] font-semibold text-sm">Instabilidade no envio de certificados</p>
              <p className="text-[#525252] font-normal text-xs">No momento, o envio por e-mail pode apresentar falhas. Nossa equipe já está atuando.</p>
            </div>
          </div>

          <button
            onClick={() => setIsWarning(false)}
            className="text-[#C10007] font-semibold text-sm bg-[#C100071A] border border-[#C1000780] rounded-md px-3 py-2 cursor-pointer">
            Atualizar status
          </button>
        </div>
      )}

      <main className={`${!isWarning && "mt-9"}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {dashboardData.map((data, index) => (
            <div key={index} className="bg-[#FAFAFA] rounded-xl shadow px-4 py-6 flex flex-col md:flex-row items-center gap-3">
              <div
                style={{ backgroundColor: data.iconBackgroundColor }}
                className={`w-12 h-12 flex justify-center items-center rounded-full`}>
                <data.icon
                  style={{ color: data.iconColor }}
                  className={`w-5 h-5`} />
              </div>
              <div className="text-center md:text-start">
                <p className="text-[#525252] font-normal text-sm">{data.name}</p>
                <p className="text-[#171717] font-normal text-2xl">{data.value}</p>
              </div>
            </div>))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <EmissionsChart emissions={emissionsData} />

          <CertificateStatusChart data={certificateStatusData} />

          <RecentActivities data={recentActivities} />

          <FastActions />
        </div>
      </main>
    </div>
  )
}