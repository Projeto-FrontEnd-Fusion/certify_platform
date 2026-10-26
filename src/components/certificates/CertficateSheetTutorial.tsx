import { FiInfo } from "react-icons/fi";


export function CertificateSheetTutorial() {
  return (
    <div className="p-6 bg-white border border-[#E2E8F0CC] rounded-md">
      <h2 className="text-[#262626] font-bold text-base mb-2">Como deve ser sua planilha</h2>
      <p className="text-[#737373] font-normal text-xs mb-2">Sua planilha deve conter as colunas <span className="text-[#0069A8] font-bold">Nome</span>, <span className="text-[#0069A8] font-bold">E-mail</span> e <span className="text-[#0069A8] font-bold">CPF</span>.</p>
      <p className="text-[#737373] font-normal text-xs mb-2">Veja ao lado um exemplo de como os dados devem estar organizados.</p>

      <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F5F5F5]">
              <th className="pb-3 font-semibold text-[#525252] text-xs">Nome</th>
              <th className="pb-3 font-semibold text-[#525252] text-xs">E-mail</th>
              <th className="pb-3 font-semibold text-[#525252] text-xs">CPF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#525252]">
            <tr className="border-b border-[#F5F5F5]">
              <td className="py-3 text-[#525252] text-xs">Maria Silva</td>
              <td className="py-3 text-[#525252] text-xs">maria.silva@email.com</td>
              <td className="py-3 text-[#525252] text-xs">123.456.789-09</td>
            </tr>
            <tr className="border-b border-[#F5F5F5]">
              <td className="py-3 text-[#525252] text-xs">João Souza</td>
              <td className="py-3 text-[#525252] text-xs">joao.souza@email.com</td>
              <td className="py-3 text-[#525252] text-xs">987.654.321-00</td>
            </tr>
            <tr>
              <td className="py-3 text-[#525252] text-xs">Ana Lima</td>
              <td className="py-3 text-[#525252] text-xs">ana.lima@email.com</td>
              <td className="py-3 text-[#525252] text-xs">321.654.987-23</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-[#F0F6FF] border border-[#F5F5F5] p-3.5 rounded-xl mt-2 flex items-center gap-2.5">
        <FiInfo className="text-[#0069A8] w-3.5 h-3.5" />
        <p className="text-[#525252] font-normal text-xs">A primeira linha da planilha deve conter os nomes das colunas.</p>
      </div>
    </div>
  )
}