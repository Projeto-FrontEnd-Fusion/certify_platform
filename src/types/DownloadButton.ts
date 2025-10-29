import type { ComponentProps, RefObject } from "react";

export interface IDownloadButton extends ComponentProps<"button"> {
  Reference: RefObject<HTMLDivElement | null>;
  fileName: string;
}