import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { ToastContainer } from 'react-toastify';
import { useFormValidation } from "@/hooks/useForm";
import { ForgotPasswordSchema } from "@/schemas/ForgotPassword";
import { useForgotPasswordAuth } from "@/hooks/Auth/useForgotPasswordAuth";
import GirlWithCertificate from "@/assets/GirlWithCertificate.webp";
import EmpresaPhoto from "@/assets/EmpresaPhoto.png";
import Logo from "@/assets/Logo.svg";

export const ForgotPassword = () => {
  const { errors, handleSubmit, register, isValid } = useFormValidation(ForgotPasswordSchema);
  const { mutate, isPending, isSuccess } = useForgotPasswordAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "aluno";
  
  const subtitleText = role === "empresa" 
    ? "Insira seu e-mail cadastrado e receba o código para alteração" 
    : "Insira seu e-mail ou cpf cadastrado e receba o codigo de verificacação para alteração da sua senha";
    
  const placeholderText = role === "empresa" ? "E-mail ou CNPJ" : "E-mail ou CPF";
  
  const sideImage = role === "empresa" ? EmpresaPhoto : GirlWithCertificate;

  useEffect(() => {
    if (isSuccess) {
      // Redireciona para próxima etapa (inserção de código)
      // Como não existe ainda, redireciona para um mock /verify-code (que dará 404)
      const timer = setTimeout(() => {
        navigate("/verify-code");
      }, 1500); // pequeno delay para a pessoa ver o toast
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const onSubmit = handleSubmit((formData) => {
    mutate(formData.identifier);
  });

return (
  <section className="flex min-h-screen w-full font-inter bg-[#F4F5F9] text-[#1A1551]">
    <ToastContainer />

    <button
      type="button"
      onClick={() => navigate("/login")}
      aria-label="Voltar para a página de login"
      className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 text-sm font-bold text-[#0069A8] hover:text-[#005582] transition-colors"
    >
      <span className="text-xl" aria-hidden="true">
      </span>
      Voltar
    </button>

    <div className="w-full md:w-1/2 lg:w-[52%] min-h-screen flex flex-col justify-center px-4 py-20 sm:px-6 sm:py-16 md:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-[#F7F7F7]">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-[#000000]">
          Esqueci minha senha
        </h1>

        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
          {subtitleText}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <label
              htmlFor="identifier"
              className="block text-sm font-semibold mb-2 text-[#1A1551]"
            >
              {placeholderText}
            </label>

            <input
              {...register("identifier")}
              id="identifier"
              type="text"
              inputMode="text"
              placeholder={placeholderText}
              aria-invalid={Boolean(errors.identifier)}
              className={`w-full bg-[#E8E8E8] px-4 py-3.5 sm:py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0069A8]/50 transition-all font-medium ${
                errors.identifier
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-transparent"
              }`}
            />

            {errors.identifier && (
              <p
                role="alert"
                aria-live="polite"
                className="text-red-500 text-sm mt-1 font-medium"
              >
                {errors.identifier.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isPending}
            className="w-full py-3.5 sm:py-4 bg-[#0069A8] text-white text-base rounded-xl font-bold mt-2 disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed hover:bg-[#005582] active:bg-[#005582] transition-colors flex justify-center items-center gap-2"
          >
            {isPending ? (
              <>
                <BiLoader
                  size={24}
                  className="animate-spin"
                  aria-hidden="true"
                />
                <span>Carregando</span>
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </form>

        <div className="mt-8 sm:mt-10 px-2 text-left leading-relaxed">
          <p className="text-sm font-bold text-gray-600 mb-1">
            Precisa de ajuda?
          </p>

          <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
            <span className="text-gray-500">
              Fale com o nosso suporte
            </span>

            <a
              href="mailto:suporte@certify.com.br"
              className="font-bold text-[#0069A8] hover:underline whitespace-nowrap"
            >
              suporte@certify.com.br
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="hidden md:block md:w-1/2 lg:w-[48%] min-h-screen relative overflow-hidden bg-black">
      <img
        src={sideImage}
        alt="Imagem de destaque recuperar senha"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          role === "empresa" ? "grayscale" : ""
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/30" />

      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:right-10 z-10">
        <img
          src={Logo}
          alt="Certify Logo"
          className="h-12 sm:h-14 lg:h-[4.5rem] w-auto object-contain"
        />
      </div>
    </div>
  </section>
);
};
