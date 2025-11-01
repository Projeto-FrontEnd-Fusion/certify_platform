import { Link } from "react-router-dom";
import { Images } from "@/config/RequestCertificadeImages";
import { useFormValidation } from "@/hooks/useForm";
import { SignUpSchema, type SignUpSchemaType } from "@/schemas/SignUp";
import { useAuthSignUp } from "@/hooks/Auth/useAuthSignUp";

export const SignUpForm = () => {
  const { errors, handleSubmit, register } = useFormValidation(SignUpSchema);
  const { mutate, isPending, isSuccess, isError } = useAuthSignUp();

  const onSubmit = (formData: SignUpSchemaType) => {
    console.log("Formulário submetido", formData);
    const authRequest = {
      ...formData,
      role: "user",
    };
    mutate(authRequest);
  };
  return (
    <section className="px-2 py-16 space-y-8  w-full h-full bg-[#F2F2F9] lg:flex lg:items-center">
      {isPending && "Caregando"}
      {isSuccess && "Dados Registrados"}
      {isError && "Falha ao Cadastrar dados"}


      <figure className="max-w-[32rem] lg:w-full mx-auto lg:order-2  lg:mx-0 lg:max-w-[50%] xl:flex-1">
        <div className="flex gap-2 justify-center w-full">
          {Images.map(({ alt, src, id }) => (
            <img
              className="w-full max-w-[32%] aspect-square rounded-2xl object-cover lg:h-[28.75rem] lg:aspect-auto 2xl:h-[32rem]"
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

      <div className="space-y-8 lg:flex lg:flex-col   lg:px-10 xl:flex-1 ">
      <div className="space-y-4 font-inter  max-w-[32rem] mx-auto">
        <h2 className="text-xl font-semibold text-justify sm:text-justify sm:text-2xl text-[#1A1551] lg:text-start lg:text-3xl">
          Crie sua conta na CertiFy e tenha acesso a todos os seus certificados
          em um só lugar.
        </h2>
        <p className="text-justify sm:text-justify sm:text-lg text-[#1A1551] lg:text-start lg:text-xl">
          É rápido, gratuito e garante acesso fácil aos seus certificados
          digitais.
        </p>
      </div>

      <form
        className="font-inter space-y-4 max-w-[32rem] mx-auto w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="space-y-4">
          <div>
            <input
              {...register("fullname")}
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
      <div className="font-inter text-xs w-fit mx-auto text-center flex flex-col lg:text-sm">
        <p>Já tem uma conta?</p>
        <Link
          to={"/login"}
          className="underline duration-300 will-change-transform transition hover:scale-[1.02] active:scale-95"
        >
          Faça login
        </Link>
      </div>
      </div>
    </section>
  );
};
