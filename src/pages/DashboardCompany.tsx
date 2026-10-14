import { CertificateStatusChart } from "@/components/dashboard/charts/CertificateStatusChart";
import { EmissionsChart } from "@/components/dashboard/charts/EmissionsChart";
import { FastActions } from "@/components/dashboard/FastActions";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { useAccountNavigation } from "@/hooks/useAccountNavigation";
import { useQuery } from '@tanstack/react-query';
import { dashboardServiceInstance } from '@/api/implements';
import { useAuthStoreData } from '@/stores/useAuthStore';
import { BiCheck } from "react-icons/bi";
import { NotificationBell } from '@/components/NotificationBell';
import { FaRegClock } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import type { IconType } from "react-icons/lib";
import { LuFileText } from "react-icons/lu";

interface DashboardDataProps {
  name: string;
  value: number | undefined;
  icon: IconType;
  iconColor: string;
  iconBackgroundColor: string;
}

export function DashboardCompany() {
  const { name, initials, openProfile } = useAccountNavigation();
  const { auth } = useAuthStoreData();
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['company-dashboard', auth?._id],
    queryFn: () => dashboardServiceInstance.get(),
    enabled: !!auth?._id,
    retry: false,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  const dashboardData: DashboardDataProps[] = [
    {
      name: "Certificados emitidos",
      value: data?.issued,
      icon: LuFileText,
      iconColor: "#286DC7",
      iconBackgroundColor: "#EFF6FF",
    },
    {
      name: "Pendentes de envio",
      value: data?.pending_delivery,
      icon: FaRegClock,
      iconColor: "#F59E0B",
      iconBackgroundColor: "#FFFBEB",
    },
    {
      name: "Participantes certificados",
      value: data?.participants,
      icon: FiUsers,
      iconColor: "#10B981",
      iconBackgroundColor: "#ECFDF5",
    }
  ]

  const emissionsData = (data?.emissions ?? []).map(item => ({
    ...item,
    month: new Date(`${item.month}-01T00:00:00Z`).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit', timeZone: 'UTC' }),
  }));
  const certificateStatusData = [
    { name: 'Enviado', value: data?.sent ?? 0, color: '#538bf8' },
    { name: 'Emitido sem envio confirmado', value: (data?.issued ?? 0) - (data?.sent ?? 0), color: '#52e3ac' },
  ];
  const recentActivities = (data?.recent_activities ?? []).map(item => ({
    name: item.name,
    student: item.student,
    time: new Date(item.issued_at).toLocaleString('pt-BR'),
    icon: BiCheck,
    iconColor: '#22C55E',
    bgIcon: '#F0FDF4',
  }));

  return (
    <div>
      <header className="flex justify-between">
        <div>
          <h1 className="text-black font-bold text-2xl md:text-[30px] mb-1">Dashboard</h1>
          <p className="text-black/45 font-normal text-xs md:text-sm">Acompanhe a visão geral da emissão e gestão de certificados.</p>
        </div>

        <div className="hidden md:flex items-center">
          <NotificationBell />

          <button type="button" onClick={openProfile} aria-label="Abrir meu perfil" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0069A833] text-[#0069A8] font-bold text-sm border border-[#0069A84D] ml-6 mr-3">
            {initials}
          </button>

          <div className="flex flex-col justify-center">
            <p className="font-semibold text-black text-sm">{name}</p>
            <span className="font-normal text-black/45 text-xs">Administrador</span>
          </div>
        </div>
      </header>

      {isPending && <p role="status" className="my-6">Carregando dashboard...</p>}
      {isError && (
        <div role="alert" className="my-6">
          <p>Não foi possível carregar o dashboard.</p>
          <button type="button" disabled={isFetching} onClick={() => void refetch()}>Tentar novamente</button>
        </div>
      )}
      {data && !isError && <main className="mt-9">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                <p className="text-[#171717] font-normal text-2xl">{data.value ?? "—"}</p>
              </div>
            </div>))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <EmissionsChart emissions={emissionsData} />

          <CertificateStatusChart data={certificateStatusData} />

          <RecentActivities data={recentActivities} />

          <FastActions />
        </div>
      </main>}
    </div>
  )
}
