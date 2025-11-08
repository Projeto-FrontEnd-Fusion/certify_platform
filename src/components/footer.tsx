import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="text-gray-600 font-inter text-[0.625rem] text-center flex flex-col gap-1.5 py-5 w-full sm:text-xs min-[900px]:text-sm!  bg-[#F2F2F9]">
      <p className="font-bold">CertiFy — Todos os direitos reservados © 2025</p>

      <p>
        Desenvolvido com
        <span role="img" aria-label="coração">
          {" "}
          🖤
        </span>{" "}
        pela Comunidade Frontend Fusion
      </p>

      <nav aria-label="Footer links" className="self-center">
        <Link
          to={"pagina-de-contato"}
          className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-[0.0625rem] after:bg-[#000000] after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          🔗 Contato
        </Link>{" "}
        <span className="font-black">|</span>{" "}
        <Link to={"politica-de-privacidade"}
          // href="/politica-de-privacidade"
          className=" relative after:absolute after:left-0 after:-bottom-0.5 after:h-[0.0625rem] after:bg-[#000000] after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          🔗 Política de Privacidade
        </Link>
      </nav>
    </footer>
  );
};
