import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/assets/Logo.svg";

type ProfileData = {
  fullName: string;
  birthDate: string;
  email: string;
  phone: string;
  cpf: string;
};

type ProfileFormData = ProfileData & {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ProfileErrors = {
  fullName?: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  form?: string;
};

type FeedbackType =
  | "success"
  | "error"
  | "warning"
  | "info";

type Feedback = {
  type: FeedbackType;
  title: string;
  message: string;
};


const initialProfile: ProfileData = {
  fullName: "Ana Silva",
  birthDate: "01/10/1996",
  email: "ana.silva@email.com",
  phone: "(11) 9 9999-9999",
  cpf: "123.456.789-00",
};

const initialForm: ProfileFormData = {
  ...initialProfile,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (!numbers) return "";

  if (numbers.length <= 2) {
    return `(${numbers}`;
  }

  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(
    2,
    7
  )}-${numbers.slice(7)}`;
};

const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 3) {
    return numbers;
  }

  if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  }

  if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(
      3,
      6
    )}.${numbers.slice(6)}`;
  }

  return `${numbers.slice(0, 3)}.${numbers.slice(
    3,
    6
  )}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
};

const formatBirthDate = (value: string): string => {
  const numbers = value.replace(/\D/g, "").slice(0, 8);

  if (numbers.length <= 2) {
    return numbers;
  }

  if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  }

  return `${numbers.slice(0, 2)}/${numbers.slice(
    2,
    4
  )}/${numbers.slice(4)}`;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidCPF = (cpf: string): boolean => {
  const numbers = cpf.replace(/\D/g, "");

  if (numbers.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(numbers)) {
    return false;
  }

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(numbers[i]) * (10 - i);
  }

  let remainder = (sum * 10) % 11;

  if (remainder === 10) {
    remainder = 0;
  }

  if (remainder !== Number(numbers[9])) {
    return false;
  }

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(numbers[i]) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10) {
    remainder = 0;
  }

  return remainder === Number(numbers[10]);
};

const isValidPhone = (phone: string): boolean => {
  const numbers = phone.replace(/\D/g, "");

  return numbers.length === 10 || numbers.length === 11;
};

const isValidBirthDate = (
  birthDate: string
): boolean => {
  const match = birthDate.match(
    /^(\d{2})\/(\d{2})\/(\d{4})$/
  );

  if (!match) {
    return false;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const getInitials = (name: string): string => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return "AS";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${
    parts[parts.length - 1][0]
  }`.toUpperCase();
};

const getAvatarUrlFromResponse = (
  data: unknown
): string | null => {
  if (!data || typeof data !== "object") {
    return null;
  }

  const response = data as Record<
    string,
    unknown
  >;

  const possibleUrl =
    response.avatarUrl ||
    response.avatar_url ||
    response.url ||
    response.imageUrl ||
    response.image_url ||
    response.avatar;

  return typeof possibleUrl === "string"
    ? possibleUrl
    : null;
};

const getApiErrorMessage = async (
  response: Response,
  fallback: string
): Promise<string> => {
  try {
    const contentType =
      response.headers.get("content-type") || "";

    if (
      contentType.includes("application/json")
    ) {
      const data = await response.json();

      return (
        data?.message ||
        data?.error ||
        data?.detail ||
        fallback
      );
    }

    const text = await response.text();

    if (
      text &&
      !text
        .toLowerCase()
        .includes("<!doctype")
    ) {
      return text;
    }

    return fallback;
  } catch {
    return fallback;
  }
};

