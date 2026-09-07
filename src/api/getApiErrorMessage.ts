import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Não foi possível concluir a solicitação."
): string {
  if (!axios.isAxiosError(error)) return fallback;

  const message = error.response?.data?.message ?? error.response?.data?.detail;
  return typeof message === "string" && message.trim() ? message : fallback;
}
