import { LuCalendarCheck2, LuCalendarFold, LuHourglass } from "react-icons/lu";
import BackgroundImage from "@/assets/BackgroundCertificate.svg";
import MedalCertificate from "@/assets/MedalCertificate.svg";
import { useAuthStoreData } from "@/stores/useAuthStore";

export const Certificate = () => {
  const {auth} = useAuthStoreData()
  return (
     <div
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        className={`w-[297mm] h-[210mm] bg-cover bg-center px-16 flex 
          flex-col py-14 relative scale-[0.3] md:scale-[0.6] lg:scale-[0.8] 
          xl:scale-100 origin-top`}
      >
        <img
          src={MedalCertificate}
          alt="Medalha de certificação"
          className="w-52 absolute right-3 top-10"
        />
        <h2 className="text-8xl text-[#F79021] font-judson mb-12 z-10">
          Certificado
        </h2>

        <p className="text-[26px] text-white z-10">
          A COMUNIDADE FRONTEND FUSION CERTIFICA QUE:
        </p>

        <h3 className="text-6xl text-[#32E399] mt-3.5 mb-8 z-10">
          {auth?.fullname}
        </h3>

        <p className="font-extralight text-white text-[26px] -tracking-wider mb-4 z-10">
          Participou da <span className="font-bold">Imersão Dev Insights</span>,
          realizada nos dias 5, 6 e 7 de novembro, um evento voltado ao
          aprendizado, conexão e desenvolvimento em gestão de produtos e
          metodologias ágeis.
        </p>

        <p className="font-extralight text-white text-[26px] -tracking-wider z-10">
          Durante esta imersão, o(a) participante teve contato com conteúdos
          ministrados por profissionais experientes, desenvolvendo habilidades
          essenciais para atuar em ambientes ágeis e projetos de produtos
          digitais.
        </p>

        <ul className="flex gap-14 mt-12 z-10">
          <li className="flex text-2xl text-white gap-2">
            <LuHourglass color="#32E399" strokeWidth={1} size={56} />
            <div className="flex flex-col">
              <span className="font-light">Carga Horária</span>
              <span className="font-bold">09 Horas</span>
            </div>
          </li>
          <li className="flex text-2xl text-white gap-2">
            <LuCalendarFold color="#32E399" strokeWidth={1} size={56} />
            <div className="flex flex-col">
              <span className="font-light">Início</span>
              <span className="font-bold">05/11/2025</span>
            </div>
          </li>
          <li className="flex text-2xl text-white gap-2">
            <LuCalendarCheck2 color="#32E399" strokeWidth={1} size={56} />
            <div className="flex flex-col">
              <span className="font-light">Conclusão</span>
              <span className="font-bold">07/11/2025</span>
            </div>
          </li>
        </ul>
      </div>
  );
};