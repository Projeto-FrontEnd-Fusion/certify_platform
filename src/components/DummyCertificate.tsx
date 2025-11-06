import { type RefObject } from "react";
import { LuHourglass, LuCalendarFold, LuCalendarCheck2 } from "react-icons/lu";
import MedalCertificate from "@/assets/MedalCertificate.svg";
import BackgroundImage from "@/assets/BackgroundCertificate.svg";
import { formatDate } from "@/utils/FormatDate";
import { useAuthStoreData } from "@/stores/useAuthStore";
import { useCertificateStoreData } from "@/stores/useCertificateStore";

export const DummyCertificade = ({
  printRef,
}: {
  printRef: RefObject<HTMLDivElement | null>;
}) => {
  const { auth } = useAuthStoreData();
  const { certificate } = useCertificateStoreData();

   const decriptionSplit =
     certificate?.description.split(certificate?.event_name ?? "") || [];

  return (
    <>
      <div
        ref={printRef}
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        className={`w-[70.05rem] h-[50rem]  bg-cover bg-center px-13  flex flex-col py-14  select-none pointer-events-none absolute -z-999  
         [clip-path:polygon(0_0,0_0,0_0,0_0)] top-0 left-0`}
      >
        <img
          src={MedalCertificate}
          alt="Medalha de certificação"
          className="w-52 absolute right-3 top-10"
        />

        <h2 className="text-8xl text-[#F79021] font-judson mb-12 z-10">
          Certificado
        </h2>
        {/* Limite de 40 caracteres */}
        <p className="text-[26px] text-white z-10 uppercase">
          a {certificate?.institution_name} certifica que:
        </p>
        {/* Limite de 40 caracteres */}
        <h3 className="text-6xl text-[#32E399] mt-3.5 mb-8 z-10">
          {certificate?.participant_name || auth?.fullname}
        </h3>
        {/* Limite de 500 caracteres */}
        <p className="font-extralight text-white text-[26px] -tracking-wider mb-4 z-10">
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
              <span className="font-bold">
                {formatDate(certificate?.event_start)}
              </span>
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
    </>
  );
};
