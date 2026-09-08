import type { Certificate } from "../types";

export const certificates: Certificate[] = [
  {
    id: 1,
    name: "Certificado de Conclusão",
    student: "João Silva",
    model: "Conclusão de Curso",
    issuedAt: "08/09/2026",
    status: "issued",
  },
  {
    id: 2,
    name: "Certificado de Participação",
    student: "Maria Santos",
    model: "Participação",
    issuedAt: "05/09/2026",
    status: "sent",
  },
];