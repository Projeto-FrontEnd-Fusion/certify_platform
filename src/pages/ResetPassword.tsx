import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiCheck, BiLoader } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { useFormValidation } from "@/hooks/useForm";
import { ResetPasswordSchema } from "@/schemas/ResetPassword";
import { useResetPasswordAuth } from "@/hooks/Auth/useResetPasswordAuth";
import GirlWithCertificate from "@/assets/GirlWithCertificate.webp";
import EmpresaPhoto from "@/assets/EmpresaPhoto.png";
import Logo from "@/assets/Logo.svg";
import { IoClose } from "react-icons/io5";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { errors, handleSubmit, register, isValid, watch } = useFormValidation(ResetPasswordSchema);
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

  function usePasswordRules(password: string) {
    return [
      { label: "Mais de 10 caracteres", valid: password.length > 10 },
      { label: "Pelo menos 1 número", valid: /\d/.test(password) },
      { label: "Letras maiúsculas e minúsculas", valid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
      { label: "Pelo menos 1 caractere especial", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
  }

  const passwordValue = watch("password", "");
  const rules = usePasswordRules(passwordValue);

  const onSubmit = handleSubmit((formData) => {
    mutate(formData.password);
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

    <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center px-5 py-20 sm:px-8 sm:py-16 md:px-10 lg:px-12 xl:px-16 bg-[#F7F7F7]">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-[#000000]">
          Redefinir senha
        </h1>

        <p className="text-gray-600 mb-7 sm:mb-8 text-sm sm:text-base leading-relaxed">
          Digite abaixo sua nova senha.
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2 text-[#1A1551]"
            >
              Nova senha{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>

            <div className="relative">
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nova senha"
                autoComplete="new-password"
                tabIndex={1}
                aria-invalid={Boolean(errors.password)}
                aria-describedby="password-error password-rules"
                className={`w-full bg-[#E8E8E8] px-4 py-3.5 sm:py-4 rounded-xl border pr-12 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/50 transition-all font-medium ${
                  errors.password
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-transparent"
                }`}
              />

              <button
                type="button"
                tabIndex={2}
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
                aria-pressed={showPassword}
                className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-[#0069A8] transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff size={21} aria-hidden="true" />
                ) : (
                  <FiEye size={21} aria-hidden="true" />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                aria-live="polite"
                className="text-red-500 text-sm mt-1 font-medium"
              >
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold mb-2 text-[#1A1551]"
            >
              Confirmar senha{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>

            <div className="relative">
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type={
                  showConfirmPassword ? "text" : "password"
                }
                placeholder="Confirme sua nova senha"
                autoComplete="new-password"
                tabIndex={3}
                aria-invalid={Boolean(
                  errors.confirmPassword
                )}
                aria-describedby="confirm-password-error"
                className={`w-full bg-[#E8E8E8] px-4 py-3.5 sm:py-4 rounded-xl border pr-12 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/50 transition-all font-medium ${
                  errors.confirmPassword
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-transparent"
                }`}
              />

              <button
                type="button"
                tabIndex={4}
                onClick={() =>
                  setShowConfirmPassword(
                    (current) => !current
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmação de senha"
                    : "Mostrar confirmação de senha"
                }
                aria-pressed={showConfirmPassword}
                className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-[#0069A8] transition-colors"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={21} aria-hidden="true" />
                ) : (
                  <FiEye size={21} aria-hidden="true" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                role="alert"
                aria-live="polite"
                className="text-red-500 text-sm mt-1 font-medium"
              >
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>

          <div
            id="password-rules"
            aria-live="polite"
            aria-atomic="false"
            className="flex flex-col gap-2 pt-1"
          >
            <p className="text-sm font-semibold text-[#CF1A0F]">
              Sua senha deve conter:
            </p>

            <div className="flex flex-col gap-2">
              {rules.map((rule) => (
                <div
                  key={rule.label}
                  className="flex items-center gap-2"
                >
                  {rule.valid ? (
                    <BiCheck
                      className="text-green-600 w-5 h-5 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <IoClose
                      className="text-[#CF1A0F] w-5 h-5 shrink-0"
                      aria-hidden="true"
                    />
                  )}

                  <span className="text-sm text-[#000000]">
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            tabIndex={5}
            disabled={!isValid || isPending}
            className="w-full py-3.5 sm:py-4 bg-[#0069A8] text-white rounded-xl font-bold mt-2 disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed hover:bg-[#005582] active:bg-[#005582] transition-colors flex justify-center items-center gap-2"
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
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-8 sm:mt-10 text-center text-sm text-gray-500 leading-relaxed">
          <span>
            Precisa de ajuda? Fale com o nosso suporte{" "}
          </span>

          <a
            href="mailto:suporte@certify.com.br"
            className="font-bold text-[#0069A8] hover:underline"
          >
            suporte@certify.com.br
          </a>
        </div>
      </div>
    </div>

    <div className="hidden md:block md:w-1/2 min-h-screen relative overflow-hidden bg-black">
      <img
        src={sideImage}
        alt="Imagem de destaque redefinir senha"
        className={`absolute inset-0 w-full h-full object-cover ${
          role === "empresa" ? "grayscale" : ""
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/30" />

      <div className="absolute top-6 right-6 lg:top-8 lg:right-8 xl:right-10 z-10">
        <img
          src={Logo}
          alt="Certify Logo"
          className="h-12 sm:h-14 lg:h-16 xl:h-[4.5rem] w-auto object-contain"
        />
      </div>
    </div>
  </section>
);
};
