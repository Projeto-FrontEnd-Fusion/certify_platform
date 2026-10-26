
import { useRef, useState } from "react";

import { FiUpload, FiUser } from "react-icons/fi";
import { FaRegFileAlt, FaRegTrashAlt } from "react-icons/fa";
import { GoDownload, GoUpload } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

import { useCertificateParticipants } from "@/hooks/Certificate/useCertificateParticipants";

import UploadCloud from "@/assets/upload-cloud.svg";

import { AddParticipantForm } from "../AddParticipantForm";
import { CertificateParticipantsTable } from "../CertificateParticipantsTable";
import { CertificateResume } from "../CertificateResume";
import { CertificateSheetTutorial } from "../CertficateSheetTutorial";

type ParticipantInputMode = "manual" | "upload";

type SpreadsheetParticipant = {
  nome: string;
  email: string;
  cpf: string;
};

const INPUT_MODE_OPTIONS = [
  { mode: "manual", label: "Manual", Icon: FiUser },
  { mode: "upload", label: "Upload de Arquivo", Icon: FiUpload },
] as const;

const INPUT_MODE_STYLE = {
  active:
    "bg-white text-[#0069A8] border border-[#E2E8F099] rounded-lg",
  inactive: "bg-transparent text-[#737373] border-none",
};

