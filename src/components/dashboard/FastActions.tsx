import { BiPlus } from "react-icons/bi"
import { FaChevronRight, FaRegFile, FaUserPlus } from "react-icons/fa6"
import { IoLayers } from "react-icons/io5"

export function FastActions() {

  const actionOptions = [
    {
      name: 'Novo certificado',
      description: 'Crie e emita um novo certificado',
      icon: BiPlus,
      bgColor: '#2563EB',
    },
    {
      name: 'Adicionar aluno',
      description: 'Cadastre alunos e acompanhe seus certificados',
      icon: FaUserPlus,
      bgColor: '#10B981',
    },
    {
      name: 'Conhecer modelos',
      description: 'Explore modelos prontos e personalize',
      icon: IoLayers,
      bgColor: '#A855F7',
    },
    {
      name: 'Gerenciar certificados',
      description: 'Visualize, edite e acompanhe seus certificados',
      icon: FaRegFile,
      bgColor: '#DC55F7',
    },
  ]

  return (
    <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-6 py-4">
      <h2 className="text-[#171717] font-normal text-lg mb-5">Ações rápidas</h2>

      <div className="flex flex-col gap-3">
        {actionOptions.map((action, index) => (
          <div key={index} className="bg-transparent border border-[#E5E5E5] rounded-xl px-4 py-5 flex justify-between items-center cursor-pointer">
            <div className="flex items-center gap-4">
              <div style={{ backgroundColor: action.bgColor }} className="w-10 h-10 flex justify-center items-center rounded-lg text-white">
                <action.icon className="w-5 h-5" />
              </div>

              <div>
                <p className="text-[#171717] font-medium text-sm ">{action.name}</p>
                <p className="text-[#525252] font-normal text-xs">{action.description}</p>
              </div>
            </div>

            <FaChevronRight className="text-[#A1A1A1]" />
          </div>
        ))}
      </div>
    </div>
  )
}