import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { useVerifyCodeAuth } from "@/hooks/Auth/useVerifyCodeAuth";
import GirlWithCertificate from "@/assets/GirlWithCertificate.webp";
import EmpresaPhoto from "@/assets/EmpresaPhoto.png";
import Logo from "@/assets/Logo.svg";

export const VerifyCode = () => {
  const [code, setCode] = useState<string[]>(Array(5).fill(""));
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate, isPending, isSuccess, isError, reset } = useVerifyCodeAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "aluno";
  const sideImage = role === "empresa" ? EmpresaPhoto : GirlWithCertificate;

  const isComplete = code.every((digit) => digit !== "");
  const maxAttemptsReached = attempts >= 10;

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        // Redirecionamento provisório. Deve apontar para a próxima etapa.
        navigate("/reset-password", { state: { role } });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate, role]);

  useEffect(() => {
    if (isError) {
      setHasError(true);
      setAttempts((prev) => prev + 1);
    }
  }, [isError]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return; // Allow only numbers

    // Clear error state if user starts typing again
    if (hasError) {
      setHasError(false);
      reset();
    }

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1); // Keep only the last typed character
    setCode(newCode);

    // Auto-advance
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 5);
    if (!pastedData) return;

    if (hasError) {
      setHasError(false);
      reset();
    }

    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 4);
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete && !maxAttemptsReached) {
      mutate(code.join(""));
    }
  };

  const handleResend = () => {
    if (countdown === 0 && !maxAttemptsReached) {
      setCountdown(60);
      setHasError(false);
      reset();
      // Em um cenário real, chamaria uma API de reenvio de código aqui
    }
  };
 const email =
  location.state?.email ||
  location.state?.identifier ||
  "seunome@empresa.com.br";

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

    <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center px-4 py-20 sm:px-6 sm:py-16 md:px-8 lg:px-12 xl:px-16 bg-[#F7F7F7]">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-[#000000]">
          Confirmar e-mail
        </h1>

        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
          Enviamos um código de 6 dígitos para o e-mail cadastrado.
          Digite para confirmar e continuar.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 p-4 bg-white border border-gray-200 rounded-xl">
          <p className="text-sm text-gray-600 min-w-0">
            Código enviado para{" "}
            <strong className="text-[#1A1551] inline-block break-all">
              {email}
            </strong>
          </p>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            tabIndex={1}
            className="self-start sm:self-center shrink-0 text-sm font-bold text-[#0069A8] hover:underline"
          >
            Editar e-mail
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label
              htmlFor="otp-0"
              className="block text-sm font-semibold mb-3 text-[#1A1551]"
            >
              Digite o código de 6 dígitos
            </label>

            <div
              className="grid grid-cols-6 gap-1.5 sm:flex sm:gap-3 md:gap-4"
              role="group"
              aria-label="Código de verificação de 6 dígitos"
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isPending || maxAttemptsReached}
                  tabIndex={index + 2}
                  aria-label={`Dígito ${index + 1} de 6`}
                  aria-invalid={hasError}
                  className={`w-full h-12 sm:h-16 md:h-20 text-center text-lg sm:text-2xl font-bold rounded-lg sm:rounded-xl border bg-white focus:outline-none transition-all ${
                    hasError
                      ? "border-red-500 text-red-500 ring-1 ring-red-500"
                      : "border-[#D1D5DB] text-[#1A1551] focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/30"
                  } ${
                    isPending || maxAttemptsReached
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {hasError && (
            <div
              role="alert"
              aria-live="polite"
              className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium"
            >
              Código inválido ou expirado. Verifique o código
              digitado ou solicite um novo token para continuar.
            </div>
          )}

          {maxAttemptsReached && (
            <div
              role="alert"
              aria-live="polite"
              className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium"
            >
              Limite de tentativas atingido. Solicite um novo
              código.
            </div>
          )}

          <button
            type="submit"
            tabIndex={8}
            disabled={
              !isComplete ||
              isPending ||
              maxAttemptsReached
            }
            className="w-full py-3.5 sm:py-4 bg-[#99A1AF] text-white rounded-xl font-bold disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed hover:bg-[#005582] active:bg-[#005582] transition-colors flex justify-center items-center gap-2"
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

          <div
            className="pt-1"
            aria-live="polite"
          >
            {countdown > 0 ? (
              <div className="text-sm text-gray-500 text-center">
                Reenviar código em{" "}
                <strong>{countdown} seg</strong>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isPending || maxAttemptsReached}
                tabIndex={9}
                className="w-full py-3.5 sm:py-4 bg-[#0069A8] text-white rounded-xl font-bold disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed hover:bg-[#005582] active:bg-[#005582] transition-colors flex justify-center items-center gap-2"
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
                  "Reenviar código"
                )}
              </button>
            )}
          </div>
        </form>

   <div className="mt-8 sm:mt-10 px-2 text-left leading-relaxed">
  <p className="text-sm font-bold text-gray-600 mb-1">
    Precisa de ajuda?
  </p>

  <div className="flex flex-wrap items-center gap-1 text-sm">
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

    <div className="hidden md:block md:w-1/2 min-h-screen relative overflow-hidden bg-black">
      <img
        src={sideImage}
        alt="Imagem de destaque confirmação de e-mail"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
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
