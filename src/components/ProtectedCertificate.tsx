

export interface ProtectedCertificated {
  children: React.ReactNode;
}

export const ProtecteCertificateRouter = ({ children }: ProtectedCertificated) => {
  return <>{children}</>;
};
