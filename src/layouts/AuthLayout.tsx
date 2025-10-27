import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
