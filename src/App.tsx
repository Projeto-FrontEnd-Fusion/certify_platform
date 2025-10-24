import "./App.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingPage } from "./pages/Loading";

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

const NotFound = lazy(() =>
  import("./pages/Notfound").then((m) => ({ default: m.NotFound }))
);

function App() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <LoadingPage />
          }
        >
          <Routes>
            <Route path="/queijo" element={<LoadingPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<RequestCertificateLogin />} />
            <Route path="/signup" element={<RequestCertificateRegister />} />
            <Route path="/meus-certificados" element={<MyCertificates />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
