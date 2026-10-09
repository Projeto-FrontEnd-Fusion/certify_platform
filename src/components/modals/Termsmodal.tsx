import BaseModal from "./BaseModal";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal = ({
  isOpen,
  onClose,
}: TermsModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Termos de uso"
      subtitle="Leia os termos para uso da plataforma de verificação Certify"
    >
      <div className="space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h3 className="mb-2 text-base font-bold text-[#1A1551]">
            1. Uso da plataforma
          </h3>

          <p className="mb-3">
            A plataforma Certify deve ser utilizada de acordo
            com as finalidades para as quais foi disponibilizada.
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>
              Utilize a plataforma somente para finalidades
              legítimas.
            </li>

            <li>
              Não tente acessar funcionalidades ou informações
              sem autorização.
            </li>

            <li>
              Não realize ações que possam comprometer o
              funcionamento da plataforma.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-base font-bold text-[#1A1551]">
            2. Veracidade das informações
          </h3>

          <p className="mb-3">
            As informações fornecidas durante a utilização da
            plataforma devem ser verdadeiras e atualizadas.
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>
              Não forneça informações falsas ou inconsistentes.
            </li>

            <li>
              Não utilize informações de terceiros sem a devida
              autorização.
            </li>

            <li>
              Você é responsável pelas informações fornecidas
              por você.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-base font-bold text-[#1A1551]">
            3. Responsabilidades
          </h3>

          <p className="mb-3">
            O usuário é responsável pela utilização adequada dos
            recursos disponibilizados pela Certify.
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>
              Respeitar a legislação vigente.
            </li>

            <li>
              Utilizar a plataforma de forma responsável.
            </li>

            <li>
              Não realizar tentativas de fraude, invasão ou
              comprometimento da plataforma.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-base font-bold text-[#1A1551]">
            4. Compartilhamento do link
          </h3>

          <p className="mb-3">
            O link de verificação pode ser compartilhado para
            permitir a consulta das informações disponibilizadas.
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>
              Compartilhe o link somente para finalidades
              legítimas.
            </li>

            <li>
              Evite divulgar informações pessoais
              desnecessariamente.
            </li>

            <li>
              O acesso às informações está sujeito às regras da
              plataforma.
            </li>
          </ul>
        </section>
      </div>
    </BaseModal>
  );
};

export default TermsModal;
