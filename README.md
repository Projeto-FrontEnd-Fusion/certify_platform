# Certify Platform — Frontend

Plataforma web para emissão, visualização e download de certificados digitais da comunidade **Frontend Fusion**.

Construída com React 19, TypeScript, Vite e Tailwind CSS.

## Tecnologias

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Framework | React | 19.1 |
| Linguagem | TypeScript | 5.9 |
| Bundler | Vite | 7.1 |
| Estilização | Tailwind CSS | 4.1 |
| Animações | Framer Motion | 12.x |
| Formulários | React Hook Form + Zod | 7.x / 4.x |
| Estado global | Zustand | 5.x |
| Data fetching | TanStack React Query | 5.x |
| HTTP Client | Axios | 1.13 |
| Roteamento | React Router DOM | 7.9 |
| PDF | html2canvas-pro + jsPDF | 1.5 / 3.0 |
| Notificações | React Toastify | 11.x |
| Ícones | React Icons | 5.5 |
| Linting | ESLint | 9.x |
| Deploy | Vercel | — |

## Arquitetura

```
src/
├── api/                  # Camada de comunicação com o backend
│   ├── Auth/             # AuthHTTPclient, AuthService, AuthRepository
│   ├── Certificate/      # CertificateHTTPclient, CertificateService
│   ├── @types.ts         # Tipos de resposta da API
│   └── implements.ts     # Instâncias dos services (Axios + API_URL)
├── assets/               # Imagens, SVGs e ícones
├── components/           # Componentes reutilizáveis
│   ├── Certificate.tsx   # Renderização visual do certificado (SVG)
│   ├── DownloadButton.tsx
│   ├── DummyCertificate.tsx
│   ├── AcessKey.tsx      # Input da chave de acesso
│   ├── header.tsx / footer.tsx
│   ├── ProtectedUserRouters.tsx   # Guard de autenticação
│   └── ProtectedCertificate.tsx   # Guard de certificado
├── config/               # Configurações estáticas
│   ├── Menu.ts           # Itens do menu lateral
│   ├── Variants.ts       # Variantes de animação (Framer Motion)
│   └── ErrorsMessages.ts
├── hooks/                # Custom hooks
│   ├── Auth/             # useLoginAuth, useAuthSignUp
│   ├── Certificate/      # useCreateCertificate, useCheckAvailable
│   ├── useDownload.ts    # Lógica de download do PDF
│   └── useForm.ts        # Validação com React Hook Form + Zod
├── layouts/              # Layouts de página
│   ├── AuthLayout.tsx          # Layout com header/footer
│   ├── AuthProtectedLayout.tsx # Layout protegido (requer login)
│   └── CertificateLayout.tsx
├── pages/                # Páginas da aplicação
│   ├── Login.tsx
│   ├── SignUp.tsx
│   ├── MyCertificates.tsx
│   ├── DownloadCertificate.tsx
│   ├── ContactPage.tsx
│   ├── PrivacyPolicy.tsx
│   ├── Notfound.tsx
│   └── Loading.tsx
├── schemas/              # Validação Zod
│   ├── Login.ts
│   ├── SignUp.ts
│   └── Certificate.ts
├── services/             # Serviços auxiliares
│   └── DownloadService.ts
├── stores/               # Estado global (Zustand)
│   ├── useAuthStore.ts
│   └── useCertificateStore.ts
├── types/                # Tipos TypeScript
├── utils/                # Utilitários
│   ├── validators/       # Validação de CPF
│   ├── FormatDate.ts
│   ├── formatCpf.ts
│   ├── formatPhone.ts
│   ├── Download.ts
│   ├── AcessKey.ts
│   └── Scroll.ts
├── App.tsx               # Rotas da aplicação
├── App.css               # Estilos globais (fontes)
├── index.css             # Import do Tailwind
└── main.tsx              # Entry point (React + Router + QueryClient)
```

## Rotas

| Rota | Página | Autenticação |
|------|--------|:------------:|
| `/login` | Login | ❌ |
| `/signup` | Cadastro | ❌ |
| `/meus-certificados` | Lista de certificados | ✅ |
| `/download-certificado/:eventname` | Visualizar e baixar certificado | ✅ |
| `/pagina-de-contato` | Contato | ✅ |
| `/politica-de-privacidade` | Política de privacidade | ✅ |
| `/meus-dados` | Meus dados | 🚧 Não implementado |
| `/validar-certificados` | Validação de certificados | 🚧 Não implementado |

## Instalação

### Pré-requisitos

- Node.js 18+
- npm ou pnpm

### Setup

1. Clone o repositório
```bash
git clone <repository-url>
cd certify_platform
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Variável necessária:
```
VITE_API_URL=http://localhost:8000/api/v1
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (TypeScript + Vite) |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa ESLint |

## Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_URL` | URL base da API backend | `http://localhost:8000/api/v1` |

## Funcionalidades

- **Autenticação** — Login e cadastro com validação de formulários (Zod)
- **Rotas protegidas** — Redirecionamento automático para login se não autenticado
- **Listagem de certificados** — Tabela responsiva com dados do usuário
- **Geração de certificado visual** — Renderização em SVG com dados dinâmicos
- **Download em PDF** — Conversão do certificado para PDF (html2canvas + jsPDF)
- **Animações** — Transições suaves com Framer Motion
- **Notificações** — Feedback visual com React Toastify
- **Lazy loading** — Páginas carregadas sob demanda (React.lazy + Suspense)
- **Code splitting** — Chunks otimizados (vendor, animation, forms, pdf, state)

## Build de Produção

O build remove automaticamente `console.log` e `debugger` em produção.

Os chunks são divididos em:
- `vendor` — React, React DOM
- `animation` — Framer Motion
- `forms` — React Hook Form, Zod
- `pdf` — jsPDF
- `html2canvas` — html2canvas-pro
- `state` — React Query, Zustand

## Contribuição

Consulte o [CONTRIBUTING.md](../API_CERTIFY/CONTRIBUTING.md) do projeto para diretrizes de contribuição.

---

**Desenvolvido por** Comunidade Frontend Fusion
