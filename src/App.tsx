import "./App.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { RequestCertificate } from "./components/RequestCertificate";
import { WhatDoYouWantToDo } from "./components/WhatDoYouWantToDo";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route Component={WhatDoYouWantToDo} path="/" />
          <Route Component={RequestCertificate} path="/requestCertificate" />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
