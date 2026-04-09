import GirlWithCertificateImg from '@/assets/GirlWithCertificate.webp'
import LogoCertify from '@/assets/Logo.svg'
import { SecondaryButton } from '@/components/ButtonSecondary';
import { StudentForm } from "@/components/StudentForm";
import { Link } from 'react-router-dom';


export const SignUpForm = () => {
  return (
    <div className="w-full bg-[#F2F2F9] flex flex-col-reverse lg:flex-row">
      <section className="flex-1 h-full w-full flex flex-col items-center">
        <div className="p-[30px]">
          <img src={LogoCertify} alt="Logo Certify" />

          <h1 className="text-primary-blue-600 font-bold text-[31px]">Criar conta</h1>
          <p className="text-primary-blue-700 font-normal text-[22px]">Selecione se você é empresa ou aluno</p>

          <div className="flex justify-between gap-4 pt-7 pb-5">
            <Link to='/signup'>
              <SecondaryButton>
                Aluno
              </SecondaryButton>
            </Link>

            <Link to='/signup-company'>
              <SecondaryButton>
                Empresa
              </SecondaryButton>
            </Link>
          </div>

          <StudentForm />

          <div className='flex justify-center gap-5 mt-5 text-[19px]'>
            <span>Já tem conta?</span>
            <Link to={'/login'} className='text-primary-blue-base font-bold hover:underline'>Faça o login aqui!</Link>
          </div>

        </div>
      </section>

      <section className="hidden lg:block lg:flex-1">
        <img src={GirlWithCertificateImg} alt="Garota com certificado" className="w-full h-full" />
      </section>
    </div>
  );
};
