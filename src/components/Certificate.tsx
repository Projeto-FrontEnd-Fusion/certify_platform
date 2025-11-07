import { LuCalendarCheck2, LuCalendarFold, LuHourglass } from "react-icons/lu";
import BackgroundImage from "@/assets/BackgroundCertificate.svg";
import MedalCertificate from "@/assets/MedalCertificate.svg";
import { useAuthStoreData } from "@/stores/useAuthStore";
import { useCertificateStoreData } from "@/stores/useCertificateStore";
import { formatDate } from "@/utils/FormatDate";

export const Certificate = () => {
  const { auth } = useAuthStoreData();
  const { certificate } = useCertificateStoreData();

   const decriptionSplit =
     certificate?.description.split(certificate?.event_name ?? "") || [];

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

      <p className="text-[26px] text-white z-10 uppercase">
        a {certificate?.institution_name} certifica que:
      </p>

      <h3 className="text-6xl text-[#32E399] mt-3.5 mb-8 z-10">
        {certificate?.participant_name || auth?.fullname}
      </h3>

      <p className="font-extralight text-white text-[26px] -tracking-wider mb-4 z-10 break-words">
        {decriptionSplit[0]}
        <strong className="font-bold">{certificate?.event_name}</strong>
        {decriptionSplit[1]}
      </p>

      <ul className="flex gap-14 mt-12 z-10">
        <li className="flex text-2xl text-white gap-2">
          <LuHourglass color="#32E399" strokeWidth={1} size={56} />
          <div className="flex flex-col">
            <span className="font-light">Carga Horária</span>
            <span className="font-bold">{certificate?.workload || 0} Horas</span>
          </div>
        </li>
        <li className="flex text-2xl text-white gap-2">
          <LuCalendarFold color="#32E399" strokeWidth={1} size={56} />
          <div className="flex flex-col">
            <span className="font-light">Início</span>
            <span className="font-bold">{formatDate(certificate?.event_start)}</span>
          </div>
        </li>
        <li className="flex text-2xl text-white gap-2">
          <LuCalendarCheck2 color="#32E399" strokeWidth={1} size={56} />
          <div className="flex flex-col">
            <span className="font-light">Conclusão</span>
            <span className="font-bold">{formatDate(certificate?.event_end)}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};