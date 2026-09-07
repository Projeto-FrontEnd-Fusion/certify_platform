/**
 * Aplica máscara de CNPJ (00.000.000/0000-00), aceitando
 * dígitos e letras maiúsculas (CNPJ alfanumérico, RFB 2.229/2024).
 */
export function formatCNPJ(value: string): string {
  const cleaned = value
    .replace(/[^a-zA-Z0-9]/g, "") // remove tudo que não for letra/número
    .toUpperCase()
    .slice(0, 14); // limita a 14 caracteres

  return cleaned
    .replace(/^([A-Z0-9]{2})([A-Z0-9])/, "$1.$2")
    .replace(/^([A-Z0-9]{2})\.([A-Z0-9]{3})([A-Z0-9])/, "$1.$2.$3")
    .replace(/^([A-Z0-9]{2})\.([A-Z0-9]{3})\.([A-Z0-9]{3})([A-Z0-9])/, "$1.$2.$3/$4")
    .replace(
      /^([A-Z0-9]{2})\.([A-Z0-9]{3})\.([A-Z0-9]{3})\/([A-Z0-9]{4})(\d)/,
      "$1.$2.$3/$4-$5"
    );
}