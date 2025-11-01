import { Images } from "@/config/RequestCertificadeImages";
import { useLoginAuth } from "@/hooks/Auth/useLoginAuth";
import { useFormValidation } from "@/hooks/useForm";
import {
  LoginSchema,
  type LoginSchemaType,
} from "@/schemas/Login";
import { useAuthStoreData } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { BiLoader } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_STYLES } from "./ToastStyleContainer";


export const FormLogin = () => {
  const { errors, handleSubmit, register } = useFormValidation(LoginSchema);
  const {mutate, isPending, isSuccess, isError} = useLoginAuth()
  const {auth} = useAuthStoreData()
  const navigation = useNavigate();

  useEffect(() => {
    if (!auth?._id) return;
    navigation("/meus-certificados");
  }, [auth?._id!]);


useEffect(() => {
  if (isError) {
    toast.error('Credenciais Inválidas', {
      position: "top-center",
      autoClose: 5000,
      ...TOAST_STYLES.error
    });
  }

  if (isSuccess) {
    toast.success('Login realizado com sucesso!', {
      position: "top-center",
      autoClose: 3000,
      ...TOAST_STYLES.success
    });
  }
}, [isError, isSuccess]);

  const onSubmit = handleSubmit((formData: LoginSchemaType) => {
    const auth = {
      ...formData,
      role : "user"
    }
    console.log(auth);
    mutate(auth)
  });
  return (
    <section className="px-2 py-16 w-full max-lg:space-y-8 h-full bg-[#F2F2F9] lg:flex lg:items-center lg:py-0 lg:px-0">
      
      <ToastContainer />

      <figure className="max-w-[32rem] mx-auto lg:order-2 lg:max-w-full lg:mx-0 lg:h-full lg:flex-1">
        <div className="flex max-lg:gap-2 max-lg:justify-center lg:h-full">
          {Images.map(({ alt, src, id }) => (
            <img
              className="w-[32%] aspect-square rounded-2xl object-cover lg:nth-[2]:hidden lg:nth-[3]:hidden lg:rounded-none lg:w-full lg:aspect-auto lg:h-full"
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
      <div className="space-y-8 lg:flex lg:flex-col lg:flex-1 xl:flex-2 lg:px-10">
      <div className="space-y-4 font-inter max-w-[32rem] mx-auto">
        <h2 className="text-xl font-semibold text-justify sm:text-justify sm:text-2xl text-[#1A1551] lg:text-start lg:text-3xl">
          Acesse sua conta na CertiFy e confira todos os certificados
          disponíveis para você.
        </h2>
        <p className="text-justify sm:text-justify sm:text-lg text-[#1A1551] lg:text-start lg:text-xl">
          A CertiFy conecta você às instituições e eventos que reconheceram sua
          participação.
        </p>
      </div>

      <form className="font-inter space-y-4 max-w-[32rem] mx-auto w-full" onSubmit={onSubmit}>
        <fieldset className="space-y-4 w-full">
          <div className="w-full">
            <input
              {...register("email")}
              type="email"
              placeholder="seuemail@email.com"
              className="px-2.5 py-4 border w-full rounded-xl font-semibold border-[#1A1551] sm:text-lg lg:text-xl"
            />
            {errors.email && (
              <span className="text-red-400 text-xs animate-pulse ml-2">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              {...register("password")}
              type="password"
              placeholder="digite a sua senha"
              className="px-2.5 py-4 border w-full rounded-xl font-semibold border-[#1A1551] sm:text-lg  lg:text-xl"
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
        duration-300 transition active:scale-90 sm:text-lg lg:text-xl flex-justify-center"
          type="submit"
        >
          {isPending ? <span className="flex justify-center"><BiLoader size={32} className="animate-spin" /></span> :  "Login" }
         
        </button>
      </form>
      <div className="font-inter text-xs w-fit mx-auto text-center flex flex-col lg:text-sm">
        <p>Ainda não tem uma conta?</p>
        <Link to={"/signup"} className="underline duration-300 will-change-transform transition hover:scale-[1.02] active:scale-95">
          Crie a sua agora!
        </Link>
      </div>
      </div>
    </section>
  );
};
