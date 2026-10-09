import { useAccountNavigation } from "@/hooks/useAccountNavigation";

import { PrimaryButton } from "@/components/ButtonPrimary";
import { CertificateFilters } from "@/components/certificates/CertificateFilters";
import { CertificateTable } from "@/components/certificates/CertificateTable";
import { certificateServiceInstance } from '@/api/implements';
import { useAuthStoreData } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { certificateDate } from '@/lib/certificate-display';
import { listDrafts } from '@/lib/certificate-draft';
import { variantLabels } from '@/components/certificates/constants';
import type { Certificate, CertificateStatus } from '@/components/certificates/types';
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import type {
  CertificateFilters as CertificateFiltersType,
  RequestStatus,
} from "@/components/certificates/types";
import { SelectTemplateModal } from "@/components/certificates/SelectTemplateModal";

export const CertificateCompany = () => {
  const { name, initials, openProfile } = useAccountNavigation();
  const filterOptions = ['Todos', 'Rascunhos', 'Emitidos', 'Expirados', 'Cancelados'];
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {auth} = useAuthStoreData();
  const [filters, setFilters] = useState<CertificateFiltersType | null>(null);
  const query = useQuery({queryKey: ['issuer-certificates', auth?._id], enabled: !!auth?._id,
    queryFn: async () => {
      const items = [];
      let page = 1;
      let pages = 1;
      do {
        const result = await certificateServiceInstance.listByIssuer(auth!._id, page);
        items.push(...result.data.items);
        pages = result.data.total_pages;
        page += 1;
      } while (page <= pages);
      return items;
    }});
  const certificates: Certificate[] = (query.data || []).map(item => ({
    id: item.id, name: item.event_name, student: item.participant_name,
    model: item.design?.variant || '', issuedAt: certificateDate(item.issued_at),
    status: (item.status === 'inactive' ? 'inactive' : item.status === 'expired' || (item.valid_until && new Date(item.valid_until) < new Date()) ? 'expired' : item.notifications?.student?.status === 'sent' ? 'sent' : 'issued') as CertificateStatus,
    issuedTimestamp: item.issued_at ? new Date(item.issued_at).getTime() : 0,
  }));
  for (const draft of listDrafts()) certificates.push({id: `draft:${draft.id}`, name: draft.data.activityName || 'Rascunho',
    student: `${draft.data.participants?.length || 0} participantes`, model: draft.data.variant,
    issuedAt: certificateDate(draft.updatedAt), status: 'draft', issuedTimestamp: new Date(draft.updatedAt).getTime()});
  const status: RequestStatus = query.isPending ? 'loading' : query.isError ? 'error' : 'success';
  const isRetrying = query.isFetching;
  const [isCreateCertificateOpen, setIsCreateCertificateOpen] = useState<boolean>(false)

  function handleCreateCertificate() {

    setIsCreateCertificateOpen(true)
  }

  function handleApplyFilters(
    filters: CertificateFiltersType,
  ) {
    setFilters(filters);
  }

  function handleRetry() {void query.refetch();}

  const term = searchTerm.trim().toLowerCase();
  const tabStatus: Record<string, CertificateStatus[]> = {Todos: ['issued', 'sent', 'draft', 'expired', 'inactive'],
    Rascunhos: ['draft'], Emitidos: ['issued', 'sent'], Expirados: ['expired'], Cancelados: ['inactive']};
  const modelMap: Record<string, string> = {'no-border': 'sem-borda', classic: 'classico', modern: 'moderno', ornamental: 'ornamental'};
  const filteredCertificates = certificates.filter(item => {
    if (!tabStatus[activeFilter].includes(item.status)) return false;
    if (term && !`${item.name} ${item.student} ${item.id}`.toLowerCase().includes(term)) return false;
    if (filters?.status && filters.status !== 'all' && filters.status !== item.status) return false;
    if (filters?.student && !item.student.toLowerCase().includes(filters.student.toLowerCase())) return false;
    if (filters?.model && item.model !== modelMap[filters.model]) return false;
    if (filters?.startDate && (item.issuedTimestamp || 0) < new Date(`${filters.startDate}T00:00:00`).getTime()) return false;
    if (filters?.endDate && (item.issuedTimestamp || 0) > new Date(`${filters.endDate}T23:59:59`).getTime()) return false;
    return true;
  }).map(item => ({...item, model: variantLabels[item.model as keyof typeof variantLabels] || 'Não informado'}));

  const displayStatus: RequestStatus =
    status === "success" && certificates.length > 0 && filteredCertificates.length === 0
      ? "notFound"
      : status;

  return (
    <div>
      <header className="flex justify-between">
        <div>
          <h1 className="text-black font-bold text-2xl md:text-[30px] mb-1">Certificados</h1>
          <p className="text-black/45 font-normal text-xs md:text-sm">Visualize, gerencie e compartilhe todos os certificados emitidos.</p>
        </div>

        <div className="hidden md:flex items-center">
          <button disabled aria-label="Notificações indisponíveis" title="Notificações ainda não disponíveis" className="opacity-40">
            <CiBellOn className="text-black/45 w-5 h-5" />
          </button>

          <button type="button" onClick={openProfile} aria-label="Abrir meu perfil" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0069A833] text-[#0069A8] font-bold text-sm border border-[#0069A84D] ml-6 mr-3">
            {initials}
          </button>

          <div className="flex flex-col justify-center">
            <p className="font-semibold text-black text-sm">{name}</p>
            <span className="font-normal text-black/45 text-xs">Administrador</span>
          </div>
        </div>
      </header>

      <div className="my-3 md:hidden flex justify-end">
        <button
          onClick={handleCreateCertificate}
          className="h-[34px] w-[146px] flex justify-center items-center gap-2 bg-[#0069A8] rounded-md text-[#F9FAFB] text-xs font-semibold">
          <MdAdd />
          Novo Certificado
        </button>
      </div>

      <section className="md:mt-9">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center w-full">
            <div className="flex items-center gap-3 flex-1 md:flex-none h-[48px] md:h-[52px] bg-white px-3 py-3.5 md:w-[402px] rounded-lg border border-[#E5E7EB] text-black/65">
              <CiSearch />

              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar certificado, aluno ou ID..."
                className="w-full outline-none text-xs md:text-base"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 h-[48px] md:h-[52px] px-4 py-[18px] bg-white rounded-lg text-black/65 cursor-pointer">
              <CiFilter />
              Filtros
            </button>
          </div>

          <div className="hidden md:block h-12 w-[218px]">
            <PrimaryButton onClick={handleCreateCertificate}>
              <div className="flex items-center justify-center gap-3">
                <MdAdd size={20} />
                Novo Certificado
              </div>
            </PrimaryButton>
          </div>
        </div>

        <nav
          className="
                flex
                w-max
                items-center
                gap-1
                rounded-xl
                bg-[#0069A8]/10
                p-2
                mt-1.5
              "
        >
          {filterOptions.map((tab) => {
            const isActive = activeFilter === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`
          flex
          h-9
          min-w-0
          flex-1
          items-center
          justify-center
          whitespace-nowrap
          rounded-lg
          px-2
          text-xs
          font-normal
          transition-all
          duration-200
          cursor-pointer
          md:h-11
          md:px-5
          md:text-sm
          ${isActive
                    ? "bg-white text-[#0069A8] shadow-sm"
                    : "bg-transparent text-[#111111]/40 hover:bg-white/50"
                  }
        `}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </section>

      <section className="mt-3">
        <CertificateTable
          certificates={filteredCertificates}
          status={displayStatus}
          searchQuery={searchTerm}
          isRetrying={isRetrying}
          onRetry={handleRetry}
          onCreate={handleCreateCertificate}
        />
      </section>

      <CertificateFilters
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />

      {isCreateCertificateOpen && (
        <SelectTemplateModal onClose={() => setIsCreateCertificateOpen(false)} />
      )}
    </div>
  )
}
