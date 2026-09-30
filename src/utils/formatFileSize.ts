export function formatFileSize(bytes: number): string {
  return `${Math.round(bytes / 1024)} KB`;
}