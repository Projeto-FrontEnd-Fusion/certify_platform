export const formatDate = (dateValue?: string | Date | null): string => {
  if (!dateValue) return "";

  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("pt-BR");
};
