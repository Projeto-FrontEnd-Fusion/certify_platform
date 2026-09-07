import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedalCertificate from "../assets/MedalCertificate.svg";
import Logo from "@/assets/Logo.svg";

interface CertificateModel {
  id: string;
  name: string;
  image: string;
}

const certificateModels: CertificateModel[] = [
  {
    id: "modern",
    name: "Certificado Moderno",
    image: MedalCertificate,
  },
  {
    id: "classic",
    name: "Certificado Clássico",
    image: MedalCertificate,
  },
  {
    id: "borderless",
    name: "Certificado Sem Borda",
    image: MedalCertificate,
  },
  {
    id: "ornamental",
    name: "Certificado Ornamental",
    image: MedalCertificate,
  },
];

interface CertificateModelCardProps {
  model: CertificateModel;
  selected: boolean;
  onSelect: (id: string) => void;
}

const CertificateModelCard = ({
  model,
  selected,
  onSelect,
}: CertificateModelCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(model.id)}
      aria-pressed={selected}
      aria-label={`Selecionar ${model.name}`}
      className={`group relative w-full overflow-hidden rounded-2xl border-2 bg-white text-left outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#0069A8]/30 ${
        selected
          ? "border-[#0069A8] shadow-lg shadow-[#0069A8]/10"
          : "border-[#D1D5DB] hover:border-[#0069A8]/50 hover:shadow-md"
      }`}
    >
      {selected && (
        <div
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#0069A8] text-white shadow-md"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12l4 4L19 6"
            />
          </svg>
        </div>
      )}

      <div className="border-b border-[#D1D5DB] px-4 py-4 sm:px-5">
        <h3 className="pr-10 text-base font-bold leading-snug text-[#1A1551] sm:text-lg">
          {model.name}
        </h3>
      </div>

      <div
        className={`w-full p-3 sm:p-4 md:p-5 ${
          selected ? "bg-[#F0F8FC]" : "bg-[#F4F5F9]"
        }`}
      >
        <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl bg-white">
          <img
            src={model.image}
            alt={`Pré-visualização do ${model.name}`}
            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
          />
        </div>
      </div>

      <div
        className={`border-t px-4 py-3 ${
          selected
            ? "border-[#0069A8]/20 bg-[#F0F8FC]"
            : "border-[#D1D5DB] bg-white"
        }`}
      >
        <span
          className={`text-sm font-semibold ${
            selected ? "text-[#0069A8]" : "text-gray-500"
          }`}
        >
          {selected ? "Modelo selecionado" : "Selecionar modelo"}
        </span>
      </div>
    </button>
  );
};