export const Profilepage = () => {
  const [profile, setProfile] =
    useState<ProfileData>(initialProfile);

  const [formData, setFormData] =
    useState<ProfileFormData>(initialForm);

  const [originalData, setOriginalData] =
    useState<ProfileData>(initialProfile);

  const [errors, setErrors] =
    useState<ProfileErrors>({});

  const [feedback, setFeedback] =
    useState<Feedback | null>(null);

  const [loadingProfile, setLoadingProfile] =
    useState(false);

  const [loadingPassword, setLoadingPassword] =
    useState(false);

  const [avatarUrl, setAvatarUrl] =
    useState<string | null>(null);

  const [avatarModalOpen, setAvatarModalOpen] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [avatarPreviewUrl, setAvatarPreviewUrl] =
    useState<string | null>(null);

  const [avatarError, setAvatarError] =
    useState("");

  const [isDragOver, setIsDragOver] =
    useState(false);

  const [uploadingAvatar, setUploadingAvatar] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const editAvatarButtonRef =
    useRef<HTMLButtonElement | null>(null);

  const previousPreviewRef =
    useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previousPreviewRef.current) {
        URL.revokeObjectURL(
          previousPreviewRef.current
        );
      }
    };
  }, []);

  useEffect(() => {
    if (!avatarModalOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        !uploadingAvatar
      ) {
        closeAvatarModal();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    avatarModalOpen,
    uploadingAvatar,
  ]);

  const showFeedback = (
    type: FeedbackType,
    title: string,
    message: string
  ) => {
    setFeedback({
      type,
      title,
      message,
    });
  };

  const handleProfileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    let formattedValue = value;

    if (name === "phone") {
      formattedValue = formatPhone(value);
    }

    if (name === "cpf") {
      formattedValue = formatCPF(value);
    }

    if (name === "birthDate") {
      formattedValue =
        formatBirthDate(value);
    }

    setFormData((previous) => ({
      ...previous,
      [name]: formattedValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
      form: undefined,
    }));

    setFeedback(null);
  };

  const validateProfile = (): ProfileErrors => {
    const validationErrors: ProfileErrors =
      {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName =
        "O nome completo é obrigatório.";
    }

    if (
      !formData.birthDate.trim() ||
      !isValidBirthDate(formData.birthDate)
    ) {
      validationErrors.birthDate =
        "Informe uma data de nascimento válida.";
    }

    if (
      !formData.email.trim() ||
      !isValidEmail(formData.email)
    ) {
      validationErrors.email =
        "Informe um e-mail válido.";
    }

    if (!isValidPhone(formData.phone)) {
      validationErrors.phone =
        "Informe um telefone válido.";
    }

    if (!isValidCPF(formData.cpf)) {
      validationErrors.cpf =
        "Informe um CPF válido.";
    }

    return validationErrors;
  };

  const handleProfileSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors =
      validateProfile();

    if (
      Object.keys(validationErrors).length
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFeedback(null);
    setLoadingProfile(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    const updatedProfile: ProfileData = {
      fullName:
        formData.fullName.trim(),
      birthDate: formData.birthDate,
      email: formData.email,
      phone: formData.phone,
      cpf: formData.cpf,
    };

    setProfile(updatedProfile);
    setOriginalData(updatedProfile);

    setFormData((previous) => ({
      ...previous,
      ...updatedProfile,
    }));

    showFeedback(
      "success",
      "Informações atualizadas com sucesso!",
      "Seus dados foram alterados corretamente."
    );

    toast.success(
      "Informações atualizadas com sucesso!"
    );

    setLoadingProfile(false);
  };

  const handleCancel = () => {
    setProfile(originalData);

    setFormData((previous) => ({
      ...previous,
      ...originalData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    setErrors({});
    setFeedback(null);
  };

  const validatePassword = (): ProfileErrors => {
    const validationErrors: ProfileErrors =
      {};

    if (!formData.currentPassword) {
      validationErrors.currentPassword =
        "A senha atual é obrigatória.";
    }

    if (!formData.newPassword) {
      validationErrors.newPassword =
        "A nova senha é obrigatória.";
    } else if (
      formData.newPassword.length < 8
    ) {
      validationErrors.newPassword =
        "A nova senha deve possuir no mínimo 8 caracteres.";
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword =
        "Confirme a nova senha.";
    } else if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      validationErrors.confirmPassword =
        "As senhas não coincidem.";
    }

    return validationErrors;
  };

  const handlePasswordSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors =
      validatePassword();

    if (
      Object.keys(validationErrors).length
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFeedback(null);
    setLoadingPassword(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    setFormData((previous) => ({
      ...previous,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    showFeedback(
      "success",
      "Senha atualizada com sucesso!",
      "Sua senha foi alterada corretamente."
    );

    toast.success(
      "Senha atualizada com sucesso!"
    );

    setLoadingPassword(false);
  };

  const validateAvatarFile = (
    file: File
  ): string | null => {
    const validMimeTypes = [
      "image/png",
      "image/jpeg",
    ];

    const validExtension =
      file.name
        .toLowerCase()
        .endsWith(".png") ||
      file.name
        .toLowerCase()
        .endsWith(".jpg") ||
      file.name
        .toLowerCase()
        .endsWith(".jpeg");

    if (
      !validMimeTypes.includes(file.type) ||
      !validExtension
    ) {
      return "Formato inválido. Envie uma imagem PNG ou JPG.";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "A imagem deve ter no máximo 5MB.";
    }

    return null;
  };

  const selectAvatarFile = (
    file: File | undefined
  ) => {
    if (!file) {
      return;
    }

    setAvatarError("");

    const validationError =
      validateAvatarFile(file);

    if (validationError) {
      setSelectedFile(null);

      if (previousPreviewRef.current) {
        URL.revokeObjectURL(
          previousPreviewRef.current
        );

        previousPreviewRef.current = null;
      }

      setAvatarPreviewUrl(null);
      setAvatarError(validationError);

      return;
    }

    if (previousPreviewRef.current) {
      URL.revokeObjectURL(
        previousPreviewRef.current
      );
    }

    const previewUrl =
      URL.createObjectURL(file);

    previousPreviewRef.current =
      previewUrl;

    setSelectedFile(file);
    setAvatarPreviewUrl(previewUrl);
    setAvatarError("");
  };

  const handleFileInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    selectAvatarFile(file);

    event.target.value = "";
  };

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!uploadingAvatar) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragOver(false);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragOver(false);

    if (uploadingAvatar) {
      return;
    }

    selectAvatarFile(
      event.dataTransfer.files?.[0]
    );
  };

  const openFileSelector = () => {
    if (!uploadingAvatar) {
      fileInputRef.current?.click();
    }
  };

  const handleUploadAreaKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openFileSelector();
    }
  };

  const openAvatarModal = () => {
    setSelectedFile(null);
    setAvatarPreviewUrl(null);
    setAvatarError("");
    setIsDragOver(false);
    setAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    if (uploadingAvatar) {
      return;
    }

    if (previousPreviewRef.current) {
      URL.revokeObjectURL(
        previousPreviewRef.current
      );

      previousPreviewRef.current = null;
    }

    setSelectedFile(null);
    setAvatarPreviewUrl(null);
    setAvatarError("");
    setIsDragOver(false);
    setAvatarModalOpen(false);

    setTimeout(() => {
      editAvatarButtonRef.current?.focus();
    }, 0);
  };

  const handleAvatarUpload = async () => {
    if (
      !selectedFile ||
      uploadingAvatar
    ) {
      return;
    }

    const validationError =
      validateAvatarFile(selectedFile);

    if (validationError) {
      setAvatarError(validationError);
      return;
    }

    setUploadingAvatar(true);
    setAvatarError("");

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    if (avatarPreviewUrl) {
      setAvatarUrl(avatarPreviewUrl);
    }

    showFeedback(
      "success",
      "Foto de perfil adicionada com sucesso!",
      "Sua nova foto já está sendo exibida no seu perfil."
    );

    toast.success(
      "Foto de perfil adicionada com sucesso!"
    );

    setUploadingAvatar(false);
    closeAvatarModal();
  };

  const avatarContent = (
    <div className="relative">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`Foto de perfil de ${profile.fullName}`}
          className="h-20 w-20 rounded-full object-cover"
        />
      ) : (
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0069A8] text-2xl font-bold text-white"
          aria-label={`Avatar de ${profile.fullName}`}
        >
          {getInitials(profile.fullName)}
        </div>
      )}

      <button
        ref={editAvatarButtonRef}
        type="button"
        onClick={openAvatarModal}
        aria-label="Alterar foto de perfil"
        className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#0069A8] shadow-md hover:bg-[#F4F5F9] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="13"
            r="3.5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );

  const feedbackClasses = {
    success:
      "border-[#A7E3C0] bg-[#ECFDF3] text-[#087443]",
    error:
      "border-[#F3B5B5] bg-[#FEF2F2] text-[#B42318]",
    warning:
      "border-[#F4D28A] bg-[#FFFAEB] text-[#92400E]",
    info:
      "border-[#B8D8F0] bg-[#EFF8FF] text-[#175CD3]",
  };

  return (
    <section className="min-h-screen w-full bg-[#F4F5F9] text-[#1A1551] font-inter">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <div className="flex min-h-screen w-full">
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col bg-[#1A1551]">
          <div className="flex h-20 shrink-0 items-center border-b border-white/10 px-6">
            <a
              href="/"
              aria-label="Ir para a página inicial da Certify"
              className="flex items-center"
            >
              <img
                src={Logo}
                alt="Certify Logo"
                className="h-12 w-auto object-contain"
              />
            </a>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <button
  type="button"
  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-5 w-5 shrink-0"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 4h12v16H6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 8h6M9 12h6M9 16h4"
    />
  </svg>

  <span>Certificados</span>
</button>
              <button
                type="button"
                aria-current="page"
                className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5 shrink-0"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                  />
                  <path d="M5 21a7 7 0 0114 0" />
                </svg>

                <span>Meu perfil</span>
              </button>
            </div>
          </nav>

          <div className="shrink-0 border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0069A8]">
                {getInitials(profile.fullName)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">
                  {profile.fullName}
                </p>

                <p className="truncate text-xs text-white/50">
                  Aluno
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  aria-label="Configurações"
                  title="Configurações"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                    />
                    <path d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V20h-2.54v-.1a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 008.1 15a1.7 1.7 0 00-1.56-1.03H6v-2.54h.1A1.7 1.7 0 007.66 10a1.7 1.7 0 00-.34-1.88l-.06-.06 1.8-1.8.06.06A1.7 1.7 0 0011 6a1.7 1.7 0 001.03-1.56V4h2.54v.1A1.7 1.7 0 0015.6 5.66a1.7 1.7 0 001.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0018.94 9c0 .7.42 1.33 1.03 1.56H20v2.54h-.1A1.7 1.7 0 0019.4 15z" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Sair"
                  title="Sair"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                    <path d="M21 19V5a2 2 0 00-2-2h-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="ml-[260px] min-h-screen flex-1 bg-[#F4F5F9] px-6 py-8 lg:px-10">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#1A1551] sm:text-3xl">
                Meu perfil
              </h1>

              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Gerencie seus dados pessoais,
                instituições vinculadas e
                preferências da conta.
              </p>
            </div>

            <div className="mb-6 rounded-2xl border border-[#E1E4EA] bg-white p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {avatarContent}

                <div>
                  <h2 className="text-xl font-bold text-[#1A1551]">
                    {profile.fullName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {profile.email}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#0069A8]">
                    4 certificados
                  </p>
                </div>
              </div>
            </div>

            {feedback && (
              <div
                role={
                  feedback.type === "error"
                    ? "alert"
                    : "status"
                }
                aria-live="polite"
                className={`mb-6 flex w-full items-start justify-between gap-4 rounded-xl border px-4 py-4 ${feedbackClasses[feedback.type]}`}
              >
                <div>
                  <p className="text-sm font-bold">
                    {feedback.title}
                  </p>

                  <p className="mt-1 text-sm">
                    {feedback.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFeedback(null)
                  }
                  aria-label="Fechar mensagem"
                  className="shrink-0 opacity-70 hover:opacity-100"
                >
                  ×
                </button>
              </div>
            )}

            <form
              onSubmit={handleProfileSubmit}
              noValidate
              className="rounded-2xl border border-[#E1E4EA] bg-white p-5 sm:p-7 md:p-10"
            >
              <div className="mb-8">
                <h2 className="text-xl font-bold sm:text-2xl">
                  Dados pessoais
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Essas informações aparecem no seu
                  certificado e no seu portfólio público.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Nome completo
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Nome Completo"
                    value={formData.fullName}
                    onChange={handleProfileChange}
                    disabled={loadingProfile}
                    autoComplete="name"
                    aria-invalid={Boolean(
                      errors.fullName
                    )}
                    className={`h-12 w-full rounded-xl border bg-white px-4 outline-none ${
                      errors.fullName
                        ? "border-red-500"
                        : "border-[#D1D5DB]"
                    } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                  />

                  {errors.fullName && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="birthDate"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Data de nascimento
                  </label>

                  <input
                    id="birthDate"
                    name="birthDate"
                    type="text"
                    placeholder="DD/MM/AAAA"
                    value={formData.birthDate}
                    onChange={handleProfileChange}
                    disabled={loadingProfile}
                    inputMode="numeric"
                    maxLength={10}
                    aria-invalid={Boolean(
                      errors.birthDate
                    )}
                    className={`h-12 w-full rounded-xl border bg-white px-4 outline-none ${
                      errors.birthDate
                        ? "border-red-500"
                        : "border-[#D1D5DB]"
                    } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                  />

                  {errors.birthDate && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.birthDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    E-mail
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nome@email.com"
                    value={formData.email}
                    onChange={handleProfileChange}
                    disabled={loadingProfile}
                    autoComplete="email"
                    aria-invalid={Boolean(
                      errors.email
                    )}
                    className={`h-12 w-full rounded-xl border bg-white px-4 outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-[#D1D5DB]"
                    } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                  />

                  {errors.email && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Telefone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(00) 0 0000-0000"
                    value={formData.phone}
                    onChange={handleProfileChange}
                    disabled={loadingProfile}
                    inputMode="numeric"
                    maxLength={16}
                    aria-invalid={Boolean(
                      errors.phone
                    )}
                    className={`h-12 w-full rounded-xl border bg-white px-4 outline-none ${
                      errors.phone
                        ? "border-red-500"
                        : "border-[#D1D5DB]"
                    } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                  />

                  {errors.phone && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cpf"
                    className="mb-2 block text-sm font-semibold"
                  >
                    CPF
                  </label>

                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleProfileChange}
                    disabled={loadingProfile}
                    inputMode="numeric"
                    maxLength={14}
                    aria-invalid={Boolean(
                      errors.cpf
                    )}
                    className={`h-12 w-full rounded-xl border bg-white px-4 outline-none ${
                      errors.cpf
                        ? "border-red-500"
                        : "border-[#D1D5DB]"
                    } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                  />

                  {errors.cpf && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.cpf}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loadingProfile}
                  className="w-full rounded-xl border border-[#0069A8] px-6 py-3.5 font-bold text-[#0069A8] hover:bg-[#0069A8]/5 disabled:opacity-50 sm:w-auto sm:min-w-[150px]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loadingProfile}
                  aria-busy={loadingProfile}
                  className="w-full rounded-xl bg-[#0069A8] px-6 py-3.5 font-bold text-white hover:bg-[#005582] disabled:cursor-not-allowed disabled:bg-[#0069A8]/50 sm:w-auto sm:min-w-[220px]"
                >
                  {loadingProfile ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Salvando...
                    </span>
                  ) : (
                    "Salvar alterações"
                  )}
                </button>
              </div>
            </form>

            <form
              onSubmit={handlePasswordSubmit}
              noValidate
              className="mt-6 rounded-2xl border border-[#E1E4EA] bg-white p-5 sm:p-7 md:p-10"
            >
              <div className="mb-8">
                <h2 className="text-xl font-bold sm:text-2xl">
                  Segurança
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Altere sua senha de acesso.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Senha atual
                  </label>

                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={
                      formData.currentPassword
                    }
                    onChange={handleProfileChange}
                    autoComplete="current-password"
                    disabled={loadingPassword}
                    className={`h-12 w-full rounded-xl border bg-white px-4 outline-none ${
                      errors.currentPassword
                        ? "border-red-500"
                        : "border-[#D1D5DB]"
                    } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                  />

                  {errors.currentPassword && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Nova senha
                  </label>

                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="Digite a nova senha"
                    value={formData.newPassword}
                    onChange={handleProfileChange}
                    autoComplete="new-password"
                    disabled={loadingPassword}
                    className={`h-12 w-full rounded-xl border bg-white px-4 outline-none ${
                      errors.newPassword
                        ? "border-red-500"
                        : "border-[#D1D5DB]"
                    } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Mínimo de 8 caracteres.
                  </p>

                  {errors.newPassword && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Confirmar nova senha
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Repita a nova senha"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleProfileChange}
                    autoComplete="new-password"
                    disabled={loadingPassword}
                    className={`h-12 w-full rounded-xl border bg-white px-4 outline-none ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-[#D1D5DB]"
                    } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                  />

                  {errors.confirmPassword && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loadingPassword}
                aria-busy={loadingPassword}
                className="mt-8 w-full rounded-xl bg-[#0069A8] px-6 py-3.5 font-bold text-white hover:bg-[#005582] disabled:cursor-not-allowed disabled:bg-[#0069A8]/50 sm:w-auto sm:min-w-[220px]"
              >
                {loadingPassword ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Atualizando...
                  </span>
                ) : (
                  "Atualizar senha"
                )}
              </button>
            </form>
          </div>
        </main>
      </div>

      {avatarModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
                event.currentTarget &&
              !uploadingAvatar
            ) {
              closeAvatarModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="avatar-modal-title"
            aria-describedby="avatar-modal-description"
            className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="avatar-modal-title"
                  className="text-xl font-bold text-[#1A1551] sm:text-2xl"
                >
                  Adicionar foto de perfil
                </h2>

                <p
                  id="avatar-modal-description"
                  className="mt-2 text-sm leading-relaxed text-gray-500"
                >
                  Deixe seu perfil ainda mais personalizado
                  adicionando uma foto.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAvatarModal}
                disabled={uploadingAvatar}
                aria-label="Fechar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={uploadingAvatar}
            />

            {!selectedFile ? (
              <div
                role="button"
                tabIndex={
                  uploadingAvatar ? -1 : 0
                }
                aria-label="Selecionar imagem de perfil"
                onClick={openFileSelector}
                onKeyDown={
                  handleUploadAreaKeyDown
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mt-6 flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                  isDragOver
                    ? "border-[#0069A8] bg-[#0069A8]/10"
                    : avatarError
                    ? "border-red-400 bg-red-50"
                    : "border-[#B9C0CC] bg-[#FAFBFC] hover:border-[#0069A8] hover:bg-[#0069A8]/5"
                }`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF5FB] text-[#0069A8]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 16V4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="m7 9 5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 16.5v1A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <p className="font-semibold text-[#1A1551]">
                  Arraste e solte uma imagem aqui
                </p>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openFileSelector();
                  }}
                  disabled={uploadingAvatar}
                  className="mt-2 font-semibold text-[#0069A8] underline underline-offset-2"
                >
                  clique para selecionar
                </button>

                <p className="mt-4 text-xs text-gray-500">
                  Apenas PNG ou JPG, até 5MB
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-[#D1D5DB] bg-[#FAFBFC] p-6 text-center">
                <img
                  src={avatarPreviewUrl || ""}
                  alt="Pré-visualização da nova foto de perfil"
                  className="mx-auto h-40 w-40 rounded-full border-4 border-white object-cover shadow-md"
                />

                <p className="mt-4 break-all text-sm font-semibold text-[#1A1551]">
                  {selectedFile.name}
                </p>

                <button
                  type="button"
                  onClick={openFileSelector}
                  disabled={uploadingAvatar}
                  className="mt-3 text-sm font-semibold text-[#0069A8] hover:underline"
                >
                  Trocar imagem
                </button>
              </div>
            )}

            {avatarError && (
              <p
                role="alert"
                className="mt-3 text-sm font-medium text-red-600"
              >
                {avatarError}
              </p>
            )}

            <button
              type="button"
              onClick={handleAvatarUpload}
              disabled={
                !selectedFile ||
                uploadingAvatar
              }
              aria-busy={uploadingAvatar}
              className="mt-6 w-full rounded-xl bg-[#0069A8] px-6 py-3.5 font-bold text-white hover:bg-[#005582] disabled:cursor-not-allowed disabled:bg-[#0069A8]/40"
            >
              {uploadingAvatar ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Importando imagem...
                </span>
              ) : (
                "Importar imagem"
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
