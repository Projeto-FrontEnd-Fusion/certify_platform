import CheckedIcon from "@/assets/Checked.svg";
import { LuCalendarDays, LuDownload } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import NotFound from "@/assets/NotFound.svg";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export const MyCertificates = () => {
  const SimulateCertify = 2;

  return (
    <section className="font-inter flex items-center pt-20 flex-col h-full bg-[#F2F2F9] gap-8 px-4">
      <ToastContainer />
      {SimulateCertify >= 1 ? (
        <>
          <h2 className="text-xl text-[#1A1551] flex flex-col max-w-40  text-center font-semibold  sm:max-w-fit gap-2">
            <span>🎉</span> Certificados encontrados!
          </h2>
          <table className="w-full max-w-2xl min-[900px]:max-w-4xl min-[1120px]:max-w-[68rem] xl:max-w-[78rem] 2xl:max-w-[90rem]">
            <thead className="hidden min-[900px]:flex bg-[#3925DD] rounded-t-lg">
              <tr className="flex  w-full py-4 px-14  items-center text-[#FFFFFF] text-lg ">
                <th className="w-58 flex items-start min-[1120px]:w-74 xl:w-74 xl:pl-18 2xl:w-100">
                  Emissor
                </th>
                <th className="w-58 flex items-start min-[1120px]:w-74 xl:w-74 xl:pl-18 2xl:w-100">
                  Evento
                </th>
                <th className="w-58 flex items-start min-[1120px]:w-70 xl:w-100 xl:pl-18 2xl:w-100">
                  Data
                </th>
                <th className="flex items-start">Ações</th>
              </tr>
            </thead>
            <tbody className="space-y-4 min-[900px]:w-full min-[900px]:space-y-0">
              <tr className="flex flex-col gap-4  bg-[#1E84F214] px-6 py-6 rounded-lg min-[900px]:bg-white min-[900px]:rounded-t-none min-[900px]:flex-row  min-[900px]:w-full min-[900px]:pl-14 min-[900px]:pr-0 xl:pl-32">
                <td className="font-inter text-[#8A38F5] flex py-1.5 px-3.5 bg-[#8a38f529] rounded-full gap-1 items-center select-none w-fit font-bold text-xs min-[900px]:hidden">
                  <img src={CheckedIcon} alt="Segurança verificada" />
                  Certificado
                </td>

                <td className="font-inter text-[#3925DD] text-xl  break-words max-w-72 min-[900px]:text-sm min-[900px]:w-55 min-[900px]:items-center min-[1120px]:mr-15 xl:mr-6.5 xl:text-base xl:w-64 2xl:mr-32">
                  Comunidade frontend fusion
                </td>

                <td className="font-inter text-[#3925DD] text-xl font-bold min-[900px]:text-sm min-[900px]:w-55 break-words max-w-72 min-[1120px]:mr-16  xl:mr-15.5 xl:text-base 2xl:mr-42">
                  Imersão Dev insigths
                </td>

                <td className="flex gap-1 text-[#3925DD]  min-[900px]:text-sm max-w-22 break-words min-[900px]:block xl:mr-42.5 min-[900px]:mr-24 min-[1120px]:mr-38  xl:text-base xl:max-w-26 ">
                  <LuCalendarDays className="shrink-0 text-xl min-[900px]:hidden" />
                  <span className="w-full break-words">07/10/2025</span>
                </td>

                <td className="flex gap-2 w-full flex-wrap sm:gap-4 min-[900px]:w-fit min-[900px]:gap-6">
                  <Link
                    to={"/download-certificado"}
                    className="flex flex-1 justify-center items-center text-[#3925DD] text-sm  w-full py-2 border-2 border-[#3925DD] rounded-lg gap-2 cursor-pointer font-semibold duration-300 transtion  hover:shadow-[0_0_20px_0.5px_rgba(57,37,221,0.5)]  active:scale-95 min-[900px]:text-xs min-[900px]:py-1  min-[900px]:flex-0 min-[900px]:border-0 min-[900px]:hover:text-[#190e66] min-[900px]:hover:shadow-none xl:text-base xl:items-center"
                  >
                    <LuDownload className="text-xl min-[900px]:text-lg" />
                    Baixar
                  </Link>
                  <button className="flex flex-1 justify-center items-center text-[#3925DD] text-sm w-full py-2 border-2 border-[#3925DD] rounded-lg gap-1 cursor-pointer font-semibold duration-300 hover:shadow-[0_0_20px_0.5px_rgba(57,37,221,0.5)] active:scale-95 min-[900px]:text-xs min-[900px]:py-1  min-[900px]:flex-0 min-[900px]:border-0 min-[900px]:hover:text-[#190e66] min-[900px]:hover:shadow-none xl:text-base xl:items-center">
                    <LuEye className="text-xl min-[900px]:text-lg" />
                    Visualizar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2 className="text-[#1A1551] font-semibold text-xl text-center ">
            Nenhum <br className="sm:hidden" />
            certificado encontrado!
          </h2>
          <img src={NotFound} alt="Icone de não encontrado" />
        </>
      )}
    </section>
  );
};