const CertificateModelPage = () => {
  const navigate = useNavigate();

  const [selectedModel, setSelectedModel] =
    useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleContinue = () => {
    if (!selectedModel) {
      return;
    }

    navigate("/proxima-etapa", {
      state: {
        certificateModel: selectedModel,
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const selectedModelData = certificateModels.find(
    (model) => model.id === selectedModel
  );

  return (
    <section className="min-h-screen w-full bg-white font-inter text-[#1A1551]">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[250px] bg-[#1A1551] lg:flex lg:flex-col">
        <div className="flex h-20 shrink-0 items-center justify-center border-b border-white/10 px-4">
          <div className="flex w-full items-center justify-between gap-4">
            <img
              src={Logo}
              alt="Certify Logo"
              className="h-11 w-auto max-w-[145px] object-contain"
            />

            <button
              type="button"
              onClick={handleBack}
              aria-label="Voltar"
              title="Voltar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6l6 6-6 6"
                />
              </svg>
            </button>
          </div>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-4 py-6"
          aria-label="Menu principal"
        >
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-white/40">
            Menu
          </p>

          <div className="space-y-2">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.5L12 3l9 7.5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.5 9.5V21h13V9.5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 21v-6h6v6"
                />
              </svg>

              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={handleOpenModal}
              className="flex w-full items-center gap-3 rounded-xl bg-[#0069A8] px-4 py-3 text-sm font-bold text-white shadow-sm"
              aria-current="page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 4h12v16H6z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8h6M9 12h6M9 16h4"
                />
              </svg>

              <span>Certificados</span>
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 19h16"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 17V9l6-5 6 5v8"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-4h6v4"
                />
              </svg>

              <span>Modelo</span>
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 19V5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 19h16"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 15l3-4 3 2 5-6"
                />
              </svg>

              <span>Relatórios</span>
            </button>
          </div>
        </nav>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0069A8] text-sm font-bold text-white">
              AB
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">
                Empresa teste
              </p>

              <p className="truncate text-xs text-white/50">
                Conta empresarial
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                aria-label="Configurações da empresa"
                title="Configurações"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0069A8]/50"
              >
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
                    r="3"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V20h-2.54v-.1a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 008.1 15a1.7 1.7 0 00-1.56-1.03H6v-2.54h.1A1.7 1.7 0 007.66 10a1.7 1.7 0 00-.34-1.88l-.06-.06 1.8-1.8.06.06A1.7 1.7 0 0011 6a1.7 1.7 0 001.03-1.56V4h2.54v.1A1.7 1.7 0 0015.6 5.66a1.7 1.7 0 001.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0018.94 9c0 .7.42 1.33 1.03 1.56H20v2.54h-.1A1.7 1.7 0 0019.4 15z"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Sair"
                title="Sair"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/50"
              >
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
                    d="M10 17l5-5-5-5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H3"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 19V5a2 2 0 00-2-2h-6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-h-screen w-full lg:ml-[250px]">
        <header className="fixed left-0 right-0 top-0 z-20 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:left-[250px] lg:px-10">
          <div className="flex min-w-0 items-center gap-4 lg:hidden">
            <img
              src={Logo}
              alt="Certify Logo"
              className="h-10 w-auto max-w-[135px] object-contain sm:h-11 sm:max-w-[150px]"
            />

            <button
              type="button"
              onClick={handleBack}
              aria-label="Voltar"
              title="Voltar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#1A1551] transition-colors hover:bg-[#F4F5F9] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6l6 6-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="hidden min-w-0 lg:block">
            <p className="text-sm font-medium text-gray-500">
              Área da empresa
            </p>

            <h1 className="text-lg font-bold text-[#1A1551]">
              Certificados
            </h1>
          </div>

          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0069A8] text-xs font-bold text-white sm:h-12 sm:w-12 sm:text-sm"
            aria-label="Perfil da empresa AB"
            title="Perfil da empresa"
          >
            AB
          </div>
        </header>

        <main className="min-h-screen w-full bg-white px-4 pb-10 pt-28 sm:px-6 md:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="text-2xl font-bold text-[#1A1551] sm:text-3xl">
              Certificados
            </h2>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1551]/60 p-2 backdrop-blur-sm sm:p-4 md:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-model-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="flex max-h-[96vh] w-full max-w-[1100px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[94vh] sm:rounded-2xl">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#D1D5DB] bg-white px-4 py-4 sm:px-6 sm:py-5 md:px-7">
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#0069A8] sm:text-xs">
                  Certificados
                </p>

                <h2
                  id="certificate-model-title"
                  className="text-lg font-bold leading-tight text-[#1A1551] sm:text-xl md:text-2xl"
                >
                  Escolha o modelo do certificado
                </h2>

                <p className="mt-1 hidden text-sm text-gray-500 sm:block">
                  Selecione o layout que será utilizado na emissão do certificado.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Fechar seleção de modelo"
                title="Fechar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 outline-none transition-colors hover:bg-[#F4F5F9] hover:text-[#1A1551] focus-visible:ring-2 focus-visible:ring-[#0069A8]/30 sm:h-10 sm:w-10"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#F4F5F9] px-3 py-4 sm:px-5 sm:py-5 md:px-7 md:py-6">
              <div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
                role="list"
                aria-label="Modelos de certificado disponíveis"
              >
                {certificateModels.map((model) => (
                  <div
                    key={model.id}
                    role="listitem"
                    className="min-w-0"
                  >
                    <CertificateModelCard
                      model={model}
                      selected={selectedModel === model.id}
                      onSelect={handleSelectModel}
                    />
                  </div>
                ))}
              </div>

              {!selectedModel && (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-[#D1D5DB] bg-white px-3 py-3 text-center text-xs font-medium text-gray-600 sm:mt-5 sm:px-4 sm:text-sm"
                >
                  A seleção de um modelo é obrigatória para continuar.
                </div>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-3 border-t border-[#D1D5DB] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-7">
              <div className="min-w-0">
                {selectedModelData ? (
                  <p className="truncate text-xs text-gray-500 sm:text-sm">
                    Modelo selecionado:{" "}
                    <span className="font-bold text-[#1A1551]">
                      {selectedModelData.name}
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Nenhum modelo selecionado
                  </p>
                )}
              </div>

              <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full rounded-xl border border-[#0069A8] px-5 py-3 text-sm font-bold text-[#0069A8] transition-colors hover:bg-[#0069A8]/5 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 sm:w-auto sm:px-6"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selectedModel}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0069A8] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#005582] active:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 disabled:cursor-not-allowed disabled:bg-[#0069A8]/50 sm:w-auto sm:min-w-[180px] sm:px-7"
                >
                  Continuar

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M13 6l6 6-6 6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificateModelPage;
