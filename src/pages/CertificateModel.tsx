import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CertificateSelectTemplate } from '@/components/certificates/CertificateSelectTemplate';
import { variantSchema } from '@/schemas/CertificateSchema';
import type { CertificateVariant } from '@/components/certificates/types';
import { createDraft } from '@/lib/certificate-draft';

export default function CertificateModelPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<CertificateVariant>('classico');
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Modelos de certificados</h1>
      <p className="mb-6">Escolha um modelo para iniciar a emissão.</p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {variantSchema.options.map(variant => (
          <CertificateSelectTemplate key={variant} variant={variant}
            selected={selected === variant} onSelect={setSelected} />
        ))}
      </div>
      <button type="button" className="mt-6 rounded-md bg-[#0069A8] px-5 py-3 text-white"
        onClick={() => navigate(`/empresa/certificados/criar/${createDraft(selected)}`)}>
        Usar modelo
      </button>
    </section>
  );
}
