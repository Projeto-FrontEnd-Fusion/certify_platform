import { CertificateCard } from "@/components/CertificateCard";
import { Header } from "@/components/header";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export function MyCertificates() {

  const [institution,] = useState<{ institution: string, event: string, date: string }[] | null>(
    [
      {
        institution: "Comunidade Frontend Fusion",
        event: "Imersão Dev Insight",
        date: "2025-11-08T06:21:49.955000",
      },
      {
        institution: "Escola Técnica CodeLab",
        event: "Semana do Desenvolvedor Web",
        date: "2024-03-15T10:45:22.123000",
      },
      {
        institution: "Instituto TechEdu",
        event: "Workshop de APIs com FastAPI",
        date: "2025-04-20T14:32:10.987000",
      },
      {
        institution: "Projeto Conecta Jovem",
        event: "Formação Frontend Responsivo",
        date: "2023-05-12T08:15:43.672000",
      },
      {
        institution: "Fundação Saber Digital",
        event: "Maratona de Programação Solidária",
        date: "2024-06-01T18:27:09.451000",
      },
      {
        institution: "Universidade Livre de Tecnologia",
        event: "Trilha Fullstack 2025",
        date: "2025-07-25T09:05:18.299000",
      },
      {
        institution: "ONG Jovens do Futuro",
        event: "Bootcamp React + TypeScript",
        date: "2023-08-19T12:54:30.834000",
      },
      {
        institution: "TechSocial Academy",
        event: "Oficina Git & GitHub na Prática",
        date: "2024-09-03T17:11:57.221000",
      },
      {
        institution: "Comunidade Fusion Devs",
        event: "Encontro de Mentores de Tecnologia",
        date: "2025-09-30T19:43:11.678000",
      },
      {
        institution: "Escola Digital Ação Cidadã",
        event: "Curso de Introdução à Programação",
        date: "2023-10-10T11:20:54.502000",
      },
      {
        institution: "Laboratório de Inovação Educacional",
        event: "Hackathon pela Educação",
        date: "2024-10-28T15:39:02.744000",
      }
    ]

  )

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertificates = institution?.filter(cert => (
    cert.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.institution.toLowerCase().includes(searchTerm.toLowerCase())
  )) ?? null;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <div>
      <Header />

      <main className="bg-[#F2F2F9] min-h-[calc(100vh-112px)] py-[65px] px-[96px]">
        <div className="w-full max-w-[842px] h-[60px] bg-[#D8D8DAC2] flex items-center gap-[27px] rounded-[20px] px-3 py-1.5 mx-auto">
          <IoIosSearch className="w-12 h-12" color="#66666E" />

          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-full bg-transparent outline-none border-none placeholder:font-bold text-[27px]"
          />
        </div>

        {!filteredCertificates && (
          <section className="mt-[157px] text-center max-w-[1200px] mx-auto">
            <h2 className="text-primary-blue-base font-bold text-[39px]">Você não possui certificados</h2>
            <p className="text-primary-blue-700 font-normal text-[31px]">Verifique sua caixa de entrada e spam.
              Se não tiver recebido e-mail da Ceritify entre em contato com a instituição e confirme seu e-mail cadastrado.</p>
          </section>
        )}

        {filteredCertificates && (
          <section className="mt-[72px]">
            <h2 className="text-primary-blue-600 font-bold text-[35px] mb-[55px]">Meus Certificados</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[32px]">
              {filteredCertificates.map((cert) => (
                <CertificateCard
                  key={cert.event}
                  institution={cert.institution}
                  date={formatDate(cert.date)}
                  event={cert.event}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}