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
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  form?: string;
};

type FeedbackType = "success" | "error" | "warning" | "info";

type Feedback = {
  type: FeedbackType;
  title: string;
  message: string;
};

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5173/";

const initialProfile: ProfileData = {
  fullName: "Ana Silva",
  birthDate: "01/10/1996",
  email: "ana.silva@email.com",
  phone: "(00) 0 0000-0000",
  cpf: "000.000.000-00",
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

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
    7
  )}`;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const getInitials = (name: string): string => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return "AS";

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getApiErrorMessage = async (
  response: Response,
  fallback: string
): Promise<string> => {
  try {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();

      return (
        data?.message ||
        data?.error ||
        data?.detail ||
        fallback
      );
    }

    const text = await response.text();

    if (text && !text.toLowerCase().includes("<!doctype")) {
      return text;
    }

    return fallback;
  } catch {
    return fallback;
  }
};

const getAvatarUrlFromResponse = (
  data: unknown
): string | null => {
  if (!data || typeof data !== "object") {
    return null;
  }

  const response = data as Record<string, unknown>;

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
    const loadProfile = async () => {
      try {
        const response = await fetch(
          `${API_URL}/students/me`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          return;
        }

        const contentType =
          response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          return;
        }

        const data = await response.json();

        const profileData: ProfileData = {
          fullName:
            data.fullName ||
            data.full_name ||
            initialProfile.fullName,

          birthDate:
            data.birthDate ||
            data.birth_date ||
            initialProfile.birthDate,

          email:
            data.email ||
            initialProfile.email,

          phone:
            data.phone ||
            initialProfile.phone,

          cpf:
            data.cpf ||
            initialProfile.cpf,
        };

        setProfile(profileData);
        setOriginalData(profileData);

        setFormData((previous) => ({
          ...previous,
          ...profileData,
        }));

        const backendAvatar =
          getAvatarUrlFromResponse(data);

        if (backendAvatar) {
          setAvatarUrl(backendAvatar);
        }
      } catch {
        setFeedback({
          type: "error",
          title: "Não foi possível carregar o perfil",
          message:
            "Tente novamente em alguns instantes.",
        });
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (!avatarModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !uploadingAvatar) {
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
  }, [avatarModalOpen, uploadingAvatar]);

  useEffect(() => {
    return () => {
      if (previousPreviewRef.current) {
        URL.revokeObjectURL(
          previousPreviewRef.current
        );
      }
    };
  }, []);

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

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
      form: undefined,
    }));

    setFeedback(null);
  };

  const validateProfile = (): ProfileErrors => {
    const validationErrors: ProfileErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName =
        "O nome completo é obrigatório.";
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
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFeedback(null);
    setLoadingProfile(true);

    try {
      const response = await fetch(
        `${API_URL}/students/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fullName:
              formData.fullName.trim(),
          }),
        }
      );

      if (!response.ok) {
        const message =
          await getApiErrorMessage(
            response,
            "Não foi possível atualizar suas informações."
          );

        throw new Error(message);
      }

      let updatedProfile = {
        ...profile,
        fullName:
          formData.fullName.trim(),
      };

      const contentType =
        response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await response.json();

        updatedProfile = {
          ...updatedProfile,

          fullName:
            data.fullName ||
            data.full_name ||
            updatedProfile.fullName,

          birthDate:
            data.birthDate ||
            data.birth_date ||
            updatedProfile.birthDate,

          email:
            data.email ||
            updatedProfile.email,

          phone:
            data.phone ||
            updatedProfile.phone,

          cpf:
            data.cpf ||
            updatedProfile.cpf,
        };
      }

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
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar suas informações.";

      setErrors({
        form: message,
      });

      showFeedback(
        "error",
        "Não foi possível atualizar",
        message
      );

      toast.error(message);
    } finally {
      setLoadingProfile(false);
    }
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
    const validationErrors: ProfileErrors = {};

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
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFeedback(null);
    setLoadingPassword(true);

    try {
      const response = await fetch(
        `${API_URL}/students/me/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword:
              formData.currentPassword,
            newPassword:
              formData.newPassword,
            confirmPassword:
              formData.confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const message =
          await getApiErrorMessage(
            response,
            "Não foi possível atualizar sua senha."
          );

        throw new Error(message);
      }

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
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar sua senha.";

      setErrors({
        form: message,
      });

      showFeedback(
        "error",
        "Não foi possível atualizar a senha",
        message
      );

      toast.error(message);
    } finally {
      setLoadingPassword(false);
    }
  };

  const validateAvatarFile = (
    file: File
  ): string | null => {
    const validMimeTypes = [
      "image/png",
      "image/jpeg",
    ];

    const fileName =
      file.name.toLowerCase();

    const validExtension =
      fileName.endsWith(".png") ||
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg");

    const validMime =
      validMimeTypes.includes(
        file.type
      );

    if (!validMime || !validExtension) {
      return "Formato inválido. Envie uma imagem PNG ou JPG.";
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
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

    const files =
      Array.from(
        event.dataTransfer.files
      );

    if (!files.length) {
      return;
    }

    selectAvatarFile(files[0]);
  };

  const openFileSelector = () => {
    if (uploadingAvatar) {
      return;
    }

    fileInputRef.current?.click();
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
    if (!selectedFile || uploadingAvatar) {
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

    try {
      const formDataUpload =
        new FormData();

      formDataUpload.append(
        "avatar",
        selectedFile
      );

      const response = await fetch(
        `${API_URL}/students/me/avatar`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          body: formDataUpload,
        }
      );

      if (!response.ok) {
        const message =
          await getApiErrorMessage(
            response,
            "Não foi possível importar a imagem. Tente novamente."
          );

        throw new Error(message);
      }

      let newAvatarUrl: string | null =
        null;

      const contentType =
        response.headers.get("content-type") || "";

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        const data =
          await response.json();

        newAvatarUrl =
          getAvatarUrlFromResponse(
            data
          );
      }

      if (!newAvatarUrl) {
        newAvatarUrl =
          avatarPreviewUrl;
      }

      if (!newAvatarUrl) {
        throw new Error(
          "A imagem foi enviada, mas a API não retornou uma imagem válida."
        );
      }

      setAvatarUrl(newAvatarUrl);

      showFeedback(
        "success",
        "Foto de perfil adicionada com sucesso!",
        "Sua nova foto foi salva e já está sendo exibida no seu perfil."
      );

      toast.success(
        "Foto de perfil adicionada com sucesso!"
      );

      closeAvatarModal();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível importar a imagem. Tente novamente.";

      setAvatarError(message);

      toast.error(message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const avatarContent = (
    <div className="relative">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`Foto de perfil de ${profile.fullName}`}
          className="w-20 h-20 rounded-full object-cover"
        />
      ) : (
        <div
          className="w-20 h-20 rounded-full bg-[#0069A8] text-white flex items-center justify-center font-bold text-2xl"
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
        className="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-white border border-[#D1D5DB] shadow-md flex items-center justify-center text-[#0069A8] hover:bg-[#F4F5F9] focus:outline-none focus:ring-2 focus:ring-[#0069A8]/30"
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

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-[#1A1551]">
              {profile.fullName}
            </p>
            <p className="text-xs text-gray-500">
              Aluno
            </p>
          </div>

          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`Foto de ${profile.fullName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full bg-[#0069A8] text-white flex items-center justify-center font-bold"
              aria-label={`Avatar de ${profile.fullName}`}
            >
              {getInitials(profile.fullName)}
            </div>
          )}
        </div>
      </header>

      <main className="w-full min-h-screen pt-28 pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-[842px] mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-[35px] font-bold mb-3">
              Meu perfil
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Gerencie seus dados pessoais,
              instituições vinculadas e
              preferências da conta.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E1E4EA] p-5 sm:p-7 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {avatarContent}

              <div>
                <h2 className="text-xl font-bold text-[#1A1551]">
                  {profile.fullName}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Aluno
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
              className={`mb-6 w-full rounded-xl border px-4 py-4 flex items-start justify-between gap-4 ${feedbackClasses[feedback.type]}`}
            >
              <div className="flex gap-3">
                <div className="pt-0.5">
                  {feedback.type ===
                  "success" ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="m8 12 2.5 2.5L16 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 8v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="16"
                        r="1"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </div>

                <div>
                  <p className="font-bold text-sm">
                    {feedback.title}
                  </p>
                  <p className="text-sm mt-1">
                    {feedback.message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFeedback(null)
                }
                aria-label="Fechar mensagem"
                className="shrink-0 opacity-70 hover:opacity-100"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          )}

          <form
            onSubmit={handleProfileSubmit}
            noValidate
            className="bg-white rounded-2xl border border-[#E1E4EA] p-5 sm:p-7 md:p-10"
          >
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold">
                Dados pessoais
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Essas informações aparecem no seu
                certificado e no seu portfólio público.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold mb-2"
                >
                  Nome completo
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleProfileChange}
                  disabled={loadingProfile}
                  autoComplete="name"
                  aria-invalid={Boolean(
                    errors.fullName
                  )}
                  className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-[#D1D5DB]"
                  } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20 disabled:opacity-50`}
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
                  className="block text-sm font-semibold mb-2"
                >
                  Data de nascimento
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="birthDate"
                  name="birthDate"
                  type="text"
                  value={formData.birthDate}
                  readOnly
                  className="w-full h-12 px-4 rounded-xl border border-[#D1D5DB] bg-[#F4F5F9] text-gray-500 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                >
                  E-mail
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  readOnly
                  className="w-full h-12 px-4 rounded-xl border border-[#D1D5DB] bg-[#F4F5F9] text-gray-500 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold mb-2"
                >
                  Telefone
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  readOnly
                  className="w-full h-12 px-4 rounded-xl border border-[#D1D5DB] bg-[#F4F5F9] text-gray-500 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-semibold mb-2"
                >
                  CPF
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formData.cpf}
                  readOnly
                  className="w-full h-12 px-4 rounded-xl border border-[#D1D5DB] bg-[#F4F5F9] text-gray-500 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {errors.form &&
              !loadingPassword && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {errors.form}
                </div>
              )}

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loadingProfile}
                className="w-full sm:w-auto sm:min-w-[150px] py-3.5 px-6 rounded-xl border border-[#0069A8] text-[#0069A8] font-bold hover:bg-[#0069A8]/5 disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loadingProfile}
                aria-busy={loadingProfile}
                className="w-full sm:w-auto sm:min-w-[220px] py-3.5 px-6 rounded-xl bg-[#0069A8] text-white font-bold hover:bg-[#005582] disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed"
              >
                {loadingProfile ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            className="bg-white rounded-2xl border border-[#E1E4EA] p-5 sm:p-7 md:p-10 mt-6"
          >
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold">
                Segurança
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Altere sua senha de acesso.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-semibold mb-2"
                >
                  Senha atual
                  <span className="text-red-500 ml-1">
                    *
                  </span>
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
                  className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${
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
                  className="block text-sm font-semibold mb-2"
                >
                  Nova senha
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleProfileChange}
                  autoComplete="new-password"
                  disabled={loadingPassword}
                  className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${
                    errors.newPassword
                      ? "border-red-500"
                      : "border-[#D1D5DB]"
                  } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                />

                <p className="mt-2 text-xs text-gray-500">
                  Digite a nova senha. Mínimo de 8 caracteres.
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
                  className="block text-sm font-semibold mb-2"
                >
                  Confirmar nova senha
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleProfileChange}
                  autoComplete="new-password"
                  disabled={loadingPassword}
                  className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#D1D5DB]"
                  } focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/20`}
                />

                <p className="mt-2 text-xs text-gray-500">
                  Repita a nova senha.
                </p>

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
              className="w-full sm:w-auto sm:min-w-[220px] mt-8 py-3.5 px-6 rounded-xl bg-[#0069A8] text-white font-bold hover:bg-[#005582] disabled:bg-[#0069A8]/50 disabled:cursor-not-allowed"
            >
              {loadingPassword ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Atualizando...
                </span>
              ) : (
                "Atualizar senha"
              )}
            </button>
          </form>
        </div>
      </main>

      {avatarModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
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
            className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-5 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h2
                  id="avatar-modal-title"
                  className="text-xl sm:text-2xl font-bold text-[#1A1551]"
                >
                  Adicionar foto de perfil
                </h2>

                <p
                  id="avatar-modal-description"
                  className="mt-2 text-sm text-gray-500 leading-relaxed"
                >
                  Deixe o seu perfil ainda mais
                  personalizado adicionando uma foto de
                  perfil
                </p>
              </div>

              <button
                type="button"
                onClick={closeAvatarModal}
                disabled={uploadingAvatar}
                aria-label="Fechar"
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
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
                tabIndex={uploadingAvatar ? -1 : 0}
                aria-label="Selecionar imagem de perfil"
                onClick={openFileSelector}
                onKeyDown={
                  handleUploadAreaKeyDown
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mt-6 min-h-[240px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all ${
                  isDragOver
                    ? "border-[#0069A8] bg-[#0069A8]/10"
                    : avatarError
                    ? "border-red-400 bg-red-50"
                    : "border-[#B9C0CC] bg-[#FAFBFC] hover:border-[#0069A8] hover:bg-[#0069A8]/5"
                } ${
                  uploadingAvatar
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#EAF5FB] text-[#0069A8] flex items-center justify-center mb-4">
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
                  className="mt-2 text-[#0069A8] font-semibold underline underline-offset-2"
                >
                  clique para selecionar
                </button>

                <p className="mt-4 text-xs text-gray-500">
                  Apenas imagem em PNG ou JPG, até 5MB
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <div className="rounded-2xl border border-[#D1D5DB] bg-[#FAFBFC] p-6 flex flex-col items-center">
                  <img
                    src={avatarPreviewUrl || ""}
                    alt="Pré-visualização da nova foto de perfil"
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
                  />

                  <p className="mt-4 text-sm font-semibold text-[#1A1551] text-center break-all">
                    {selectedFile.name}
                  </p>

                  <button
                    type="button"
                    onClick={openFileSelector}
                    disabled={uploadingAvatar}
                    className="mt-3 text-sm font-semibold text-[#0069A8] hover:underline disabled:opacity-50"
                  >
                    Trocar imagem
                  </button>
                </div>
              </div>
            )}

            {avatarError && (
              <p
                role="alert"
                className="mt-3 text-sm text-red-600 font-medium"
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
              className="w-full mt-6 py-3.5 px-6 rounded-xl bg-[#0069A8] text-white font-bold hover:bg-[#005582] disabled:bg-[#0069A8]/40 disabled:cursor-not-allowed transition-colors"
            >
              {uploadingAvatar ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
