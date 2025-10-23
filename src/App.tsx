import "./App.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { RequestCertificateLogin } from "./components/RequestCertificateLogin";

import { Routes, Route, Navigate } from "react-router-dom";
import { RequestCertificateRegister } from "./components/RequestCertificateRegister";

function App() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route Component={RequestCertificateLogin} path="/login" />
          <Route Component={RequestCertificateRegister} path="/signup" />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