const normalizeHeader = (value: unknown) =>
  String(value ?? "")
    .trim()
    .replace(/^\uFEFF/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/**
 * Lê arquivos CSV com campos entre aspas.
 * Aceita vírgula ou ponto e vírgula como separador.
 */
const parseCsv = (content: string, delimiter: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let insideQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (char === '"') {
      if (insideQuotes && content[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      row.push(cell);
      cell = "";
    } else if (
      (char === "\n" || char === "\r") &&
      !insideQuotes
    ) {
      if (char === "\r" && content[i + 1] === "\n") {
        i++;
      }

      row.push(cell);

      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }

      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  // Adiciona a última linha, mesmo que o arquivo não termine com quebra de linha.
  row.push(cell);

  if (row.some((value) => value.trim() !== "")) {
    rows.push(row);
  }

  if (insideQuotes) {
    throw new Error(
      "O arquivo CSV contém um campo com aspas não fechadas."
    );
  }

  return rows;
};

export function CertificateStepTwo() {
  const [inputMode, setInputMode] =
    useState<ParticipantInputMode>("manual");

  const {
    participants: manualParticipants,
    selectedIds,
    allSelected,
    hasSelectedParticipants,
    hasParticipantWithCpf,
    addParticipant,
    removeParticipant,
    removeSelectedParticipants,
    toggleSelection,
    toggleAllSelection,
  } = useCertificateParticipants();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [spreadsheetFile, setSpreadsheetFile] =
    useState<File | null>(null);

  const [spreadsheetParticipants, setSpreadsheetParticipants] =
    useState<SpreadsheetParticipant[]>([]);

  const [spreadsheetError, setSpreadsheetError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleSpreadsheet = async (file?: File) => {
    setSpreadsheetError("");

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setSpreadsheetFile(null);
      setSpreadsheetParticipants([]);
      setSpreadsheetError(
        "Formato inválido. Selecione um arquivo CSV."
      );
      return;
    }

    try {
      const content = await file.text();

      if (!content.trim()) {
        throw new Error("O arquivo CSV está vazio.");
      }

      // Detecta os dois formatos mais comuns de CSV.
      const commaRows = parseCsv(content, ",");
      const semicolonRows = parseCsv(content, ";");

      const hasRequiredHeaders = (rows: string[][]) => {
        if (rows.length === 0) return false;

        const headers = rows[0].map(normalizeHeader);

        return ["nome", "email", "cpf"].every((header) =>
          headers.includes(header)
        );
      };

      const rows = hasRequiredHeaders(commaRows)
        ? commaRows
        : hasRequiredHeaders(semicolonRows)
          ? semicolonRows
          : null;

      if (!rows) {
        throw new Error(
          "A primeira linha precisa conter as colunas nome, email e cpf."
        );
      }

      if (rows.length < 2) {
        throw new Error(
          "O arquivo precisa conter os cabeçalhos e pelo menos um participante."
        );
      }

      const headers = rows[0].map(normalizeHeader);

      const nomeIndex = headers.indexOf("nome");
      const emailIndex = headers.indexOf("email");
      const cpfIndex = headers.indexOf("cpf");

      const parsedParticipants: SpreadsheetParticipant[] = rows
        .slice(1)
        .filter((row) =>
          [nomeIndex, emailIndex, cpfIndex].some(
            (index) => String(row[index] ?? "").trim() !== ""
          )
        )
        .map((row) => ({
          nome: String(row[nomeIndex] ?? "").trim(),
          email: String(row[emailIndex] ?? "").trim(),
          cpf: String(row[cpfIndex] ?? "").trim(),
        }));

      if (parsedParticipants.length === 0) {
        throw new Error(
          "Nenhum participante foi encontrado no arquivo."
        );
      }

      setSpreadsheetFile(file);
      setSpreadsheetParticipants(parsedParticipants);
    } catch (error) {
      setSpreadsheetFile(null);
      setSpreadsheetParticipants([]);

      setSpreadsheetError(
        error instanceof Error
          ? error.message
          : "Não foi possível ler o arquivo CSV."
      );
    }
  };

  const handleRemoveSpreadsheet = () => {
    setSpreadsheetFile(null);
    setSpreadsheetParticipants([]);
    setSpreadsheetError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = [
      "nome,email,cpf",
      "Maria Silva,maria@email.com,01234567890",
    ].join("\r\n");

    // BOM para facilitar a abertura de caracteres UTF-8 no Excel.
    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "modelo_participantes.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 flex gap-3">
      <div className="w-2/3">
        <div className="rounded-md border border-[#E2E8F0CC] bg-white p-6">
          <h2 className="text-base font-bold text-[#262626]">
            Adicionar participantes
          </h2>

          <p className="text-xs font-normal text-[#737373]">
            Adicione os alunos que receberão este certificado.
          </p>

          <div className="mt-5 flex h-11 w-full max-w-[448px] items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-1">
            {INPUT_MODE_OPTIONS.map(({ mode, label, Icon }) => (
              <button
                key={mode}
                type="button"
                aria-pressed={inputMode === mode}
                className={`flex h-full flex-1 cursor-pointer items-center justify-center gap-2 text-xs ${inputMode === mode
                    ? INPUT_MODE_STYLE.active
                    : INPUT_MODE_STYLE.inactive
                  }`}
                onClick={() => setInputMode(mode)}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>

          {inputMode === "manual" && (
            <AddParticipantForm
              onAddParticipant={addParticipant}
              hasParticipantWithCpf={hasParticipantWithCpf}
            />
          )}

          {inputMode === "upload" && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];

                  void handleSpreadsheet(file);

                  event.currentTarget.value = "";
                }}
              />

              <div
                role="button"
                tabIndex={0}
                aria-label="Selecionar ou arrastar um arquivo CSV"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragging(false);

                  void handleSpreadsheet(
                    event.dataTransfer.files[0]
                  );
                }}
                className={`mt-5 flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed py-12 transition-colors ${isDragging
                    ? "border-[#0069A8] bg-[#E0F2FE]"
                    : "border-[#0069A84D] bg-[#F0F9FFA6]"
                  }`}
              >
                <img
                  src={UploadCloud}
                  alt=""
                  aria-hidden="true"
                />

                <p className="text-base font-bold text-[#262626]">
                  Arraste e solte o arquivo CSV aqui
                </p>

                <p className="text-xs font-normal text-[#737373]">
                  ou{" "}
                  <span className="font-semibold text-[#0069A8]">
                    clique para selecionar
                  </span>{" "}
                  um arquivo
                </p>

                <p className="text-xs font-medium text-[#A1A1A1]">
                  Formato suportado: .CSV
                </p>
              </div>

              {spreadsheetError && (
                <p
                  role="alert"
                  className="mt-3 text-sm text-red-600"
                >
                  {spreadsheetError}
                </p>
              )}

              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="mx-auto mt-5 flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#0069A8]"
              >
                <GoDownload />
                Baixar modelo CSV
              </button>

              {spreadsheetFile && (
                <div className="mt-5 flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-[18px]">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-lg border border-[#00BBA7] bg-[#F0FDFA] p-[9px]">
                      <FaRegFileAlt className="h-4 w-4 text-[#00786F]" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-[#262626]">
                        {spreadsheetFile.name}
                      </p>

                      <p className="text-xs font-normal text-[#A1A1A1]">
                        {(spreadsheetFile.size / 1024).toFixed(1)} KB
                        {" · "}
                        {spreadsheetParticipants.length} participantes
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Remover arquivo CSV"
                    onClick={handleRemoveSpreadsheet}
                    className="ml-3 cursor-pointer"
                  >
                    <IoMdClose className="text-[#737373]" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mx-auto mt-4 flex cursor-pointer items-center gap-2 rounded-md bg-[#0069A8] px-3 py-2.5 text-xs font-semibold text-white"
              >
                <GoUpload />
                Importar arquivo CSV
              </button>
            </>
          )}
        </div>

        {inputMode === "manual" && (
          <div className="mt-3 rounded-md border border-[#E2E8F0CC] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#262626]">
                  Participantes adicionados
                </h2>

                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F1F5F9] text-sm font-medium text-[#525252]">
                  {manualParticipants.length}
                </div>
              </div>

              <button
                type="button"
                disabled={!hasSelectedParticipants}
                className="flex items-center gap-1.5 text-sm font-medium text-[#A1A1A1] enabled:cursor-pointer enabled:text-[#DC2626]"
                onClick={removeSelectedParticipants}
              >
                <FaRegTrashAlt />
                Remover selecionados
              </button>
            </div>

            <div className="mt-4">
              <CertificateParticipantsTable
                participants={manualParticipants}
                selectedIds={selectedIds}
                allSelected={allSelected}
                onToggleSelection={toggleSelection}
                onToggleAllSelection={toggleAllSelection}
                onRemoveParticipant={removeParticipant}
              />
            </div>
          </div>
          {(errors.participants?.message || errors.participants?.root?.message) && (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {errors.participants?.message || errors.participants?.root?.message}
            </p>
          )}
        </div>
      </div>

      <div className="w-1/3">
        <CertificateResume onNext={onNext} onBack={onBack} />
      </div>
    </div>
  )
}
