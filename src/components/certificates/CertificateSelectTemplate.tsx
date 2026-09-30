import { CertificateTemplate } from './CertificateTemplate'
import { VARIANT_LABELS } from './constants'
import { type CertificateVariant } from './types'

interface CertificateSelectTemplateProps {
  variant: CertificateVariant
  selected?: boolean
  onSelect?: (variant: CertificateVariant) => void
}

export function CertificateSelectTemplate({
  variant,
  selected = false,
  onSelect,
}: CertificateSelectTemplateProps) {
  return (
    <div>
      <div
        onClick={() => onSelect?.(variant)}
        className={`border rounded-xl p-3 transition-all duration-300 cursor-pointer ${selected ? 'border-[#0069A8] bg-[#0069A8]/5' : 'border-[#E2E8F0]'
          }`}
      >
        <div className="w-full flex justify-end">
          <button
            type="button"
            aria-label={`Selecionar modelo ${VARIANT_LABELS[variant]}`}
            aria-pressed={selected}
            className="w-4 h-4 border border-[#0069A8] rounded-full cursor-pointer flex items-center justify-center"
          >
            {selected && <span className="w-2 h-2 rounded-full bg-[#0069A8]" />}
          </button>
        </div>

        <div className="px-6 py-2.5">
          <CertificateTemplate variant={variant} />
        </div>

        <p className="text-center text-[#0069A8] font-semibold text-xs">
          {VARIANT_LABELS[variant]}
        </p>
      </div>
    </div>
  )
}