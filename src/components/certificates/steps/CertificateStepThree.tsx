export function CertificateStepThree({onBack}: {onBack: () => void}) {
  return <section><h2>Confirmar certificado</h2><button type="button" onClick={onBack}>Voltar</button><button type="submit">Confirmar</button></section>;
}
