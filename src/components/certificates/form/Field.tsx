import type { ReactNode } from "react";

type FieldProps = {
  label?: string;
  error?: string;
  children: ReactNode;
};

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold">{label}</label>}
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}