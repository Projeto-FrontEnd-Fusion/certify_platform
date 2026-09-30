import type { CertificateVariant } from "./types";

export const VARIANT_LABELS: Record<CertificateVariant, string> = {
  classico: 'Clássico',
  moderno: 'Moderno',
  ornamental: 'Ornamental',
  'sem-borda': 'Sem Borda',
}

export const variantLabels = {
  classico: "Clássico",
  moderno: "Moderno",
  ornamental: "Ornamental",
  "sem-borda": "Sem borda",
};

export const MAX_IMAGE_SIZE = 200 * 1024;

export const activityOptions = ["Curso", "Workshop", "Palestra", "Treinamento interno", "Evento online"];

export const descriptionOptions = [
  "Conclusão de curso",
  "Participação de evento",
  "Capacitação interna",
  "Certificado de presença",
  "Certificação profissional",
];

export const modalityOptions = ["Presencial", "Online", "Híbrido"];

export const validityOptions = ["Sem validade", "30 dias", "90 dias", "6 meses", "1 ano", "2 anos"];