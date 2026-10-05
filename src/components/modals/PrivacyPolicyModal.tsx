import BaseModal from "./Basemodal";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PrivacyItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const PrivacyItem = ({
  icon,
  title,
  children,
}: PrivacyItemProps) => {
  return (
    <section className="flex gap-4 border-b border-[#E5E7EB] py-5 first:pt-0 last:border-b-0 last:pb-0">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F8FC] text-[#0069A8]"
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="mb-1 text-base font-bold text-[#1A1551]">
          {title}
        </h3>

        <div className="text-sm leading-relaxed text-gray-600">
          {children}
        </div>
      </div>
    </section>
  );
};

const PrivacyPolicyModal = ({
  isOpen,
  onClose,
}: PrivacyPolicyModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Política de privacidade"
      subtitle="Saiba como tratamos os dados exibidos nesta página"
    >
      <div>
        <PrivacyItem
          title="Dados coletados"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
              />
              <circle
                cx="9"
                cy="7"
                r="4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              />
            </svg>
          }
        >
          <p>
            Coletamos e exibimos apenas os dados necessários
            para permitir a identificação e a verificação das
            informações apresentadas na plataforma.
          </p>
        </PrivacyItem>

        <PrivacyItem
          title="Finalidade do tratamento"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
              />
            </svg>
          }
        >
          <p>
            Os dados são tratados para possibilitar a prestação
            dos serviços de verificação, disponibilizar as
            informações solicitadas e contribuir para a
            segurança da plataforma.
          </p>
        </PrivacyItem>

        <PrivacyItem
          title="Compartilhamento"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 8a3 3 0 10-2.83-4A3 3 0 0012 7a3 3 0 002.83 3A3 3 0 0018 8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 16a3 3 0 10-2.83-4A3 3 0 006 16z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 22a3 3 0 10-2.83-4A3 3 0 0018 22z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.6 14.5l6.8 3.5M15.4 6.5L8.6 13.5"
              />
            </svg>
          }
        >
          <p>
            Os dados poderão ser compartilhados quando
            necessário para as finalidades informadas, sempre
            observando a legislação aplicável e os princípios de
            proteção de dados.
          </p>
        </PrivacyItem>

        <PrivacyItem
          title="Direitos do titular"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              />
            </svg>
          }
        >
          <p>
            O titular possui os direitos previstos na Lei Geral
            de Proteção de Dados Pessoais — LGPD (Lei nº
            13.709/2018), incluindo os direitos aplicáveis ao
            acesso, correção e tratamento de seus dados pessoais.
          </p>
        </PrivacyItem>
      </div>
    </BaseModal>
  );
};

export default PrivacyPolicyModal;
