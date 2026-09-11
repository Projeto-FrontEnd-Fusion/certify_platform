import type { Certificate } from "./types";
import { CertificateRow } from "./CertificateRow";
import { EmptyState } from "./EmptyState";

interface CertificateTableProps {
  certificates: Certificate[];
  onCreate?: () => void;
}

const columns = [
  {
    label: "Nome do certificado",
    className: "w-[25%]",
  },
  {
    label: "Aluno",
    className: "w-[18%]",
  },
  {
    label: "Modelo",
    className: "w-[18%]",
  },
  {
    label: "Data de emissão",
    className: "w-[18%]",
  },
  {
    label: "Status",
    className: "w-[12%]",
  },
  {
    label: "Ação",
    className: "w-[9%]",
  },
];

export function CertificateTable({
  certificates,
  onCreate,
}: CertificateTableProps) {
  const isEmpty = certificates.length === 0;

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-[#111111]/10">
            {columns.map((column) => (
              <th
                key={column.label}
                scope="col"
                className={`
                  ${column.className}
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-[#111111]
                `}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {!isEmpty && (
          <tbody>
            {certificates.map((certificate) => (
              <CertificateRow
                key={certificate.id}
                certificate={certificate}
              />
            ))}
          </tbody>
        )}
      </table>

      {isEmpty && <EmptyState onCreate={onCreate} />}
    </div>
  );
}