import { useFormValidation } from "@/hooks/useForm";
import { Input } from "./Input";
import { useAuthSignUp } from "@/hooks/Auth/useAuthSignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TOAST_STYLES } from "@/pages/ToastStyleContainer";
import { SignUpSchema, type SignUpSchemaType } from "@/schemas/SignUp";
import { PrimaryButton } from "./ButtonPrimary";
import { SecondaryButton } from "./ButtonSecondary";

export function StudentForm() {
  const { errors, handleSubmit, reset, control } = useFormValidation(SignUpSchema, {
    fullname: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate, isPending, isSuccess, isError } = useAuthSignUp();
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
  }, [isError, isSuccess]);

  const onSubmit = (formData: SignUpSchemaType) => {
    console.log("Formulário submetido", formData);
    // const authRequest = {
    //   ...formData,
    //   role: "user",
    // };
    // mutate(authRequest);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 pt-7 pb-5">
        <SecondaryButton>
          Aluno
        </SecondaryButton>

        <SecondaryButton>
          Empresa
        </SecondaryButton>
      </div>

      <div className="flex flex-col gap-4">
        <Input<SignUpSchemaType>
          name="fullname"
          control={control}
          errors={errors}
          placeholderText="Nome completo"
        />

        <Input<SignUpSchemaType>
          name="email"
          control={control}
          errors={errors}
          placeholderText="Email"
        />

        <Input<SignUpSchemaType>
          name="cpf"
          control={control}
          errors={errors}
          placeholderText="CPF"
          mask="cpf"
        />

        <Input<SignUpSchemaType>
          name="phone"
          control={control}
          errors={errors}
          placeholderText="Celular (DDD)00000-0000"
          mask="phone"
          isOptional
        />

        <Input<SignUpSchemaType>
          name="password"
          control={control}
          errors={errors}
          placeholderText="Crie sua senha"
          typeInput="password"
        />

        <Input<SignUpSchemaType>
          name="confirmPassword"
          control={control}
          errors={errors}
          placeholderText="Confirme sua senha"
          typeInput="password"
        />

        <PrimaryButton isDisabled={isPending}>
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </PrimaryButton>
      </div>


    </form>
  )
}