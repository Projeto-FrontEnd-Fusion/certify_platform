import { FiFileText } from "react-icons/fi";

export function CertificateGenerateInfo() {
  return (
    <section className="bg-white p-6">
      <p className="text-[#262626] font-bold text-sm mb-5">O que será gerado</p>

      <div className="flex items-center gap-3 mb-3">
        <div className="bg-[#E0F2FE] rounded-2xl w-max p-3.5">
          <FiFileText className="text-[#0066CC] w-7 h-7" />
        </div>

        <div className="flex flex-col">
          <p className="text-[#0066CC] font-extrabold text-[30px]">112</p>
          <p className="text-[#262626] font-medium text-xs">certificados serão gerados</p>
        </div>
      </div>

      <p className="text-[#404040] font-light text-base mb-3">Após a geração, você poderá baixar um relatório completo.</p>
      <p className="text-[#404040] font-light text-base">Os certificados serão emitidos apenas para os participantes válidos.</p>
    </section>
  )
}