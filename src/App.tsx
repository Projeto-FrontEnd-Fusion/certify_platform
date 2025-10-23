import "./App.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { RequestCertificateLogin } from "./components/RequestCertificateLogin";

import { Routes, Route } from "react-router-dom";
import { RequestCertificateRegister } from "./components/RequestCertificateRegister";

function App() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route Component={RequestCertificateLogin} path="/" />
          <Route Component={RequestCertificateRegister} path="/register" />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
