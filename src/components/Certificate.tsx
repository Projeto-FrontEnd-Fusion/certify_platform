import type { RefObject } from "react";

export const Certificade = ({
  printRef,
}: {
  printRef?: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={printRef}
      className="p-4 border border-gray-300 bg-white text-[#1A1551]"
    >
      <h1 className="text-xl font-bold mb-2">Certificado DevInsights</h1>
      <p>Aqui vai a descrição do certificado</p>
    </div>
  );
};
