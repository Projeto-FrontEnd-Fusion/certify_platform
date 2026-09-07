import GirlWithCertificateImg from '@/assets/GirlWithCertificate.webp'
import SignUpCompanyImg from '@/assets/SignUpCompanyImg.jpg'
import LogoCertify from '@/assets/Logo.svg'
import { CompanyForm } from '@/components/CompanyForm';
import { StudentForm } from "@/components/StudentForm";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuShieldAlert } from "react-icons/lu";
import { ToggleButton } from '@/components/ToggleButton';

export const SignUpForm = () => {
  const [isStudent, setIsStudent] = useState(true);

  return (
    <div className="w-full bg-[#F9FAFB] flex flex-col-reverse lg:flex-row">
      <section className='flex-1 mt-6 mx-12'>
        <div className='w-full flex justify-end mb-12'>
          <Link
            to="/login"
            className='text-sm font-medium text-[#667085]'
          >
            Já tem conta? <span className="text-[#0069A8] font-semibold">Login</span>
          </Link>
        </div>

        <h1 className='text-3xl font-extrabold text-[#101828]'>
          Criar conta
        </h1>

        <div className='my-6 flex border border-[#E5E7EB] rounded-xl p-1.5 shadow-sm'>
          <ToggleButton isActive={isStudent} onClick={() => setIsStudent(true)}>Aluno</ToggleButton>
          <ToggleButton isActive={!isStudent} onClick={() => setIsStudent(false)}>Empresa</ToggleButton>
        </div>

        <div>
          {isStudent ? <StudentForm /> : <CompanyForm />}
        </div>

        <div className="flex items-start gap-5 p-8">
          <LuShieldAlert
            color='#0069A8'
            className="w-6 h-6 shrink-0"
          />

          <div className="flex flex-col gap-1">
            <p className="text-[#101828] text-base font-bold">
              Precisa de ajuda?
            </p>

            <p className="text-[#4B5563] text-base font-medium">
              Fale com nosso suporte:{" "}
              <span className="text-[#0069A8]">
                suporte@certify.com.br
              </span>
            </p>
          </div>
        </div>


      </section>

      {/* Div da imagem */}
      <section className="hidden lg:block lg:flex-1 relative">
        <img
          src={isStudent ? GirlWithCertificateImg : SignUpCompanyImg}
          alt="Garota com certificado ou empresa"
          className="w-full h-full object-cover"
        />

        <img
          src={LogoCertify}
          alt="Certify"
          className="absolute top-5 right-8 w-32 h-auto"
        />
      </section>
    </div>

  );
};
