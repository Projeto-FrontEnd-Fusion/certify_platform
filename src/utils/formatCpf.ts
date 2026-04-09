export function formatCPF(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  return numbers
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}