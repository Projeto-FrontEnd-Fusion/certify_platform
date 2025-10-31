import type { ComponentProps } from "react";

export interface IDownloadButton extends ComponentProps<"button"> {
  fileName: string;
}