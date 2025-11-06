import { ProtecteCertificateRouter } from "@/components/ProtectedCertificate"
import { Outlet } from "react-router-dom"

export const CertificateProtectedLayout = () =>{
  return(
    <ProtecteCertificateRouter>
      <Outlet />
    </ProtecteCertificateRouter>
      
  )
}