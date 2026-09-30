import { Navigate, useParams } from "react-router-dom";
import { CreateCertificateForm } from "@/components/certificates/CreateCertificateForm";
import { getDraft } from "@/lib/certificate-draft";

export function CertificationCreate() {
  const { id } = useParams<{ id: string }>();
  const draft = id ? getDraft(id) : null;

  if (!draft) return <Navigate to="/empresa/certificados" replace />;

  return (
    <div>
      <header className="mb-9">
        <h1 className="text-black font-bold text-2xl md:text-[30px] mb-1">Criar Certificado</h1>
        <p className="text-black/45 font-normal text-xs md:text-sm">
          Preencha os dados da certificação e personalize as informações.
        </p>
      </header>

      <CreateCertificateForm key={draft.id} draft={draft} />
    </div>
  );
}