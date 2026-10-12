import type { Notification } from "../../types/notification";

export const notificationMocks: Notification[] = [
  {
    id: "1",
    type: "maintenance",
    severity: "critical",
    title: "Manutenção programada",
    description:
      "O sistema ficará indisponível hoje, das 22h às 23h, para uma manutenção programada.",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    href: "/avisos/1",
  },
  {
    id: "2",
    type: "instability",
    severity: "warning",
    title: "Instabilidade no sistema",
    description:
      "Identificamos lentidão no acesso aos relatórios. Nossa equipe está trabalhando na resolução.",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    read: false,
    href: "/avisos/2",
  },
  {
    id: "3",
    type: "student",
    severity: "info",
    title: "Novo aluno cadastrado",
    description:
      "Maria Oliveira foi cadastrada na plataforma e já está disponível na lista de alunos.",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
    href: "/alunos/3",
  },
  {
    id: "4",
    type: "certificate",
    severity: "info",
    title: "Certificado enviado",
    description:
      "O certificado de conclusão do curso foi enviado com sucesso.",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    read: true,
    href: "/certificados/4",
  },
  {
    id: "5",
    type: "model",
    severity: "info",
    title: "Modelo atualizado",
    description:
      "O modelo de certificado foi atualizado e está disponível para utilização.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    href: "/modelos/5",
  },
];