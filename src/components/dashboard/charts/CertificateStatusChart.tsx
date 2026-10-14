import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export interface CertificateDataItem {
  name: string;
  value: number;
  color: string;
}

interface CertificateStatusChartProps {
  data?: CertificateDataItem[];
}

const DEFAULT_DATA: CertificateDataItem[] = [
  { name: 'Emitido', value: 0, color: '#52e3ac' },
  { name: 'Enviado', value: 0, color: '#538bf8' },
  { name: 'Rascunho', value: 0, color: '#ffb375' },
];

const RenderCenterText = ({ cx, cy, total }: { cx?: number; cy?: number; total: number }) => {
  if (cx === undefined || cy === undefined) return null;
  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: '14px', fill: '#6b7280', fontFamily: 'sans-serif' }}
      >
        Total
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: '24px', fontWeight: 'bold', fill: '#111827', fontFamily: 'sans-serif' }}
      >
        {total}
      </text>
    </g>
  );
};

export function CertificateStatusChart({ data = DEFAULT_DATA }: CertificateStatusChartProps) {
  const chartData = data.length > 0 ? data : DEFAULT_DATA;
  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  const pieRenderData =
    total === 0
      ? [{ name: 'Sem dados', value: 1, color: '#e5e7eb' }]
      : chartData;

  return (
    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl p-6 w-full">
      <h2 className="text-[#171717] font-normal text-lg mb-4">Status dos certificados</h2>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 md:px-6">
        <div className="w-full sm:w-1/2 h-[220px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieRenderData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {pieRenderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={total === 0 ? '#e5e7eb' : entry.color}
                  />
                ))}
              </Pie>

              <Pie
                data={[{ value: 1 }]}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={0}
                dataKey="value"
                label={<RenderCenterText total={total} />}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          {chartData.map((item, index) => {
            const percentage = total > 0
              ? ((item.value / total) * 100).toFixed(1).replace('.', ',')
              : '0,0';

            return (
              <div key={index} className="flex items-center justify-center md:justify-end gap-2.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700 font-medium">{item.name}</span>
                </div>
                <div className="text-gray-500">
                  <span className="mr-1.5">{item.value}</span>
                  <span>({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}