import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingPage } from "./pages/Loading";
import { UserAuthLayout } from "./layouts/UserAuthLayout";
import { NotFound } from "./pages/Notfound";
import { UserLayout } from "./layouts/UserLayout";

const RequestCertificateLogin = lazy(() =>
  import("./components/RequestCertificateLogin").then((m) => ({
    default: m.RequestCertificateLogin,
  }))
);

const RequestCertificateRegister = lazy(() =>
  import("./components/RequestCertificateRegister").then((m) => ({
    default: m.RequestCertificateRegister,
  }))
);

const MyCertificates = lazy(() =>
  import("./components/MyCertificates").then((m) => ({
    default: m.MyCertificates,
  }))
);

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/login" element={<RequestCertificateLogin />} />
        <Route path="/signup" element={<RequestCertificateRegister />} />

        <Route path="/" element={<UserAuthLayout />}>
          <Route element={<UserLayout />}>
            <Route path="meus-certificados" element={<MyCertificates />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
