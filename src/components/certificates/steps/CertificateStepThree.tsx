import { CertificateGenerateInfo } from "../CertificateGenerateInfo";
import { CertificateResumeStepThree } from "../CertificateResumeStepThree";
import { CertificateSentFiles } from "../CertificateSentFiles";
import { ParticipantsListContainer } from "../ParticipantsListContainer";

export function CertificateStepThree({ onBack }: { onBack: () => void }) {

  return (
    <div className="flex gap-3 mt-8">
      <div className="flex flex-col gap-3 w-2/3">
        <div className="grid grid-cols-2 gap-3">
          <CertificateGenerateInfo />

          <CertificateSentFiles />
        </div>

        <ParticipantsListContainer onBack={onBack} />
      </div>

      <div className="w-1/3">
        <CertificateResumeStepThree />
      </div>
    </div>
  )
}