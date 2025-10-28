import { useDownload } from "@/hooks/useDownload";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";
import type { IDownloadButton } from "@/types/DownloadButton";

export const DownloadButton = ({
  Reference,
  fileName,
  ...props
}: IDownloadButton) => {
  const { loadingMethod, handleDownload } = useDownload();
  return (
    <>
      {(["PDF", "PNG"] as const).map((methods) => (
        <button
          {...props}
          key={methods}
          type="button"
          disabled={loadingMethod === methods}
          onClick={() =>
            handleDownload({
              element: Reference.current,
              fileName: fileName,
              method: methods,
            })
          }
          className="flex items-center gap-2 py-2 bg-[#3925DD] w-26 justify-center text-white text-xl rounded cursor-pointer duration-300 transition-transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loadingMethod === methods ? (
            <AiOutlineLoading3Quarters size={20} className="animate-spin" />
          ) : (
            <>
              {methods} <LuDownload size={20} />
            </>
          )}
        </button>
      ))}
    </>
  );
};
