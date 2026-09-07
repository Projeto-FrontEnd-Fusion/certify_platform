import { type FormEvent, type ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/assets/Logo.svg";

type ProfileFormData = {
  fullName: string;
  email: string;
  phone: string;
  newPassword: string;
  confirmPassword: string;
};

type ProfileErrors = {
  fullName?: string;
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
  form?: string;
};

const initialProfile: ProfileFormData = {
  fullName: "Ana Beatriz",
  email: "ana.beatriz@email.com",
  phone: "(11) 99999-9999",
  newPassword: "",
  confirmPassword: "",
};

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (!numbers) {
    return "";
  }

  if (numbers.length <= 2) {
    return `(${numbers}`;
  }

  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const Profilepage = () => {
  const [formData, setFormData] =
    useState<ProfileFormData>(initialProfile);

  const [originalData, setOriginalData] =
    useState<ProfileFormData>(initialProfile);

  const [errors, setErrors] =
    useState<ProfileErrors>({});

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const newValue =
      name === "phone"
        ? formatPhone(value)
        : value;

    setFormData((previous) => ({
      ...previous,
      [name]: newValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
      form: undefined,
    }));
  };

  const validateForm = (): ProfileErrors => {
    const validationErrors: ProfileErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName =
        "O nome completo é obrigatório.";
    }

    if (!formData.email.trim()) {
      validationErrors.email =
        "O email é obrigatório.";
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email =
        "Digite um email válido.";
    }

    if (
      formData.newPassword &&
      formData.newPassword.length < 8
    ) {
      validationErrors.newPassword =
        "A senha deve possuir no mínimo 8 caracteres.";
    }

    if (
      formData.newPassword &&
      !formData.confirmPassword
    ) {
      validationErrors.confirmPassword =
        "A confirmação da senha é obrigatória.";
    }

    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      validationErrors.confirmPassword =
        "As senhas precisam ser idênticas.";
    }

    return validationErrors;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload: {
        fullName: string;
        email: string;
        phone: string;
        password?: string;
      } = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""),
      };

      if (formData.newPassword) {
        payload.password = formData.newPassword;
      }


      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1200);
      });

      const updatedData: ProfileFormData = {
        ...formData,
        newPassword: "",
        confirmPassword: "",
      };

      setFormData(updatedData);
      setOriginalData(updatedData);

      toast.success(
        "Perfil atualizado com sucesso!"
      );
    } catch {
      const errorMessage =
        "Não foi possível atualizar o perfil. Tente novamente.";

      setErrors({
        form: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    setFormData(originalData);
    setErrors({});
  };

  return (
    <section className="flex min-h-screen w-full font-inter bg-[#F4F5F9] text-[#1A1551]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <header className="fixed top-0 left-0 z-40 w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-12">
        <a
          href="/"
          aria-label="Ir para a página inicial da Certify"
          className="flex items-center"
        >
          <img
            src={Logo}
            alt="Certify Logo"
            className="h-12 sm:h-14 lg:h-16 xl:h-[4.5rem] w-auto object-contain"
          />
        </a>

        <div
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0069A8] text-white flex items-center justify-center font-bold text-sm sm:text-base"
          aria-label="Perfil do aluno AB"
          title="Perfil do aluno"
        >
          AB
        </div>
      </header>

      <main className="w-full min-h-screen pt-20 px-4 py-28 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#F4F5F9]">
        <div className="w-full max-w-[842px] mx-auto">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-[35px] font-bold text-[#1A1551] mb-3">
              Meu perfil
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Para alterar as informações basta clicar no
              campo, ajustar o texto e clicar em Salvar
              Alterações.
            </p>
          </div>

          {errors.form && (
            <div
              role="alert"
              aria-live="assertive"
              className="w-full mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium"
            >
              {errors.form}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-[842px] mx-auto bg-[#F4F5F9] rounded-xl sm:rounded-2xl border border-[#D1D5DB] p-5 sm:p-7 md:p-10"
          >
            <div className="space-y-5 sm:space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold mb-2 text-[#1A1551]"
                >
                  Nome Completo
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(
                    errors.fullName
                  )}
                  aria-describedby={
                    errors.fullName
                      ? "fullName-error"
                      : undefined
                  }
                  autoComplete="name"
                  disabled={loading}
                  className={`w-full h-12 sm:h-14 px-4 text-sm sm:text-base rounded-xl border bg-[#F4F5F9] outline-none transition-all ${
                    errors.fullName
                      ? "border-red-500 text-red-600 ring-1 ring-red-500"
                      : "border-[#D1D5DB] text-[#1A1551] focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/30"
                  } ${
                    loading
                      ? "opacity-50 cursor-not-allowed bg-[#F4F5F9]"
                      : ""
                  }`}
                />

                {errors.fullName && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600 font-medium"
                  >
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-[#1A1551]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email
                      ? "email-error"
                      : undefined
                  }
                  autoComplete="email"
                  disabled={loading}
                  className={`w-full h-12 sm:h-14 px-4 text-sm sm:text-base rounded-xl border bg-[#F4F5F9] outline-none transition-all ${
                    errors.email
                      ? "border-red-500 text-red-600 ring-1 ring-red-500"
                      : "border-[#D1D5DB] text-[#1A1551] focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/30"
                  } ${
                    loading
                      ? "opacity-50 cursor-not-allowed bg-[#F4F5F9]"
                      : ""
                  }`}
                />

                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600 font-medium"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold mb-2 text-[#1A1551]"
                >
                  Telefone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(XX) XXXXX-XXXX"
                  maxLength={15}
                  inputMode="numeric"
                  autoComplete="tel"
                  disabled={loading}
                  className="w-full h-12 sm:h-14 px-4 text-sm sm:text-base rounded-xl border border-[#D1D5DB] bg-[#F4F5F9] text-[#1A1551] outline-none focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F4F5F9]"
                />
              </div>

              <div className="pt-5 sm:pt-6 border-t border-[#D1D5DB]">
                <h2 className="text-lg sm:text-xl font-bold text-[#1A1551] mb-2">
                  Alterar senha
                </h2>

                <p className="text-sm text-gray-500">
                  Preencha os campos abaixo somente se desejar
                  alterar sua senha.
                </p>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold mb-2 text-[#1A1551]"
                >
                  Nova senha
                </label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  minLength={8}
                  autoComplete="new-password"
                  aria-invalid={Boolean(
                    errors.newPassword
                  )}
                  aria-describedby={
                    errors.newPassword
                      ? "newPassword-error"
                      : "newPassword-help"
                  }
                  disabled={loading}
                  className={`w-full h-12 sm:h-14 px-4 text-sm sm:text-base rounded-xl border bg-[#F4F5F9] outline-none transition-all ${
                    errors.newPassword
                      ? "border-red-500 text-red-600 ring-1 ring-red-500"
                      : "border-[#D1D5DB] text-[#1A1551] focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/30"
                  } ${
                    loading
                      ? "opacity-50 cursor-not-allowed bg-[#F4F5F9]"
                      : ""
                  }`}
                />

                <p
                  id="newPassword-help"
                  className="mt-2 text-xs sm:text-sm text-gray-500"
                >
                  A senha deve possuir no mínimo 8 caracteres.
                </p>

                {errors.newPassword && (
                  <p
                    id="newPassword-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600 font-medium"
                  >
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold mb-2 text-[#1A1551]"
                >
                  Confirmar nova senha
                  {formData.newPassword && (
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  )}
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={Boolean(
                    formData.newPassword
                  )}
                  aria-required={Boolean(
                    formData.newPassword
                  )}
                  aria-invalid={Boolean(
                    errors.confirmPassword
                  )}
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
                  }
                  autoComplete="new-password"
                  disabled={loading}
                  className={`w-full h-12 sm:h-14 px-4 text-sm sm:text-base rounded-xl border bg-[#F4F5F9] outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-500 text-red-600 ring-1 ring-red-500"
                      : "border-[#D1D5DB] text-[#1A1551] focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/30"
                  } ${
                    loading
                      ? "opacity-50 cursor-not-allowed bg-[#F4F5F9]"
                      : ""
                  }`}
                />

                {errors.confirmPassword && (
                  <p
                    id="confirmPassword-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600 font-medium"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="w-full sm:w-auto sm:min-w-[220px] py-3.5 sm:py-4 px-6 bg-[#0069A8] text-white rounded-xl font-bold disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed hover:bg-[#005582] active:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Salvando...
                    </span>
                  ) : (
                    "Salvar alterações"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="w-full sm:w-auto sm:min-w-[160px] py-3.5 sm:py-4 px-6 bg-transparent border border-[#0069A8] text-[#0069A8] rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0069A8]/5 active:bg-[#0069A8]/10 focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};
