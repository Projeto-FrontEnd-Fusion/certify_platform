import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingPage } from "./pages/Loading";
import { AuthProtectedLayout } from "./layouts/AuthProtectedLayout";
import { NotFound } from "./pages/Notfound";
import { AuthLayout } from "./layouts/AuthLayout";
import { DownloadCertificate } from "./pages/DownloadCertificate";
import { ProtecteCertificateRouter } from "./components/ProtectedCertificate";
import { CompanyLayout } from "./layouts/CompanyLayout/CompanyLayout";
import { CertificateCompany } from "./pages/CertificateCompany";
import { CertificationCreate } from "./pages/CertificationCreate";


const Login = lazy(() =>
  import("./pages/Login").then((m) => ({
    default: m.FormLogin,
  }))
);

const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword").then((m) => ({
    default: m.ForgotPassword,
  }))
);

const VerifyCode = lazy(() =>
  import("./pages/VerifyCode").then((m) => ({
    default: m.VerifyCode,
  }))
);

const ResetPassword = lazy(() =>
  import("./pages/ResetPassword").then((m) => ({
    default: m.ResetPassword,
  }))
);

const SignUp = lazy(() =>
  import("./pages/SignUp").then((m) => ({
    default: m.SignUpForm,
  }))
);

const MyCertificates = lazy(() =>
  import("./pages/MyCertificates").then((m) => ({
    default: m.MyCertificates,
  }))
);

const PrivacyPolicy = lazy(() =>
  import("./pages/PrivacyPolicy").then((m) => ({
    default: m.PrivacyPolicy,
  }))
)

const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({
    default: m.ContactPage,
  }))
)
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((m) => ({
    default: m.Profilepage,
  }))
);

const CertificateModelPage = lazy(
  () => import("./pages/CertificateModel")
);

const CertificateDetails = lazy(() =>
  import("./pages/CertificateDetails").then((m) => ({
    default: m.CertificateDetails,
  }))
);

const CertificateValidationPage = lazy(() =>
  import("./pages/CertificateValidation")
);


/**===========================================
 * Paginas para testar a integracao com a API
 * ===========================================
 */
/**===========================================
 * 
 * ===========================================
 */



function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/modelo-certificado" element={<Navigate to="/empresa/modelos" replace />} />
        <Route
  path="/validar-certificado/:code"
  element={<CertificateValidationPage />}
/>
      <Route
        path="/verificar/:code"
        element={<CertificateValidationPage />}
      />
        <Route
          path="/certificados/visualizar/:id?"
          element={<CertificateDetails />}
        />

        <Route path="/" element={<AuthProtectedLayout />}>
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="meus-certificados" element={<MyCertificates />} />
          <Route element={<AuthLayout />}>
            <Route index element={<Navigate to="/meus-certificados" replace />} />
            <Route path="pagina-de-contato" element={<ContactPage />} />
            <Route path="politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="download-certificado/:eventnane" element={
              <ProtecteCertificateRouter>
                <DownloadCertificate />
              </ProtecteCertificateRouter>

            } />

            <Route path="meus-dados" element={<Navigate to="/perfil" replace />} />
            <Route path="validar-certificados" element={<NotFound />} />
          </Route>

          <Route path="/empresa" element={<CompanyLayout />}>
            <Route index element={<Navigate to="certificados" replace />} />
            <Route path="dashboard" element={<NotFound />} />

            <Route path="/empresa/certificados" element={<CertificateCompany />} />
            <Route path="/empresa/certificados/criar" element={<Navigate to="/empresa/certificados" replace />} />
            <Route path="/empresa/certificados/criar/:id" element={<CertificationCreate />} />

            <Route path="alunos" element={<NotFound />} />
            <Route path="modelos" element={<CertificateModelPage />} />
            <Route path="relatorios" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
