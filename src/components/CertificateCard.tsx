interface CertificateCardProps {
  institution: string;
  date: string;
  event: string;
}

export function CertificateCard({ institution, date, event }: CertificateCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-[162px] bg-[#D9D9D9]"></div>

      <p className="font-normal text-[#0069A8] text-lg">{event}</p>
      <p className="font-normal text-[#1E293B] text-lg">{institution}</p>
      <p className="font-normal text-[#1E293B]">{date}</p>
    </div>
  )
}