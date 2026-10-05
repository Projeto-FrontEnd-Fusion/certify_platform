import type { CertificateFormData } from "@/schemas/CertificateSchema";

export type CertificateStep = 1 | 2 | 3;

export type CertificateDraft = {
  id: string;
  step: CertificateStep;
  updatedAt: string;
  data: Partial<CertificateFormData> & Pick<CertificateFormData, "variant">;
};

type DraftMap = Record<string, CertificateDraft>;

const STORAGE_KEY = "certificate-drafts";

function readAll(): DraftMap {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeAll(drafts: DraftMap): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return true;
  } catch {
    return false;
  }
}

export function getDraft(id: string): CertificateDraft | null {
  return readAll()[id] ?? null;
}

export function saveDraft(draft: Omit<CertificateDraft, "updatedAt">): boolean {
  const drafts = readAll();
  drafts[draft.id] = { ...draft, updatedAt: new Date().toISOString() };
  return writeAll(drafts);
}

export function createDraft(variant: CertificateFormData["variant"]): string {
  const id = crypto.randomUUID();
  saveDraft({ id, step: 1, data: { variant } });
  return id;
}

export function removeDraft(id: string): void {
  const drafts = readAll();
  delete drafts[id];
  writeAll(drafts);
}