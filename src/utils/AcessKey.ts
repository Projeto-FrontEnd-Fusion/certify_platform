import type { KeyboardEvent, RefObject } from "react";

// interface HandleParams {
//   inputRefs: RefObject<(HTMLInputElement | null)[]>;
//   valuesRef: RefObject<string[]>;
//   auth: {
//     fullname?: string | null;
//     email?: string | null;
//     _id?: string;
//   };
//   setAccess: (data: CertificateInDb) => void;
//   setIsLoading: Dispatch<SetStateAction<boolean>>;
// }

export class AccessKeyHandler {
  handleInputChange = (
    index: number,
    inputValue: string,
    inputRefs: RefObject<(HTMLInputElement | null)[]>,
    valuesRef: RefObject<string[]>
  ): void => {
    const sanitizedValue = inputValue.replace(/[^A-Za-z0-9]/g, "");

    if (valuesRef.current) valuesRef.current[index] = sanitizedValue;
    if (inputRefs.current?.[index])
      inputRefs.current[index]!.value = sanitizedValue;

    if (sanitizedValue && index < (inputRefs.current?.length ?? 0) - 1) {
      inputRefs.current?.[index + 1]?.focus();
    }
  };

  handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
    valuesRef: RefObject<string[]>,
    inputRefs: RefObject<(HTMLInputElement | null)[]>
  ): void => {
    if (event.key === "Backspace" && !valuesRef.current?.[index] && index > 0) {
      inputRefs.current?.[index - 1]?.focus();
    }
  };

  // handleConfirm = async ({
  //   auth,
  //   setAccess,
  //   setIsLoading,
  //   valuesRef,
  // }: HandleParams): Promise<void> => {
  //   if (!auth?.fullname || !auth?.email || !auth?._id) {
  //     console.warn("Dados do usuário incompletos!");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const response: ApiAuthResponse = await certificateServiceInstance.Acess(
  //       {
  //         access_key: valuesRef.current?.join(""),
  //         email: auth.email,
  //         event_id: "evt_987654321",
  //         fullname: auth.fullname,
  //         status: "pending",
  //       },
  //       auth._id
  //     );
  //     console.log(response.data.certificate);
  //     setAccess(response.data.certificate);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Ocorreu um erro ao validar a chave.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


}
