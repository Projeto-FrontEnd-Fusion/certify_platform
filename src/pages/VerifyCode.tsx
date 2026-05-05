import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

  const { mutate, isPending, isSuccess, isError, error, reset } = useVerifyCodeAuth();
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
    let timer: NodeJS.Timeout;
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

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="text-center">
              <h1 className="text-xl lg:text-xl font-bold mb-6 text-gray-700">
                Insira o código que foi enviado ao seu e-mail
              </h1>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 md:gap-4 mb-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isPending || maxAttemptsReached}
                  className={`w-12 h-14 md:w-16 md:h-16 text-center text-2xl font-bold rounded-xl border focus:outline-none transition-all ${
                    hasError
                      ? "border-red-500 text-red-500"
                      : "border-[#4F46E5] text-[#1A1551] focus:ring-2 focus:ring-[#4F46E5]/50"
                  } ${isPending || maxAttemptsReached ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              ))}
            </div>

            {/* Error Message */}
            {hasError && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error?.message || "Código incorreto! Verifique seu e-mail."}
              </p>
            )}

            {/* Max Attempts Error */}
            {maxAttemptsReached && (
              <p className="text-red-500 text-sm font-medium text-center">
                Limite de tentativas atingido. Solicite um novo código.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isComplete || isPending || maxAttemptsReached}
              className="w-full py-4 bg-[#4F46E5] text-white rounded-xl font-bold mt-6 disabled:bg-[#4F46E5]/50 disabled:cursor-not-allowed hover:bg-[#4338CA] transition-colors flex justify-center items-center"
            >
              {isPending ? <BiLoader size={24} className="animate-spin" /> : "Recuperar conta"}
            </button>

            {/* Resend Code */}
            <div className="text-sm mt-4">
              <span className="text-gray-500">Reenviar o código em: </span>
              {countdown > 0 ? (
                <span className="text-gray-500">{countdown} seg</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={maxAttemptsReached}
                  className="text-[#4F46E5] font-bold hover:underline transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar novamente <span className="ml-1">✓</span>
                </button>
              )}
            </div>
            
            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <Link to="/login" className="text-sm text-[#4F46E5] font-bold hover:underline transition-all block">
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
          alt="Imagem de destaque verificação de código"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            role === "empresa" ? "grayscale" : ""
          }`}
        />
      </div>
    </section>
  );
};
