import type { CertificateInDb } from '@/api/@types';

export type PublicCertificate = Pick<CertificateInDb, 'participant_name' | 'event_name' | 'workload'> &
  Partial<Pick<CertificateInDb, 'access_key' | 'institution_name' | 'description' | 'issued_at' | 'event_start' | 'event_end' | 'valid_until' | 'design'>>;

export function certificateDate(value?: string | Date | null): string {
  if (!value) return 'Não informado';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Não informado' : date.toLocaleDateString('pt-BR');
}

export async function downloadCertificate(certificate: PublicCertificate) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const text = (value: string, y: number, size: number) => {
    pdf.setFontSize(size);
    pdf.text(pdf.splitTextToSize(value, 255), 148.5, y, { align: 'center' });
  };
  pdf.setDrawColor(0, 105, 168);
  if (certificate.design?.variant !== 'sem-borda') pdf.rect(10, 10, 277, 190);
  if (certificate.design?.variant === 'ornamental') pdf.rect(13, 13, 271, 184);
  const logo = certificate.design?.logo?.dataUrl;
  if (logo) pdf.addImage(logo, 133, 16, 30, 15);
  text(certificate.institution_name || '', 30, 18);
  text(certificate.description || 'Certificado', 52, 22);
  text(certificate.participant_name, 80, 24);
  text(certificate.event_name, 107, 20);
  text(`Carga horária: ${certificate.workload} horas`, 135, 12);
  text(`Emissão: ${certificateDate(certificate.issued_at)}`, 148, 12);
  text(`Código de autenticidade: ${certificate.access_key || ''}`, 168, 10);
  const signature = certificate.design?.signature?.dataUrl;
  if (signature) pdf.addImage(signature, 35, 160, 35, 15);
  const url = `${window.location.origin}/validar-certificado/${encodeURIComponent(certificate.access_key || '')}`;
  pdf.textWithLink('Validar certificado', 125, 184, { url });
  pdf.save(`certificado-${certificate.access_key || 'certify'}.pdf`);
}
