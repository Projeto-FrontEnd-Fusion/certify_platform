import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import { useLoginAuth } from "@/hooks/Auth/useLoginAuth";
import { useFormValidation } from "@/hooks/useForm";
import { LoginSchema } from "@/schemas/Login";
import { useAuthStoreData } from "@/stores/useAuthStore";
import { TOAST_STYLES } from "./ToastStyleContainer";
import GirlWithCertificate from "@/assets/GirlWithCertificate.webp";
import EmpresaPhoto from "@/assets/EmpresaPhoto.png";
import Logo from "@/assets/Logo.svg";

export const FormLogin = () => {
  const [role, setRole] = useState<"aluno" | "empresa">("aluno");
  const [showPassword, setShowPassword] = useState(false);

  const { errors, handleSubmit, register, isValid } = useFormValidation(LoginSchema);
  const { mutate, isPending, isSuccess, isError } = useLoginAuth();
  const { auth } = useAuthStoreData();
  const navigation = useNavigate();

  useEffect(() => {
    if (!auth?._id) return;
    if ((auth.role as string) === "empresa") {
      navigation("/"); // Placeholder, redirect according to your existing structure
    } else {
      navigation("/meus-certificados");
    }
  }, [auth, navigation]);

  useEffect(() => {
    if (isError) {
      toast.error('E-mail ou senha inválidos.', {
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

  const onSubmit = handleSubmit((formData: any) => {
    const authData = {
      ...formData,
      role
    };
    mutate(authData);
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

          <h1 className="text-3xl lg:text-3xl font-bold mb-3 text-[#1A1551]">Acesse sua conta</h1>
          <p className="text-gray-600 mb-8 text-sm lg:text-base leading-relaxed">
            Você pode acessar sua conta com e-mail, {role === "empresa" ? "CNPJ" : "CPF"} ou telefone e senha cadastrados
          </p>

          <p className="sr-only">Login / Selecione se você é empresa ou aluno</p>

          {/* Role Selector */}
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              className={`flex-1 py-3 rounded-2xl border font-semibold transition-colors ${role === "aluno"
                  ? "bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5]"
                  : "bg-transparent border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
              onClick={() => setRole("aluno")}
            >
              Aluno
            </button>
            <button
              type="button"
              className={`flex-1 py-3 rounded-2xl border font-semibold transition-colors ${role === "empresa"
                  ? "bg-[#E0E7FF] border-[#4F46E5] text-[#4F46E5]"
                  : "bg-transparent border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
              onClick={() => setRole("empresa")}
            >
              Empresa
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <input
                {...register("email")}
                type="text"
                placeholder={`E-mail ou ${role === "empresa" ? "CNPJ" : "CPF"}`}
                className={`w-full bg-[#E8E8E8] px-4 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 transition-all font-medium ${errors.email ? "border-red-500 ring-1 ring-red-500" : "border-transparent"
                  }`}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className={`w-full bg-[#E8E8E8] px-4 py-4 rounded-xl border pr-12 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 transition-all font-medium ${errors.password ? "border-red-500 ring-1 ring-red-500" : "border-transparent"
                  }`}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>

            {/* Shared Error Message as requested */}
            {(errors.email || errors.password) && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                E-mail ou senha inválidos.
              </p>
            )}

            {/* Remember Me */}
            <div className="flex items-center space-x-2 pt-1 pb-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]"
              />
              <label htmlFor="remember" className="text-sm font-medium text-[#1A1551]">
                Lembre - se de mim
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid || isPending}
              className="w-full py-4 bg-[#4F46E5] text-white rounded-xl font-bold mt-2 disabled:bg-[#4F46E5]/50 disabled:cursor-not-allowed hover:bg-[#4338CA] transition-colors flex justify-center items-center"
            >
              {isPending ? <BiLoader size={24} className="animate-spin" /> : "Acessar"}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-6">
              <Link to="/forgot-password" className="text-sm text-[#4F46E5] font-bold hover:underline transition-all block mt-4">
                Esqueci a senha
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:flex-1 relative bg-black">
        <img
          src={role === "empresa" ? EmpresaPhoto : GirlWithCertificate}
          alt="Imagem de destaque login"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${role === "empresa" ? "grayscale" : ""}`}
        />
      </div>
    </section>
  );
};
