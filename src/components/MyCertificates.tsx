import CheckedIcon from "@/assets/Checked.svg";
import { LuCalendarDays, LuDownload } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

export const MyCertificates = () => {
  return (
    <section className="font-inter flex items-center pt-20 flex-col h-full bg-[#F2F2F9] gap-8 px-4">
      <h2 className="text-xl text-[#1A1551] flex flex-col max-w-40  text-center font-semibold  sm:max-w-fit gap-2">
        <span>🎉</span> Certificados encontrados!
      </h2>
      <table className="w-full max-w-2xl min-[900px]:max-w-4xl xl:max-w-6xl">
        <thead className="hidden min-[900px]:flex bg-[#3925DD] rounded-t-lg">
          <tr className="flex  w-full py-4 px-14  items-center text-[#FFFFFF] text-lg">
            <th className="w-56 flex items-start xl:w-74">Emissor</th>
            <th className="w-56 flex items-start xl:w-74">Evento</th>
            <th className="w-54 flex items-start xl:w-74">Data</th>
            <th className=" flex items-start">Ações</th>
          </tr>
        </thead>
        <tbody className="space-y-4 min-[900px]:w-full min-[900px]:space-y-0">
          <tr className="flex flex-col gap-4  bg-[#1E84F214] px-6 py-6 rounded-lg min-[900px]:bg-white min-[900px]:rounded-t-none min-[900px]:flex-row  min-[900px]:w-full min-[900px]:pl-14 min-[900px]:pr-0">
            <td className="font-inter text-[#8A38F5] flex py-1.5 px-3.5 bg-[#8a38f529] rounded-full gap-1 items-center select-none w-fit font-bold text-xs min-[900px]:hidden">
              <img src={CheckedIcon} alt="Segurança verificada" />
              Certificado
            </td>

            <td className="font-inter text-[#3925DD] text-xl  break-words max-w-72 min-[900px]:text-sm min-[900px]:w-52 min-[900px]:items-center xl:mr-6.5 xl:text-base xl:w-64">
              Comunidade frontend fusion
            </td>

            <td className="font-inter text-[#3925DD] text-xl font-bold min-[900px]:text-sm min-[900px]:w-52 break-words max-w-72 xl:mr-18 xl:text-base">
              Imersão Dev insigths
            </td>

            <td className="flex gap-1 text-[#3925DD]  min-[900px]:text-sm max-w-22 break-words min-[900px]:block xl:mr-35 min-[900px]:mr-20 xl:text-base xl:max-w-26">
              <LuCalendarDays className="shrink-0 text-xl min-[900px]:hidden" />
              <span className="w-full break-words">07/10/2025</span>
            </td>

            <td className="flex gap-2 w-full flex-wrap sm:gap-4 min-[900px]:w-fit min-[900px]:gap-6">
              <button className="flex flex-1 justify-center items-center text-[#3925DD] text-sm  w-full py-2 border-2 border-[#3925DD] rounded-lg gap-2 cursor-pointer font-semibold duration-300 transtion  hover:shadow-[0_0_20px_0.5px_rgba(57,37,221,0.5)]  active:scale-95 min-[900px]:text-xs min-[900px]:py-1  min-[900px]:flex-0 min-[900px]:border-0 min-[900px]:hover:text-[#190e66] min-[900px]:hover:shadow-none xl:text-base xl:items-center">
                <LuDownload className="text-xl min-[900px]:text-lg" />
                Baixar
              </button>
              <button className="flex flex-1 justify-center items-center text-[#3925DD] text-sm w-full py-2 border-2 border-[#3925DD] rounded-lg gap-1 cursor-pointer font-semibold duration-300 hover:shadow-[0_0_20px_0.5px_rgba(57,37,221,0.5)] active:scale-95 min-[900px]:text-xs min-[900px]:py-1  min-[900px]:flex-0 min-[900px]:border-0 min-[900px]:hover:text-[#190e66] min-[900px]:hover:shadow-none xl:text-base xl:items-center">
                <LuEye className="text-xl min-[900px]:text-lg" />
                Visualizar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
