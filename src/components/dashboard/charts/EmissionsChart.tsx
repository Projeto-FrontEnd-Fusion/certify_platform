import { CustomSelect } from "@/components/certificates/CustomSelect";
import EmptyEmission from '@/assets/EmptyEmission.svg'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

interface EmissionsChartProps {
  emissions: {
    month: string;
    emissions: number;
  }[]
}

export function EmissionsChart({ emissions }: EmissionsChartProps) {

  const emissionsTimeOptions = [
    "Últimos 6 meses",
    "Últimos 7 meses",
    "Últimos 30 dias",
    "Últimos 3 meses",
  ]

  return (
    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-[#171717] font-normal text-lg">Emissões por mês</h2>

        <div className="w-full max-w-[155px]">
          <CustomSelect
            options={emissionsTimeOptions}
          />
        </div>
      </div>

      {emissions ? (
        <BarChart
          style={{ width: '100%', maxHeight: '270px', aspectRatio: 1.618 }}
          responsive
          data={emissions}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid vertical={false} stroke="#EFEFEF" />
          <XAxis dataKey="month" axisLine={false} />
          <YAxis axisLine={false} />
          <Tooltip defaultIndex={2} />
          <Bar
            dataKey="emissions"
            fill="#1A73E8"
            fillOpacity={0.85}
            radius={4}
            barSize={30}
          />
        </BarChart>
      ) : (
        <div className="flex flex-col items-center">
          <img src={EmptyEmission} alt='imagem de emissão vazia' />
          <p className="text-[#262626] font-normal text-base">Ainda não há emissões</p>
          <p className="text-center text-[#737373] font-normal text-sm">Quando você emitir certificados, o <br />
            gráfico mostrará suas emissões por <br />
            mês.</p>
        </div>
      )
      }
    </div>
  )
}