import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingPage } from "./pages/Loading";
import { AuthProtectedLayout } from "./layouts/AuthProtectedLayout";
import { NotFound } from "./pages/Notfound";
import { AuthLayout } from "./layouts/AuthLayout";
import { DownloadCertificate } from "./pages/DownloadCertificate";

const Login = lazy(() =>
  import("./pages/Login").then((m) => ({
    default: m.FormLogin,
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

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<AuthProtectedLayout />}>
          <Route element={<AuthLayout />}>
            <Route path="meus-certificados" element={<MyCertificates />} />
            <Route path="download-certificado" element={<DownloadCertificate />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
