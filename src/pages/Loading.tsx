import { Logo } from "@/components/Logo";

export const LoadingPage = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center relative">
      <div className="h-56 w-56 border-b-2 border-blue-700 rounded-full animate-spin"></div>
      <Logo className="text-blue-900 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};
