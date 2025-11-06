import { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useAuthStoreData } from "@/stores/useAuthStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AccessKeyHandler } from "@/utils/AcessKey";
import { useCreateCertificate } from "./../hooks/Certificate/useCreateCertificate"
import type { CertificateRequest } from "@/api/Certificate/CertificateService";
import { useNavigate } from "react-router-dom";


export const AcessKey = ({ onClose }: { onClose: () => void }) => {
  const { auth } = useAuthStoreData();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const valuesRef = useRef<string[]>(["", "", "", "", ""]);
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);


  const navigation = useNavigate()

  

  const { handleInputChange, handleKeyDown } =
    new AccessKeyHandler();

  const {mutate, isPending} = useCreateCertificate()

  const handlerSetCertificate = () => {

    const user_id = auth?._id

    const newCertificate: CertificateRequest = {
  fullname: auth?.fullname as string,
  access_key: valuesRef.current.join(""),
  event_id: "1",
  status: "available",
  email: auth?.email as string,
    } 

     mutate({userId : user_id as string, certificate_data : newCertificate}, {
      onSuccess : () => navigation("/download-certificado")
     })
  } 

  return (
    <div className="absolute bg-[#00000099] h-full flex w-full left-0 z-99 top-0 backdrop-blur-xs items-center justify-center px-4 font-inter">
      <div className="bg-white px-7 py-10.5 flex flex-col gap-6 rounded-2xl w-full max-w-88 sm:max-w-[30rem] relative">
        <p className="max-w-62 font-semibold text-center mx-auto text-black/60 text-xl sm:max-w-80">
          Insira a palavra-passe que foi fornecida durante o evento
        </p>
        <div className="space-x-2 mx-auto flex max-[370px]:flex-wrap   max-[370px]:justify-center max-[370px]:space-y-2 ">
          {valuesRef.current.map((_, index) => (
            <input
              name={`accessKey-${index}`}
              aria-label={`Digite o ${index + 1}º dígito da chave`}
              key={index}
              maxLength={1}
              ref={(elementIndex) => {
                inputRefs.current[index] = elementIndex;
              }}
              defaultValue={valuesRef.current[index]}
              onChange={(e) =>
                handleInputChange(index, e.target.value, inputRefs, valuesRef)
              }
              onKeyDown={(e) => handleKeyDown(index, e, valuesRef, inputRefs)}
              className="border w-12.5 h-14.5 border-[#3925DD] rounded-lg text-semibold text-[#3925DD] text-center sm:w-17.5 sm:h-20 sm:text-lg  max-[370px]:w-9.5 max-[370px]:h-11.5 max-[370px]:text-sm "
            />
          ))}
        </div>
        <button
          disabled={isPending}
          onClick={() =>handlerSetCertificate()
          }
          className="w-full text-center py-2.5 sm:py-4 bg-[#3925DD] rounded-lg text-[#D9D9D9] font-semibold sm:text-xl cursor-pointer active:scale-95 duration-300 transition flex items-center justify-center disabled:active:scale-100"
        >
          {isPending ? (
            <AiOutlineLoading3Quarters size={28} className="animate-spin" />
          ) : (
            "Confirmar"
          )}
        </button>
        <IoClose
          size={30}
          className="absolute top-4 right-5 text-red-600 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
