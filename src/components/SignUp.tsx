import { Link } from "react-router-dom";
import { Images } from "@/config/RequestCertificadeImages";
import { useFormValidation } from "@/hooks/useForm";
import { SignUpSchema, type SignUpSchemaType } from "@/schemas/SignUp";

export const SignUpForm = () => {
      const { errors, handleSubmit, register } = useFormValidation(
    SignUpSchema
  );

   const onSubmit = handleSubmit((data: SignUpSchemaType) => {
    console.log(data);
  });
  return (
    <section className="px-2 py-8 space-y-8  max-w-[30rem] mx-auto bg-[#F2F2F9]">
      <figure>
        <div className="flex gap-1 justify-center">
          {Images.map(({ alt, src, id }) => (
            <img
              className="w-[32%] aspect-square rounded-2xl object-cover "
              key={id}
              src={src}
              alt={alt}
            />
          ))}
        </div>
        <figcaption className="sr-only">
          Pessoas recebendo certificados
        </figcaption>
      </figure>
      <div className="space-y-4 font-inter">
        <h2 className="text-xl font-semibold text-center text-[#1A1551]">
          Crie sua conta na CertiFy e tenha acesso a todos os seus certificados
          em um só lugar.
        </h2>
        <p className="text-center text-[#1A1551]">
          É rápido, gratuito e garante acesso fácil aos seus certificados
          digitais.
        </p>
      </div>

      <form className="font-inter space-y-4" onSubmit={onSubmit}>
        <fieldset className="space-y-4">
             <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Nome completo"
              className="px-2.5 py-4 border w-full rounded-xl font-semibold border-[#1A1551]"
            />
            {errors.name && (
              <span className="text-red-400 text-xs animate-pulse ml-2">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="seuemail@email.com"
              className="px-2.5 py-4 border w-full rounded-xl font-semibold border-[#1A1551]"
            />
            {errors.email && (
              <span className="text-red-400 text-xs animate-pulse ml-2">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="digite a sua senha"
              className="px-2.5 py-4 border w-full rounded-xl font-semibold border-[#1A1551]"
            />
            {errors.password && (
              <span className="text-red-400 text-xs animate-pulse ml-2">
                {errors.password.message as string}
              </span>
            )}
          </div>
        </fieldset>
        <button
          className="py-4 bg-[#3925DD] text-white font-semibold cursor-pointer w-full rounded-xl
                hover:shadow-lg hover:shadow-[#3a25dd79]
                duration-300 transition active:scale-90"
          type="submit"
        >
          Criar conta
        </button>
      </form>
      <div className="font-inter text-xs w-fit mx-auto text-center">
        <p>Já tem uma conta?</p>
        <Link to={"/login"} className="underline">
          Faça login
        </Link>
      </div>
    </section>
  );
};
