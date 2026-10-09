import { Certificate } from '@/components/Certificate';
import { DownloadButton } from '@/components/DownloadButton';
import { useCertificateStoreData } from '@/stores/useCertificateStore';
import { Link } from 'react-router-dom';
export const DownloadCertificate = () => {
  const {certificate} = useCertificateStoreData();
  if (!certificate) return <p>Selecione um certificado em <Link to="/meus-certificados">Meus certificados</Link>.</p>;
  return <section className="p-8 overflow-auto"><h1>{certificate.event_name}</h1><Certificate /><div className="flex gap-4"><DownloadButton /></div></section>;
};
