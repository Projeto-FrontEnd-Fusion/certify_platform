import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { useFormValidation } from "@/hooks/useForm";
import { ResetPasswordSchema } from "@/schemas/ResetPassword";
import { useResetPasswordAuth } from "@/hooks/Auth/useResetPasswordAuth";
import GirlWithCertificate from "@/assets/GirlWithCertificate.webp";
import EmpresaPhoto from "@/assets/EmpresaPhoto.png";
import Logo from "@/assets/Logo.svg";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { errors, handleSubmit, register, isValid } = useFormValidation(ResetPasswordSchema);
  const { mutate, isPending, isSuccess } = useResetPasswordAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "aluno";
  const sideImage = role === "empresa" ? EmpresaPhoto : GirlWithCertificate;

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const onSubmit = handleSubmit((formData: any) => {
    mutate(formData.password);
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

          <h1 className="text-3xl lg:text-3xl font-bold mb-3 text-[#1A1551]">Redefinir senha</h1>
          <p className="text-gray-600 mb-8 text-sm lg:text-base leading-relaxed">
            Insira seu e-mail cadastrado e receba o código para alteração
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* New Password Field */}
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Nova senha"
                className={`w-full bg-[#E8E8E8] px-4 py-4 rounded-xl border pr-12 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 transition-all font-medium ${
                  errors.password ? "border-red-500 ring-1 ring-red-500" : "border-transparent"
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {errors.password.message as string}
              </p>
            )}

            {/* Confirm New Password Field */}
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua nova senha"
                className={`w-full bg-[#E8E8E8] px-4 py-4 rounded-xl border pr-12 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 transition-all font-medium ${
                  errors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : "border-transparent"
                }`}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {errors.confirmPassword.message as string}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid || isPending}
              className="w-full py-4 bg-[#4F46E5] text-white rounded-xl font-bold mt-2 disabled:bg-[#4F46E5]/50 disabled:cursor-not-allowed hover:bg-[#4338CA] transition-colors flex justify-center items-center"
            >
              {isPending ? <BiLoader size={24} className="animate-spin" /> : "Redefinir senha"}
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
          alt="Imagem de destaque redefinir senha"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${role === "empresa" ? "grayscale" : ""}`}
        />
      </div>
    </section>
  );
};
