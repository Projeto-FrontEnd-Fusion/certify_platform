export function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  return numbers
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}