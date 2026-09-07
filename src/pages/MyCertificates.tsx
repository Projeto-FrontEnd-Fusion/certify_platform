import { CertificateCard } from "@/components/CertificateCard";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export function MyCertificates() {

  const [institution,] = useState<{ institution: string, event: string, date: string }[]>(
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

  const hasCertificates = institution.length > 0;

  const filteredCertificates = institution.filter(cert => (
    cert.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.institution.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const hasSearchResults = filteredCertificates.length > 0;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <div>
      <main className="bg-[#F3F4F6] min-h-[calc(100vh-112px)] py-[65px] px-12 md:px-[96px]">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[842px] flex items-center gap-4 p-5 font-normal text-[#262626] rounded-[8px] outline-none h-[52px] border border-[#99A1AF] bg-transparent focus:border-[#0069A8] placeholder:text-[#262626]">
            <input
              className="w-full outline-none text-base"
              placeholder="Busque seus certificados"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex justify-center">
              <IoIosSearch />
            </div>
          </div>
        </div>

        <h2 className="text-[#1E293B] font-bold text-2xl mt-8 mb-20">Meus Certificados</h2>

        {!hasCertificates && (
          <section className="mt-16 text-center max-w-[1200px] mx-auto">
            <h2 className="text-[#0069A8] font-bold text-xl">Você não possui certificados</h2>
            <p className="text-[#1E293B] font-normal text-lg mt-2">
              Verifique sua caixa de entrada e spam. <br />
              Se não tiver recebido e-mail da Ceritify entre em contato com a instituição e confirme seu e-mail cadastrado.
            </p>
          </section>
        )}

        {hasCertificates && !hasSearchResults && (
          <section className="mt-[157px] text-center max-w-[1200px] mx-auto">
            <h2 className="text-[#0069A8] font-bold text-xl">Nenhum certificado encontrado</h2>
            <p className="text-[#1E293B] font-normal text-lg mt-2">
              Não encontramos certificados para "{searchTerm}". Tente buscar por outro termo.
            </p>
          </section>
        )}

        {hasCertificates && hasSearchResults && (
          <section className="mt-[32px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
  );
}