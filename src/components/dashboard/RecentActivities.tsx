import EmptyActivities from '@/assets/EmptyActivities.svg'
import { FaChevronRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons/lib';

interface RecentActivitiesProps {
  data: {
    name: string;
    student: string;
    time: string;
    icon: IconType;
    iconColor: string;
    bgIcon: string;
  }[]
}

export function RecentActivities({ data }: RecentActivitiesProps) {
  return (
    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-6 py-4">
      <h2 className="text-[#171717] font-normal text-lg">Atividades recentes</h2>

      {data.length === 0 && (
        <div className='flex flex-col items-center mt-20'>
          <img src={EmptyActivities} alt='imagem de atividades vazias' />
          <p className="text-[#262626] font-normal text-base">Ainda não há atividades</p>
          <p className="text-center text-[#737373] font-normal text-sm">Quando você começar a emitir certificados, <br />
            as atividades aparecerão aqui.</p>
        </div>
      )}

      <div className='mt-10 flex flex-col gap-[26px]'>
        {data && (
          data.map((activity, index) => (
            <div
              key={index}
              className='flex justify-between gap-4'
            >
              <div className='flex items-center gap-4'>
                <div
                  style={{ backgroundColor: activity.bgIcon, color: activity.iconColor }}
                  className='w-10 h-10 rounded-full flex items-center justify-center'
                >
                  <activity.icon className='w-5 h-5' />
                </div>

                <div>
                  <p className='text-[#111827] font-medium text-sm'>{activity.name}</p>
                  <p className='text-[#6B7280] font-normal text-xs'>Aluno: {activity.student}</p>
                </div>
              </div>

              <div>
                <p className='text-[#9CA3AF] font-normal text-xs'>{activity.time}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Link to='/empresa/certificados' className='flex items-center gap-3 text-[#0066CC] text-sm mx-auto mt-20 cursor-pointer'>Ver certificados <FaChevronRight /></Link>
    </div>
  )
}