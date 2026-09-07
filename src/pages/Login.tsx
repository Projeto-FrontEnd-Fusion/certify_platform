import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { FiEye, FiEyeOff,  FiAlertCircle } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import { useLoginAuth } from "@/hooks/Auth/useLoginAuth";
import { useFormValidation } from "@/hooks/useForm";
import { LoginSchema, type LoginSchemaType } from "@/schemas/Login";
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
    navigation("/");
  } else {
    navigation("/meus-certificados");
  }
}, [auth, navigation]);

useEffect(() => {
  if (isSuccess) {
    toast.success("Login realizado com sucesso!", {
      position: "top-center",
      autoClose: 3000,
      ...TOAST_STYLES.success,
    });
  }
}, [isSuccess]);

const onSubmit = handleSubmit((formData: LoginSchemaType) => {
  mutate(formData);
});

return (
  <section className="flex min-h-screen w-full bg-white font-inter text-[#1A1551]">
    <ToastContainer />

    <div className="flex min-h-screen w-full flex-col justify-center bg-white px-6 py-8 sm:px-8 md:w-1/2 md:px-12 lg:px-16 xl:px-24">
      <div className="mx-auto w-full max-w-md">

        <div className="mb-8 flex items-center justify-end gap-2 text-sm md:text-base">
          <span className="text-[#4B5563]">
            Ainda não tem conta?
          </span>

          <Link
            to="/signup"
            className="font-bold text-[#0069A8] transition-colors hover:underline"
          >
            Criar conta
          </Link>
        </div>

        <div className="mb-7">
          <h1 className="mb-3 text-[31px] font-semibold leading-tight text-[#060607]">
            Login
          </h1>
        </div>

        <div
          className="mb-7 flex gap-4"
          role="tablist"
          aria-label="Selecione o tipo de perfil"
        >
          <button
            type="button"
            role="tab"
            aria-selected={role === "aluno"}
            onClick={() => setRole("aluno")}
            className={`flex-1 rounded-xl border py-3 font-semibold transition-all duration-200 ${
              role === "aluno"
                ? "border-[#0069A8] bg-[#0069A8] text-white"
                : "border-[#D1D5DB] bg-white text-[#4B5563] hover:border-[#0069A8] hover:text-black"
            }`}
          >
            Aluno
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={role === "empresa"}
            onClick={() => setRole("empresa")}
            className={`flex-1 rounded-xl border py-3 font-semibold transition-all duration-200 ${
              role === "empresa"
                ? "border-[#0069A8] bg-[#0069A8] text-white"
                : "border-[#D1D5DB] bg-white text-[#4B5563] hover:border-[#0069A8] hover:text-black"
            }`}
          >
            Empresa
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#1A1551]"
            >
              E-mail
            </label>

            <div className="relative">
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                autoComplete="email"
                aria-label="E-mail"
                aria-required="true"
                aria-invalid={!!errors.email || isError}
                className={`w-full rounded-xl border px-4 py-4 font-medium text-[#1A1551] outline-none transition-all duration-200 placeholder:text-[#6B7280] ${
                  errors.email || isError
                    ? "border-[#DC2626] bg-[#FEE2E2] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                    : "border-transparent bg-[#F3F4F6] focus:border-[#08080D] focus:ring-2 focus:ring-[#08080D]/20"
                }`}
              />

              {(errors.email || isError) && (
                <FiAlertCircle
                  size={21}
                  aria-hidden="true"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#DC2626]"
                />
              )}
            </div>

            {errors.email && (
              <p
                role="alert"
                className="mt-2 text-sm font-medium text-[#DC2626]"
              >
                Digite um e-mail válido
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#1A1551]"
            >
              Senha
            </label>

            <div className="relative">
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                aria-label="Senha"
                aria-required="true"
                aria-invalid={!!errors.password || isError}
                className={`w-full rounded-xl border px-4 py-4 pr-14 font-medium text-[#1A1551] outline-none transition-all duration-200 placeholder:text-[#6B7280] ${
                  errors.password || isError
                    ? "border-[#DC2626] bg-[#FEE2E2] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                    : "border-transparent bg-[#F3F4F6] focus:border-[#08080D] focus:ring-2 focus:ring-[#08080D]/20"
                }`}
              />

              {(errors.password || isError) && (
                <FiAlertCircle
                  size={21}
                  aria-hidden="true"
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-[#DC2626]"
                />
              )}

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Ocultar senha" : "Exibir senha"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#919192] transition-colors hover:text-[#1A1551]"
              >
                {showPassword ? (
                  <FiEyeOff size={22} />
                ) : (
                  <FiEye size={22} />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                role="alert"
                className="mt-2 text-sm font-medium text-[#DC2626]"
              >
                Senha incorreta
              </p>
            )}
          </div>

          {isError && (
            <p
              role="alert"
              className="text-sm font-medium text-[#DC2626]"
            >
              E-mail ou senha inválidos.
            </p>
          )}

          <div className="mt-2 flex items-start justify-between gap-4">
            <div className="flex items-center pt-2">
              <input
                {...register("rememberMe")}
                type="checkbox"
                id="rememberMe"
                defaultChecked
                className="h-4 w-4 rounded border-[#D1D5DB] text-[#4F46E5] focus:ring-[#4F46E5]"
              />

              <label
                htmlFor="rememberMe"
                className="ml-2 cursor-pointer text-sm font-medium text-[#4B5563]"
              >
                Lembrar senha
              </label>
            </div>

            <Link
              to="/forgot-password"
              state={{ role }}
              className="-mt-1 text-right text-sm font-bold text-[#0069A8] transition-colors hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!isValid || isPending}
            aria-live="polite"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0069A8] py-4 font-bold text-white transition-colors duration-200 hover:bg-[#145572] disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
          >
            {isPending ? (
              <>
                <BiLoader
                  size={22}
                  className="animate-spin"
                  aria-hidden="true"
                />
                <span>Carregando</span>
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </div>

        <div className="mt-8">
          <p className="mb-1 text-sm text-black">
            Precisa de ajuda?
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#4B5563]">
              Fale com o nosso suporte
            </span>

            <a
              href="mailto:suporte@certify.com.br"
              className="text-sm font-semibold text-[#0069A8] transition-colors hover:underline"
            >
              suporte@certify.com.br
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="relative hidden min-h-screen w-1/2 overflow-hidden md:block">
      <img
        src={role === "empresa" ? EmpresaPhoto : GirlWithCertificate}
        alt={
          role === "empresa"
            ? "Imagem promocional para empresa"
            : "Imagem promocional de formatura"
        }
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute right-8 top-8 z-10">
        <img
          src={Logo}
          alt="Logo Certify"
          className="h-16 w-auto"
        />
      </div>
    </div>
  </section>
);
};
