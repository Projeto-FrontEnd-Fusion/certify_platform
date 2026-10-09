export function CertificateStepThree({onBack, isPending = false}: {onBack: () => void; isPending?: boolean}) {
  return <section><h2>Confirmar certificado</h2><button type="button" onClick={onBack} disabled={isPending}>Voltar</button><button type="submit" disabled={isPending}>{isPending ? 'Emitindo...' : 'Confirmar'}</button></section>;
}
