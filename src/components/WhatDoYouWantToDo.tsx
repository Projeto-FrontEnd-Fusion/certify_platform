import { Link } from "react-router-dom";
import CertificadeImage from "@/assets/Certificate.svg";

export const WhatDoYouWantToDo = () => {
  return (
    <section className="h-full flex flex-col items-center  font-inter gap-6 py-32">
      <h2 className="text-xl font-semibold">O que você deseja fazer?</h2>
      <p className="text-center">
        Escolha uma das opções abaixo para continuar com a CertiFy.
      </p>

      <div className="flex gap-4 w-full justify-center">
        <Link
          to={"/requestCertificate"}
          className="text-center flex flex-col items-center bg-[#0000001A] text-xs font-bold gap-2 w-35 h-30 justify-center rounded-lg active:scale-90 duration-300 transition  hover:shadow-2xl"
        >
          <span className="max-w-28">Solicitar emissão de Certificado</span>
          <img src={CertificadeImage} alt="Imagem de um certificado" />
        </Link>
        <Link
          to={"/"}
          className="text-center flex flex-col items-center bg-[#0000001A] text-xs font-bold gap-2 w-35 h-30 justify-center rounded-lg active:scale-90 duration-300 transition  hover:shadow-2xl "
        >
          <span className="max-w-24">Emitir Certificado</span>

          <img src={CertificadeImage} alt="Imagem de um certificado" />
        </Link>
      </div>
    </section>
  );
};
