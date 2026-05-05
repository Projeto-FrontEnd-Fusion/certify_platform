import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
    : "Insira seu e-mail ou CPF cadastrado e receba o código para alteração";
    
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

  const onSubmit = handleSubmit((formData: any) => {
    mutate(formData.identifier);
  });

  return (
    <section className="flex min-h-screen w-full font-inter bg-[#F4F5F9] lg:bg-white text-[#1A1551]">
      <ToastContainer />

      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-32 relative">
        <div className="max-w-md w-full mx-auto lg:mx-0 xl:mx-auto">
          {/* Logo */}
          <div className="mb-12 flex justify-center w-full">
            <img src={Logo} alt="Certify Logo" className="h-[60px]" />
          </div>

          <h1 className="text-3xl lg:text-3xl font-bold mb-3 text-[#1A1551]">Esqueci minha senha</h1>
          <p className="text-gray-600 mb-8 text-sm lg:text-base leading-relaxed">
            {subtitleText}
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Input Field */}
            <div className="relative">
              <input
                {...register("identifier")}
                type="text"
                placeholder={placeholderText}
                className={`w-full bg-[#E8E8E8] px-4 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 transition-all font-medium ${
                  errors.identifier ? "border-red-500 ring-1 ring-red-500" : "border-transparent"
                }`}
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.identifier.message as string}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid || isPending}
              className="w-full py-4 bg-[#4F46E5] text-white rounded-xl font-bold mt-2 disabled:bg-[#4F46E5]/50 disabled:cursor-not-allowed hover:bg-[#4338CA] transition-colors flex justify-center items-center"
            >
              {isPending ? <BiLoader size={24} className="animate-spin" /> : "Recuperar senha"}
            </button>

            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <Link to="/login" className="text-sm text-[#4F46E5] font-bold hover:underline transition-all block mt-4">
                Voltar ao Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:flex-1 relative bg-black">
        <img
          src={sideImage}
          alt="Imagem de destaque recuperar senha"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${role === "empresa" ? "grayscale" : ""}`}
        />
      </div>
    </section>
  );
};
