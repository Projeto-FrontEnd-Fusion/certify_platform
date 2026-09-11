// import { Certificate } from "@/components/Certificate";
// import { DownloadButton } from "@/components/DownloadButton";
import TechLogo from '@/assets/tech-logo.png';
import { PrimaryButton } from '@/components/ButtonPrimary';
import { SecondaryButton } from '@/components/ButtonSecondary';
import { FiLinkedin } from 'react-icons/fi';
import { GoDownload } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";


export const DownloadCertificate = () => {
  return (
    <section className="px-32 py-16 bg-[#F9FAFB] h-full flex flex-col gap-16">
      <h1 className="text-[#1E293B] font-bold text-2xl">Nome do curso</h1>

      <div className="bg-white border-8 border-primary-blue-base pt-20 pb-12 flex flex-col items-center">
        <h2 className="uppercase text-primary-blue-base font-bold text-[55px]">Certificado</h2>
        <span className="text-black text-[40px] font-normal mb-[42px]">de Conclusão de Curso</span>

        <p className="text-black font-normal text-2xl text-center">
          Certificamos que
          <br />
          <span className="text-[40px]">Maria Silva</span>
        </p>

        <div className="w-full max-w-[460px] h-[1px] bg-black mt-2 mb-[54px]"></div>
        <p className="text-black font-normal text-2xl">Concluiu com êxito o curso online</p>
        <span className="text-primary-blue-600 font-bold text-[27px]">Desenvolvimento Web Full Stack</span>
        <p className="text-black font-normal text-2xl mb-[54px]">com carga horária de 160 horas realizado dia 08 de março de 2026.</p>

        <div className='flex items-center gap-20'>
          <div className='flex flex-col items-center'>
            <img
              src={TechLogo}
              alt="Tech Logo"
              className="w-[148px] h-[46px] object-contain"
            />

            <p className='text-black font-normal text-base'>Instituto de Tecnologia e Desenvolvimento</p>
          </div>

          <div className='flex flex-col items-center w-[355px] max-w-full'>
            <div className="w-full h-px bg-black mb-1"></div>
            <span>Nome do responsável</span>
            <span>Descrição do cargo</span>
          </div>
        </div>

        <p className='mt-[30px] text-black text-base font-normal text-center'>
          Código de autenticidade: <span className='font-bold'>DJFEJ338-94320</span>
          <br />
          Esse certificado foi gerado pela Certify
        </p>

      </div>

      <div className='flex gap-[42px] px-[150px] w-full h-[52px]'>
        <PrimaryButton>
          <span className='flex justify-center items-center gap-3'>
            Fazer download
            <GoDownload className='w-5 h-5' />
          </span>
        </PrimaryButton>
        <SecondaryButton>
          <span className='flex justify-center items-center gap-3'>
            Enviar por e-mail
            <MdOutlineEmail className='w-5 h-5' />
          </span>
        </SecondaryButton>
        <SecondaryButton>
          <span className='flex justify-center items-center gap-3'>
            Compartilhar no LinkedIn
            <FiLinkedin className='w-5 h-5' />
          </span>
        </SecondaryButton>
      </div>
    </section>
  );
};
