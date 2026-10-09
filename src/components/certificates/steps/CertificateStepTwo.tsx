export function CertificateStepTwo({onNext, onBack}: {onNext: () => void; onBack: () => void}) {
  return <section><h2>Revisar certificado</h2><button type="button" onClick={onBack}>Voltar</button><button type="button" onClick={onNext}>Continuar</button></section>;
}
