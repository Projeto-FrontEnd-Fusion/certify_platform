import { BiError } from "react-icons/bi";

export const NotFound = () => {
  return (
 <section className="w-full h-screen flex flex-col justify-center items-center text-center">
      <div className="flex items-center gap-2">
        <BiError className="text-[4rem] text-zinc-700" />
      </div>

      <article className="text-zinc-700">
        <h2 className="font-black text-[5rem]">404</h2>
        <i className="text-[1.4rem] text-zinc-600">
          Oops! Não conseguimos encontrar essa página <br />
          Verifique o endereço ou volte para a página inicial.
        </i>
      </article>

      <a href="/login" className="m-4 px-6 bg-blue-800 text-white py-4 rounded-2xl">
        Voltar para a página inicial
      </a>
    </section>
      
  );
};
