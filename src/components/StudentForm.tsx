import { useFormValidation } from "@/hooks/useForm";
import { Input } from "./Input";
import { useAuthSignUp } from "@/hooks/Auth/useAuthSignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";
import { SignUpStudentSchema, type SignUpStudentSchemaType } from "@/schemas/SignUp";
import { PrimaryButton } from "./ButtonPrimary";
import { ButtonLoader } from "./ButtonLoader";
import { toStudentPayload } from "@/adapters/auth/toStudentPayload";
import { getPasswordRules } from "@/utils/passwordRules";

export function StudentForm() {
  const { errors, handleSubmit, reset, control, watch, isValid } = useFormValidation(SignUpStudentSchema, {
    fullname: "",
    email: "",
    cpf: "",
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

  const passwordValue = watch("password", "");
  const rules = getPasswordRules(passwordValue);

  const onSubmit = (formData: SignUpStudentSchemaType) => {
    console.log("Formulário submetido", formData);

    const studentPayload = toStudentPayload(formData)
    mutate(studentPayload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input<SignUpStudentSchemaType>
          name="fullname"
          control={control}
          errors={errors}
          label="Nome completo"
          placeholderText="Digite seu nome completo"
        />

        <Input<SignUpStudentSchemaType>
          name="email"
          control={control}
          errors={errors}
          label="E-mail"
          placeholderText="Digite seu e-mail"
        />

        <div className="grid grid-cols-2 gap-6">
          <Input<SignUpStudentSchemaType>
            name="cpf"
            control={control}
            errors={errors}
            label="CPF"
            placeholderText="Digite seu CPF"
            mask="cpf"
          />

          <Input<SignUpStudentSchemaType>
            name="phone"
            control={control}
            errors={errors}
            label="Telefone"
            placeholderText="(00) 0000-0000"
            mask="phone"
          />
        </div>

        <Input<SignUpStudentSchemaType>
          name="password"
          control={control}
          errors={errors}
          label="Senha"
          placeholderText="Digite sua senha"
          typeInput="password"
          rules={rules}
        />

        <Input<SignUpStudentSchemaType>
          name="confirmPassword"
          control={control}
          errors={errors}
          label="Confirmar senha"
          placeholderText="Confirme sua senha"
          typeInput="password"
        />

        <div className="w-full h-[52px]">
          <PrimaryButton isDisabled={isPending || !isValid}>
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
      </div>


    </form>
  )
}