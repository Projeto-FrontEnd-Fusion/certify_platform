// utils/validators/isValidCNPJ.ts

/**
 * Valida CNPJ numérico ou alfanumérico (regras vigentes a partir de
 * julho/2026, Instrução Normativa RFB nº 2.229/2024).
 *
 * Formato: 12 caracteres alfanuméricos (0-9, A-Z) + 2 dígitos verificadores.
 * CNPJs antigos (100% numéricos) continuam válidos por retrocompatibilidade.
 *
 * @param value CNPJ com ou sem máscara, já normalizado para 14 caracteres
 */
export function isValidCNPJ(value: string): boolean {
  const cnpj = value.toUpperCase();

  // Precisa ter exatamente 14 caracteres: 12 alfanuméricos + 2 dígitos
  if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj)) {
    return false;
  }

  // Rejeita sequências uniformes (ex: "00000000000000", "AAAAAAAAAAAAAA")
  if (new Set(cnpj).size === 1) {
    return false;
  }

  const charValue = (char: string): number => char.charCodeAt(0) - 48;

  const calculateDigit = (base: string, weights: number[]): number => {
    const sum = base
      .split("")
      .reduce((acc, char, index) => acc + charValue(char) * weights[index], 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const weightsFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weightsSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstDigit = calculateDigit(cnpj.slice(0, 12), weightsFirstDigit);
  const secondDigit = calculateDigit(
    cnpj.slice(0, 12) + firstDigit,
    weightsSecondDigit
  );

  return cnpj.slice(-2) === `${firstDigit}${secondDigit}`;
}