import { Header } from "@/components/header";
import { useNavigate } from 'react-router-dom';
import { CertificateCard } from "@/components/CertificateCard";
import { useListCertificateByUserId } from "@/hooks/Certificate/useListCertificate";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export function MyCertificates() {
  const navigate = useNavigate();



  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useListCertificateByUserId();
  
  const institution = data?.data?.items || [];

  



  const hasCertificates = institution.length > 0;

  const filteredCertificates = institution.filter(cert => (
    cert.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.institution_name.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const hasSearchResults = filteredCertificates.length > 0;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <div>
      <Header />
      {isLoading ? <p>Buscando certificados do usuário...</p> : isError ? <p>Erro ao carregar os certificados.</p> : <>
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
                  key={cert.id}
                  onClick={() => navigate(`/certificados/visualizar/${cert.id}`)}
                  institution={cert.institution_name}
                  date={formatDate(cert.event_date?.toString()??"")}
                  event={cert.event_name}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      </>}
    </div>
  );
}
