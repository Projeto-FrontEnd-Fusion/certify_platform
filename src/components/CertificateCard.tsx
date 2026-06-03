interface CertificateCardProps {
  institution: string;
  date: string;
  event: string;
}

export function CertificateCard({ institution, date, event }: CertificateCardProps) {
  return (
    <div>
      <div className="w-full h-[187px] bg-[#D9D9D9] mb-5"></div>

      <p className="text-primary-blue-base font-bold text-[27px]">{event}</p>
      <p className="font-normal text-[22px] text-primary-blue-700">{institution}</p>
      <p className="font-normal text-[19px] text-primary-blue-700">{date}</p>
    </div>
  )
}