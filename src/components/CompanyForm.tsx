import { useFormValidation } from "@/hooks/useForm";
import { Input } from "./Input";
import { useAuthSignUp } from "@/hooks/Auth/useAuthSignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";
import { SignUpCompanySchema, type SignUpCompanySchemaType } from "@/schemas/SignUp";
import { PrimaryButton } from "./ButtonPrimary";
import { BiCheck } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { ButtonLoader } from "./ButtonLoader";
import { toCompanyPayload } from "@/adapters/auth/toCompanyPayload";

export function CompanyForm() {
  const { errors, handleSubmit, reset, control, watch } = useFormValidation(SignUpCompanySchema, {
    fullname: "",
    email: "",
    organizationName: "",
    cnpj: "",
    occupation: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { isPending, isSuccess, isError, mutate } = useAuthSignUp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error('Falha ao Cadastrar, tente novamente mais tarde', {
        position: "top-center",
        autoClose: 5000,
        ...TOAST_STYLES.error
      });
    }

    if (isSuccess) {
      toast.success('Cadastro realizado com sucesso!', {
        position: "top-center",
        autoClose: 3000,
        ...TOAST_STYLES.success
      });

      reset();

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    }
  }, [isError, isSuccess, navigate, reset]);

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

  const onSubmit = (formData: SignUpCompanySchemaType) => {
    console.log("Formulário submetido", formData);

    // const companyPayload = toCompanyPayload(formData);
    // mutate(companyPayload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input<SignUpCompanySchemaType>
          name="fullname"
          control={control}
          errors={errors}
          placeholderText="Nome completo"
        />

        <Input<SignUpCompanySchemaType>
          name="email"
          control={control}
          errors={errors}
          placeholderText="Email profissional"
        />

        <Input<SignUpCompanySchemaType>
          name="organizationName"
          control={control}
          errors={errors}
          placeholderText="Nome da organização"
        />

        <Input<SignUpCompanySchemaType>
          name="cnpj"
          control={control}
          errors={errors}
          placeholderText="CNPJ"
        />

        <Input<SignUpCompanySchemaType>
          name="phone"
          control={control}
          errors={errors}
          placeholderText="Celular (DDD)00000-0000"
          mask="phone"
          isOptional
        />

        <Input<SignUpCompanySchemaType>
          name="occupation"
          control={control}
          errors={errors}
          placeholderText="Profissão"
          isOptional
        />

        <Input<SignUpCompanySchemaType>
          name="password"
          control={control}
          errors={errors}
          placeholderText="Crie sua senha"
          typeInput="password"
        />

        <Input<SignUpCompanySchemaType>
          name="confirmPassword"
          control={control}
          errors={errors}
          placeholderText="Confirme sua senha"
          typeInput="password"
        />

        <div className="flex flex-col gap-2 text-[19px]">
          <span className="text-primary-blue-700">Sua senha deve conter:</span>
          {rules.map((rule) => (
            <div key={rule.label} className="flex items-center gap-2">
              {rule.valid
                ? <BiCheck className="text-primary-blue-700 w-5 h-5" />
                : <IoClose className="text-[#CF1A0F] w-5 h-5" />
              }
              <span className={rule.valid ? "text-primary-blue-700" : "text-[#CF1A0F]"}>
                {rule.label}
              </span>
            </div>
          ))}

          <span className="text-primary-blue-700">*campos obrigatórios</span>
        </div>

        <PrimaryButton isDisabled={isPending}>
          {isPending ? (
            <>
              Carregando
              <ButtonLoader />
            </>
          ) : (
            "Criar conta"
          )}
        </PrimaryButton>
      </div>


    </form>
  )
}