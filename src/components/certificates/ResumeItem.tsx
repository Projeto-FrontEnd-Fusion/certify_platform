import { CiFileOn } from "react-icons/ci";

type ResumeItemProps = {
  label: string;
  value: string;
};

export function ResumeItem({ label, value }: ResumeItemProps) {
  return (
    <div className="flex gap-3 items-center">
      <div className="p-1.5 rounded-full bg-[#F1F5F9]">
        <CiFileOn className="w-3.5 h-3.5" />
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-[#A1A1A1] font-normal text-xs">{label}</p>
        <p className="text-[#262626] font-medium text-xs">{value}</p>
      </div>
    </div>
  );
}